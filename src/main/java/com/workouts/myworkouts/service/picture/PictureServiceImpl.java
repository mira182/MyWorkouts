package com.workouts.myworkouts.service.picture;

import com.workouts.myworkouts.exceptions.PictureNotFoundException;
import com.workouts.myworkouts.exceptions.PictureStoringException;
import com.workouts.myworkouts.model.dto.picture.PictureDto;
import com.workouts.myworkouts.model.entity.picture.ExercisePicture;
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
    public ExercisePicture createOrUpdatePicture(PictureDto pictureDto) {
        ExercisePicture foundOrNewExercisePicture = pictureRepository.findByNameStartingWithIgnoreCaseAndTypeEquals(pictureDto.getName().substring(0, pictureDto.getName().indexOf('.')), pictureDto.getType()).orElseGet(
                () -> pictureRepository.save(pictureMapper.dtoToEntity(pictureDto)));
        foundOrNewExercisePicture.setName(pictureDto.getName());
        foundOrNewExercisePicture.setRelativePath(pictureDto.getRelativePath());

        return foundOrNewExercisePicture;
    }

    @Override
    public byte[] getPictureDataById(long pictureId) {
        ExercisePicture exercisePicture = pictureRepository.findById(pictureId).orElseThrow(() -> new PictureNotFoundException(pictureId));
        try {
            return Files.readAllBytes(exercisePicture.getType().getLocation().resolve(exercisePicture.getName()));
        } catch (IOException e) {
            log.error("Failed to get picture with id: {}.", pictureId, e);
            throw new PictureStoringException(String.format("Failed to get picture with id %d", pictureId), e);
        }
    }
}
