import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Urls} from "../../../model/urls";
import {Moment} from "moment";
import {Workout} from "../../../model/workout/workout";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) { }

  public getWorkoutForDay(date: Moment): Observable<Workout> {
    return this.http.get<Workout>(Urls.API_URL + Urls.WORKOUT_URL, { params: { date: date.format('yyyy-MM-DD') } });
  }

  public createWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(Urls.API_URL + Urls.WORKOUT_URL + '/create', workout);
  }

  public deleteWorkout(id: number): Observable<void> {
    return this.http.delete<void>(Urls.API_URL + Urls.WORKOUT_URL + '/delete', { params: { id }});
  }
}
