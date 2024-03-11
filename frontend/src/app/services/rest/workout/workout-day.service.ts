import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import moment, {Moment} from "moment";

@Injectable({
  providedIn: 'root'
})
export class WorkoutDayService {

  private workoutDay: BehaviorSubject<Moment> = new BehaviorSubject(moment());

  public get getWorkoutDay(): Observable<Moment> {
    return this.workoutDay.asObservable();
  }

  public setWorkoutDay(workoutDay: Moment): void {
    this.workoutDay.next(workoutDay);
  }
}
