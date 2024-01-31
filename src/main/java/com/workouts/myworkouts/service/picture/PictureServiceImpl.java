package com.workouts.myworkouts.service.picture;

import com.workouts.myworkouts.exceptions.PictureNotFoundException;
import com.workouts.myworkouts.exceptions.PictureStoringException;
import com.workouts.myworkouts.model.dto.picture.PictureDto;
import com.workouts.myworkouts.model.entity.picture.Picture;
import com.workouts.myworkouts.model.mapper.PictureMapper;
import com.workouts.myworkouts.repository.exercise.PictureRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;

@Slf4j
@Service
@RequiredArgsConstructor
public class PictureServiceImpl implements PictureService {

    private final PictureRepository pictureRepository;

    private final PictureMapper pictureMapper;

    @Override
    @Transactional
    public Picture createOrUpdatePicture(PictureDto pictureDto) {
        Picture foundOrNewPicture = pictureRepository.findByNameStartingWithIgnoreCaseAndTypeEquals(pictureDto.getName().substring(0, pictureDto.getName().indexOf('.')), pictureDto.getType()).orElseGet(
                () -> pictureRepository.save(pictureMapper.dtoToEntity(pictureDto)));
        foundOrNewPicture.setName(pictureDto.getName());
        foundOrNewPicture.setRelativePath(pictureDto.getRelativePath());

        return foundOrNewPicture;
    }

    @Override
    public byte[] getPictureDataById(long pictureId) {
        Picture picture = pictureRepository.findById(pictureId).orElseThrow(() -> new PictureNotFoundException(pictureId));
        try {
            return Files.readAllBytes(picture.getType().getLocation().resolve(picture.getName()));
        } catch (IOException e) {
            log.error("Failed to get picture with id: {}.", pictureId, e);
            throw new PictureStoringException(String.format("Failed to get picture with id %d", pictureId), e);
        }
    }
}
