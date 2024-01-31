package com.workouts.myworkouts.model.mapper;

import com.workouts.myworkouts.model.dto.picture.PictureDto;
import com.workouts.myworkouts.model.entity.picture.Picture;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PictureMapper {

    PictureDto entityToDto(Picture picture);

    Picture dtoToEntity(PictureDto pictureDto);
}
