import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Urls} from "../../../model/urls";
import {TrainingPlan} from "../../../model/training/trainingPlan";
import {TrainingExercise} from "../../../model/training/trainingExercise";
import moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private http: HttpClient) { }

  public createTraining(training: TrainingPlan): Observable<TrainingPlan> {
    return this.http.post<TrainingPlan>(Urls.API_URL + "/trainings", training);
  }

  public setScheduledForTraining(trainingId: number, scheduled: boolean): Observable<boolean> {
    return this.http.get<boolean>(Urls.API_URL + "/trainings/" +  trainingId + "/setScheduled", {params: new HttpParams().set("scheduled", scheduled.toString())});
  }

  public updateTraining(trainingId: number, training: TrainingPlan): Observable<TrainingPlan> {
    return this.http.post<TrainingPlan>(Urls.API_URL + "/trainings/" +  trainingId, training);
  }

  public getAllTrainingsWithoutWorkouts(): Observable<TrainingPlan[]> {
    return this.http.get<TrainingPlan[]>(Urls.API_URL + "/trainings");
  }

  public addExerciseToTraining(trainingId: number, trainingExercise: TrainingExercise): Observable<TrainingPlan> {
    return this.http.post<TrainingPlan>(Urls.API_URL + "/trainings/" + trainingId + "/exercises", trainingExercise);
  }

  public applyTraining(trainingId: number, dateTime: Date): Observable<boolean> {
    const localDate = moment(dateTime).format('YYYY-MM-DD') + 'T00:00:00';
    return this.http.get<boolean>(Urls.API_URL + "/trainings/" + trainingId + "/" + localDate);
  }

  public deleteTraining(trainingId: number): Observable<boolean> {
    return this.http.delete<boolean>(Urls.API_URL + "/trainings/" + trainingId);
  }

  public getTrainingWithWorkouts(trainingId: number): Observable<TrainingPlan> {
    return this.http.get<TrainingPlan>(Urls.API_URL + "/trainings/" + trainingId);
  }
}
