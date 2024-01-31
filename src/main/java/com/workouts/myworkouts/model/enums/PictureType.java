package com.workouts.myworkouts.model.enums;


import java.nio.file.Path;

import static com.workouts.myworkouts.config.Constants.EXERCISE_ICONS_LOCATION;
import static com.workouts.myworkouts.config.Constants.EXERCISE_IMAGES_LOCATION;

public enum PictureType {
    EXERCISE_IMAGE(EXERCISE_IMAGES_LOCATION),
    EXERCISE_ICON(EXERCISE_ICONS_LOCATION);

    private Path location;

    PictureType(Path location) {
        this.location = location;
    }

    public Path getLocation() {
        return location;
    }
}
