package com.workouts.myworkouts.config;

import java.nio.file.Path;
import java.nio.file.Paths;

public final class Constants {

    // API
    public static final String API_BASE_URL = "/api/v1";

    // ERROR CODES
    public static final String ERROR_CODE_NOT_FOUND = "Not found";

    // IMAGES
    public static final  Path EXERCISE_IMAGES_LOCATION = Paths.get("img/exercises");
    public static final  Path EXERCISE_ICONS_LOCATION = Paths.get("img/exercises/icon");

    // CACHE keys
    public static final String EXERCISES_BY_CATEGORY_KEY = "exercises_by_category";
}
