import {Injectable} from "@angular/core";
import {Urls} from "../../../model/urls";
import {HttpClient} from "@angular/common/http";
import {MeasurementDataProviderType} from "../../../model/weight/chart/measurement-data-provider-type.model";
import {MeasurementType} from "../../../model/weight/measurement-type.enum";
import {Moment} from "moment";
import {API_DATE_FORMAT} from "../../../app.config";

interface NgxDataPoint {
  name: Moment;
  value: number;
}

export interface NgxChartData {
  name: string;
  series: NgxDataPoint[];
}

@Injectable({
  providedIn: 'root'
})
export class NgxChartService {

  constructor(private http: HttpClient) { }

  getMeasurementsByProviderAndType(measurementDataProviderType: MeasurementDataProviderType, measurementType: MeasurementType) {
    const params = {
      measurementType
    };

    return this.http.get<NgxChartData>(Urls.API_URL + `/charts/ngx/${measurementDataProviderType}/getMeasurementsByType`, { params: params });
  }
}
