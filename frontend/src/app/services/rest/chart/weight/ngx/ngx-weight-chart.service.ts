import {Injectable} from "@angular/core";
import {Urls} from "../../../../../model/urls";
import {HttpClient} from "@angular/common/http";
import {MeasurementDataProviderType} from "../../../../../model/weight/chart/measurement-data-provider-type.model";
import {MeasurementType} from "../../../../../model/weight/measurement-type.enum";
import {NgxWeightChartData} from "../../../../../components/weight/model/ngx-chart-data-model";
import {catchError, Observable, shareReplay, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NgxWeightChartService {

  // Chart data only changes when a measurement sync runs, so cache each
  // provider|type response for the app session. shareReplay(1) replays the last
  // response to later subscribers; clearCache() is called after an import.
  private readonly cache = new Map<string, Observable<NgxWeightChartData>>();

  constructor(private http: HttpClient) { }

  getMeasurementsByProviderAndType(measurementDataProviderType: MeasurementDataProviderType,
                                   measurementType: MeasurementType): Observable<NgxWeightChartData> {
    const key = `${measurementDataProviderType}|${measurementType}`;
    let cached = this.cache.get(key);

    if (!cached) {
      const params = {measurementDataProviderType, measurementType};
      cached = this.http.get<NgxWeightChartData>(
        Urls.API_URL + `/charts/weight/ngx/${measurementDataProviderType}/getMeasurementsByType`, {params})
        .pipe(
          catchError(err => {
            // Don't keep a failed request cached — let the next call retry.
            this.cache.delete(key);
            return throwError(() => err);
          }),
          shareReplay(1),
        );
      this.cache.set(key, cached);
    }

    return cached;
  }

  clearCache(): void {
    this.cache.clear();
  }
}
