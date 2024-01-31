import {Injectable} from '@angular/core';
import {Urls} from '../../../model/urls';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Exercise} from '../../../model/exercise/exercise';
import {Observable} from 'rxjs';
import {ExerciseCategory} from '../../../model/exercise/exerciseCategory';

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

    const req = new HttpRequest('POST', Urls.API_URL + Urls.EXERCISE_URL, formData, {
      reportProgress: false,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  public getAllExercisesByCategory(category: string): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(Urls.API_URL + Urls.EXERCISE_URL + '/getByCategory', { params: { category }});
  }

  public getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(Urls.API_URL + Urls.EXERCISE_URL + '/categories');
  }

  public getAllTypes(): Observable<string[]> {
    return this.http.get<string[]>(Urls.API_URL + Urls.EXERCISE_URL + '/types');
  }

  public updateExercise(exercise: Exercise, id: number, file: File) {
    const formData: FormData = new FormData();

    formData.append('exercise', new Blob([JSON.stringify(exercise)], {
      type: 'application/json'
    }));
    formData.append('file', file);

    const req = new HttpRequest('PATCH', Urls.API_URL + Urls.EXERCISE_URL + id, formData, {
      reportProgress: false,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  public deleteExercise(id: number) {
    return this.http.delete<boolean>(Urls.API_URL + Urls.EXERCISE_URL + id);
  }
}
