import {environment} from '../../environments/environment';

export class Urls {

  public static readonly API_URL = environment.apiUrl;
  public static readonly LOCAL_URL = environment.localUrl;
  public static readonly IMAGE_BASE_URL = environment.imageBaseUrl;

  // EXERCISE URL
  public static readonly EXERCISE_URL = '/exercise';
  public static readonly WORKOUT_URL = '/workout';

}
