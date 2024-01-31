import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Urls} from "../../../model/urls";
import {Observable} from "rxjs/index";
import {TanitaMeasurementModel} from "../../../model/weight/tanita-measurement.model";
import Response from "../../../model/response";
import {MeasurementType} from "../../../model/weight/measurement-type.enum";
import {WeightMeasurement} from "../../../model/weight/weight-measurement.model";
import {Moment} from "moment/moment";
import {API_DATE_FORMAT} from "../../../app.config";

@Injectable()
export class TanitaService {

  constructor(private readonly http: HttpClient) {
  }

  public getMeasurements(): Observable<TanitaMeasurementModel[]> {
    return this.http.get<TanitaMeasurementModel[]>(Urls.API_URL + "/weight/tanita/measurements/getMeasurements");
  }

  public getMeasurementByDate(date: Moment) : Observable<TanitaMeasurementModel[]> {
    let params = new HttpParams().set('date', date.format(API_DATE_FORMAT));
    return this.http.get<TanitaMeasurementModel[]>(Urls.API_URL + '/weight/tanita/measurements/getMeasurementByDate', { params })
  }

  public updateReport(): Observable<Response> {
    return this.http.get<Response>(Urls.API_URL + "/weight/tanita/measurements/updateMeasurements");
  }

  public doesNewEmailExist(): Observable<boolean> {
    return this.http.get<boolean>(Urls.API_URL + "/weight/tanita/measurements/doesNewEmailExist");
  }
}
