import {Injectable} from '@angular/core';
import {Urls} from '../../../model/urls';
import {HttpClient} from '@angular/common/http';
import {Exercise} from '../../../model/exercise/exercise';
import {Observable, take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {



  constructor(private http: HttpClient) { }

  public createExercise(exercise: Exercise, file: File) {
    const formData: FormData = new FormData();

    formData.append('exercise', new Blob([JSON.stringify(exercise)], {
      type: 'application/json'
    }));
    formData.append('file', file);

    return this.http.post<Exercise>(Urls.API_URL + Urls.EXERCISE_URL, formData);
  }

  public getAllExercisesByCategory(category: string): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(Urls.API_URL + Urls.EXERCISE_URL + '/getByCategory', { params: { category }});
  }

  public getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(Urls.API_URL + Urls.EXERCISE_URL + '/categories')
      .pipe(
        take(1)
      );
  }

  public getAllTypes(): Observable<string[]> {
    return this.http.get<string[]>(Urls.API_URL + Urls.EXERCISE_URL + '/types')
      .pipe(
        take(1)
      );
  }

  public updateExercise(exercise: Exercise, id: number, file: File): Observable<Exercise> {
    const formData: FormData = new FormData();

    formData.append('exercise', new Blob([JSON.stringify(exercise)], {
      type: 'application/json'
    }));
    formData.append('file', file);

    return this.http.patch<Exercise>(Urls.API_URL + Urls.EXERCISE_URL + '/' + id, formData);
  }

  public deleteExercise(id: number) {
    return this.http.delete<boolean>(Urls.API_URL + Urls.EXERCISE_URL + "/" + id);
  }
}
