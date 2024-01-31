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
    return this.http.post(Urls.API_URL + '/workouts', workout);
  }

  public getWorkoutsForWeek(from: Moment): Observable<WorkoutExercise[]> {
    return this.http.get<WorkoutExercise[]>(Urls.API_URL + '/workouts', {
      params : new HttpParams()
        .set('from', from.format('yyyy-MM-dd'))
        .set('to', from.add(6, 'days').format('yyyy-MM-dd'))
    });
  }

  public getWorkoutsForInterval(from: Moment, to: Date): Observable<WorkoutExercise[]> {
    return this.http.get<WorkoutExercise[]>(Urls.API_URL + '/workouts', {
      params : new HttpParams()
        .set('from', from.format('yyyy-MM-dd'))
        .set('to', from.format('yyyy-MM-dd'))
    });
  }

  public getWorkoutsForDay(day: Moment): Observable<WorkoutExercise[]> {
    return this.http.get<WorkoutExercise[]>(Urls.API_URL + '/workouts/' +day.format('yyyy-MM-dd'));
  }

  public updateWorkout(workoutId: number, workout: WorkoutExercise): Observable<WorkoutExercise> {
    return this.http.patch<WorkoutExercise>(Urls.API_URL + '/workouts/' + workoutId, workout);
  }

  public deleteWorkout(id: number): Observable<void> {
    return this.http.delete<void>(Urls.API_URL + '/workouts/delete/' + id);
  }

  public deleteWorkouts(workoutIds: number[]): Observable<void> {
    return this.http.delete<void>(Urls.API_URL + '/workouts/delete', {
      params : new HttpParams()
        .set('workoutIds', workoutIds.join(','))
    })
  }

}
