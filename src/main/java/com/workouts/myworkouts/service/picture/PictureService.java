package com.workouts.myworkouts.service.picture;


import com.workouts.myworkouts.model.dto.picture.PictureDto;
import com.workouts.myworkouts.model.entity.picture.Picture;

public interface PictureService {

    Picture createOrUpdatePicture(PictureDto picture);

    byte[] getPictureDataById(long pictureId);
}
