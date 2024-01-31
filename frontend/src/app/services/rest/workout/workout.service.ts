import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Urls} from "../../../model/urls";
import {Moment} from "moment";
import {Workout} from "../../../model/workout/workout";
import {Observable} from "rxjs";
import {WorkoutExercise} from "../../../model/exercise/workoutExercise";

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) { }

  public getWorkoutForDay(date: Moment): Observable<Workout[]> {
    return this.http.get<Workout[]>(Urls.API_URL + `/workouts`, { params: { date: date.format('yyyy-MM-dd') } });
  }

  public createWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(Urls.API_URL + '/workouts/create', workout);
  }

  deleteWorkout(id: number): Observable<void> {
    return this.http.delete<void>(Urls.API_URL + '/workouts/delete', { params: { id }});
  }
}
