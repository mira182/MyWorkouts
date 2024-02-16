package com.workouts.myworkouts.model.mapper;

import com.workouts.myworkouts.model.dto.picture.PictureDto;
import com.workouts.myworkouts.model.entity.picture.ExercisePicture;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PictureMapper {

    PictureDto entityToDto(ExercisePicture exercisePicture);

    ExercisePicture dtoToEntity(PictureDto pictureDto);
}
