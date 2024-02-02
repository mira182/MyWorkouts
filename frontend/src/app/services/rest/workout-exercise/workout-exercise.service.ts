import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Urls} from '../../../model/urls';
import {WorkoutExercise} from '../../../model/exercise/workoutExercise';
import {Observable} from 'rxjs';
import {Moment} from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WorkoutExerciseService {

  constructor(private http: HttpClient) { }

  public createWorkoutExercise(workout: WorkoutExercise) {
    return this.http.post(Urls.API_URL + Urls.WORKOUT_EXERCISE_URL, workout);
  }

  public getWorkoutsForWeek(from: Moment): Observable<WorkoutExercise[]> {
    return this.http.get<WorkoutExercise[]>(Urls.API_URL + Urls.WORKOUT_EXERCISE_URL, {
      params : new HttpParams()
        .set('from', from.format('yyyy-MM-dd'))
        .set('to', from.add(6, 'days').format('yyyy-MM-dd'))
    });
  }

  public getWorkoutsForDay(day: Moment): Observable<WorkoutExercise[]> {
    return this.http.get<WorkoutExercise[]>(Urls.API_URL + Urls.WORKOUT_EXERCISE_URL + '/' +day.format('yyyy-MM-dd'));
  }

  public updateWorkoutExercise(workout: WorkoutExercise): Observable<WorkoutExercise> {
    return this.http.patch<WorkoutExercise>(Urls.API_URL + Urls.WORKOUT_EXERCISE_URL, workout);
  }

  public deleteWorkoutExercise(id: number): Observable<void> {
    return this.http.delete<void>(Urls.API_URL + Urls.WORKOUT_EXERCISE_URL + '/delete/' + id);
  }

}
