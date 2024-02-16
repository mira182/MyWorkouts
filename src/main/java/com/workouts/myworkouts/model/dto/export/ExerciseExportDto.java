package com.workouts.myworkouts.model.dto.export;

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
public class ExerciseExportDto {

    private String name;

    private ExerciseType type;

    private ExerciseCategory category;

    private List<PictureDto> pictures;
}
