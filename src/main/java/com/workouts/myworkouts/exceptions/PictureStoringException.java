package com.workouts.myworkouts.exceptions;

public class PictureStoringException extends RuntimeException {

    public PictureStoringException(String message, Exception e) {
        super(message, e);
    }

    public PictureStoringException(String message) {
        super(message);
    }
}
