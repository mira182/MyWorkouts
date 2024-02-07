import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Urls} from "../../../model/urls";
import {TrainingPlan} from "../../../model/training/trainingPlan";
import {Workout} from "../../../model/workout/workout";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private http: HttpClient) { }

  public createTraining(training: TrainingPlan): Observable<TrainingPlan> {
    return this.http.post<TrainingPlan>(Urls.API_URL + "/trainings", training);
  }

  public addWorkoutToTraining(trainingId: number, workout: Workout): Observable<TrainingPlan> {
    return this.http.post<TrainingPlan>(Urls.API_URL + "/trainings/" +  trainingId + "/addWorkout", workout);
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

  public getWorkoutsForTraining(trainingId: number): Observable<Workout[]> {
    return this.http.get<Workout[]>(Urls.API_URL + "/trainings/" + trainingId + "/workouts");
  }

  public applyTraining(trainingId: number, dateTime: Date): Observable<boolean> {
    return this.http.get<boolean>(Urls.API_URL + "/trainings/" + trainingId + "/" + dateTime.toJSON());
  }

  public deleteTraining(trainingId: number): Observable<boolean> {
    return this.http.delete<boolean>(Urls.API_URL + "/trainings/" + trainingId);
  }

  public getTrainingWithWorkouts(trainingId: number): Observable<TrainingPlan> {
    return this.http.get<TrainingPlan>(Urls.API_URL + "/trainings/" + trainingId);
  }
}
