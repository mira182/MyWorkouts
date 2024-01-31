package com.workouts.myworkouts.model.dto.exercise;

import com.workouts.myworkouts.model.dto.picture.PictureDto;
import com.workouts.myworkouts.model.enums.ExerciseCategory;
import com.workouts.myworkouts.model.enums.ExerciseType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class ExerciseDto {

    private Long id;

    private String name;

    private ExerciseType type;

    private ExerciseCategory category;

    private List<PictureDto> pictures;
}
