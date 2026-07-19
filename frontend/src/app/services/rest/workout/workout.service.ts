import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Urls} from "../../../model/urls";
import {Moment} from "moment";
import {Workout} from "../../../model/workout/workout";
import {FitWorkout} from "../../../model/workout/fit-workout";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) { }

  public getWorkoutForDay(date: Moment): Observable<Workout> {
    return this.http.get<Workout>(Urls.API_URL + Urls.WORKOUT_URL, { params: { date: date.format('yyyy-MM-DD') } });
  }

  public getWorkoutDates(startDate: Moment, endDate: Moment): Observable<string[]> {
    return this.http.get<string[]>(Urls.API_URL + Urls.WORKOUT_URL + '/dates', {
      params: {
        startDate: startDate.format('yyyy-MM-DD'),
        endDate: endDate.format('yyyy-MM-DD'),
      }
    });
  }

  public createWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(Urls.API_URL + Urls.WORKOUT_URL + '/create', workout);
  }

  public copyLastWorkout(date: Moment): Observable<Workout> {
    return this.http.post<Workout>(Urls.API_URL + Urls.WORKOUT_URL + '/copyLast', null,
      { params: { date: date.format('yyyy-MM-DD') } });
  }

  /** Parses a Garmin .fit strength activity into a reviewable draft (nothing saved yet). */
  public importFitFile(file: File): Observable<FitWorkout> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<FitWorkout>(Urls.API_URL + Urls.WORKOUT_URL + '/importFit', formData);
  }

  public saveFitMappings(mappings: { garminName: string; exerciseId: number }[]): Observable<void> {
    return this.http.post<void>(Urls.API_URL + Urls.WORKOUT_URL + '/fitMappings', mappings);
  }

  public updateNote(workoutId: number, note: string): Observable<void> {
    return this.http.patch<void>(Urls.API_URL + Urls.WORKOUT_URL + '/note', note,
      { params: { workoutId } });
  }

  public deleteWorkout(id: number): Observable<void> {
    return this.http.delete<void>(Urls.API_URL + Urls.WORKOUT_URL + '/delete', { params: { id }});
  }
}
