package com.workouts.myworkouts.service.image;

import com.workouts.myworkouts.model.dto.picture.PictureDto;
import com.workouts.myworkouts.model.enums.PictureType;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    PictureDto storeImage(String fileName, MultipartFile imgFile, PictureType type);

}
