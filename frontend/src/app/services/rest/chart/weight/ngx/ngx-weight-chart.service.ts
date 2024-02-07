import {Injectable} from "@angular/core";
import {Urls} from "../../../../../model/urls";
import {HttpClient} from "@angular/common/http";
import {MeasurementDataProviderType} from "../../../../../model/weight/chart/measurement-data-provider-type.model";
import {MeasurementType} from "../../../../../model/weight/measurement-type.enum";
import {Moment} from "moment";

export interface NgxDataPoint {
  name: Moment;
  value: number;
}

export interface NgxWeightChartData {
  name: string;
  series: NgxDataPoint[];
}

@Injectable({
  providedIn: 'root'
})
export class NgxWeightChartService {

  constructor(private http: HttpClient) { }

  getMeasurementsByProviderAndType(measurementDataProviderType: MeasurementDataProviderType, measurementType: MeasurementType) {
    const params = {
      measurementType
    };

    return this.http.get<NgxWeightChartData>(Urls.API_URL + `/charts//weight/ngx/${measurementDataProviderType}/getMeasurementsByType`, { params: params });
  }
}
