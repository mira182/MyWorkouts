import {environment} from '../../environments/environment';

export class Urls {

  public static readonly API_URL = environment.apiUrl;
  public static readonly LOCAL_URL = environment.localUrl;
  public static readonly IMAGE_BASE_URL = environment.imageBaseUrl;

  // EXERCISE URL
  public static readonly EXERCISE_URL = '/exercise';
  public static readonly WORKOUT_URL = '/workout';
  public static readonly WORKOUT_EXERCISE_URL = '/workoutExercise';
  public static readonly CHARTS_URL = '/charts';
  public static readonly DASHBOARD_URL = '/dashboard';
  public static readonly NGX_URL = '/ngx';
  public static readonly GOOGLE_CHART_URL = '/googlechart';
  public static readonly CHART_JS_URL = '/chartjs';

}
