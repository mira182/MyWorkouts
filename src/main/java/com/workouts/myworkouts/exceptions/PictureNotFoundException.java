package com.workouts.myworkouts.exceptions;

public class PictureNotFoundException extends NotFoundException {

    public PictureNotFoundException(long pictureId) {
        super(String.format("Picture with id: %s was not found!", pictureId));
    }
}
