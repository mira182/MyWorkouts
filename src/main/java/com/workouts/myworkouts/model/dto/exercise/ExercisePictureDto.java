package com.workouts.myworkouts.model.dto.exercise;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class ExercisePictureDto {

    private ExerciseDto exercise;

    private MultipartFile file;
}
