package com.workouts.myworkouts.service.exercise;

import com.workouts.myworkouts.exceptions.ExerciseNotFoundException;
import com.workouts.myworkouts.model.dto.exercise.ExerciseDto;
import com.workouts.myworkouts.model.entity.exercise.Exercise;
import com.workouts.myworkouts.model.entity.picture.Picture;
import com.workouts.myworkouts.model.enums.ExerciseCategory;
import com.workouts.myworkouts.model.enums.PictureType;
import com.workouts.myworkouts.model.mapper.ExerciseMapper;
import com.workouts.myworkouts.repository.exercise.ExerciseRepository;
import com.workouts.myworkouts.service.image.ImageService;
import com.workouts.myworkouts.service.picture.PictureService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;

    private final ExerciseMapper exerciseMapper;

    private final ImageService imageService;

    private final PictureService pictureService;

    @Override
    @Transactional
    public List<ExerciseDto> getAllExercises() {
        return exerciseRepository.findAll().stream()
                .map(exerciseMapper::entityToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ExerciseDto createExercise(ExerciseDto exerciseDto) {
        return exerciseMapper.entityToDto(findOrCreateExercise(exerciseDto));
    }

    @Override
    @Transactional
    public ExerciseDto createExercise(ExerciseDto exerciseDto, MultipartFile file) {
        Exercise foundOrCreatedExercise = findOrCreateExercise(exerciseDto);

        if (foundOrCreatedExercise != null) {
            addImagesToExercise(exerciseDto.getName(), foundOrCreatedExercise, file);
        }

        return exerciseMapper.entityToDto(foundOrCreatedExercise);
    }

    private Exercise findOrCreateExercise(ExerciseDto exerciseDto) {
        if (exerciseDto.getId() != null) {
            return exerciseRepository.findById(exerciseDto.getId()).orElseThrow(() -> new ExerciseNotFoundException(exerciseDto.getId()));
        } else {
            return exerciseRepository.findExerciseByName(exerciseDto.getName())
                    .orElseGet(() -> exerciseRepository.save(exerciseMapper.dtoToEntity(exerciseDto)));
        }
    }

    @Override
    @Transactional
    public ExerciseDto updateExercise(ExerciseDto exerciseDto, Long id, MultipartFile file) {
        final Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new ExerciseNotFoundException(id));
        if (exerciseDto.getName() != null) exercise.setName(exerciseDto.getName());
        if (exerciseDto.getCategory() != null) exercise.setCategory(exerciseDto.getCategory());
        if (exerciseDto.getType() != null) exercise.setType(exerciseDto.getType());
        addImagesToExercise(exerciseDto.getName(), exercise, file);
        return exerciseMapper.entityToDto(exercise);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExerciseDto> findAllByCategory(ExerciseCategory category) {
        return exerciseRepository.findByCategory(category).stream()
                .map(exerciseMapper::entityToDto)
                .toList();
    }

    @Override
    @Transactional
    public boolean deleteExercise(Long id) {
        exerciseRepository.deleteById(id);
        return true;
    }

    private void addImagesToExercise(String exerciseName, Exercise foundOrCreatedExercise, MultipartFile file) {
        if (file != null) {
            log.info("Storing image with filename: {} for exercise: {}", file.getOriginalFilename(), exerciseName);

            // add exercise picture
            Picture picture = pictureService.createOrUpdatePicture(
                    imageService.storeImage(exerciseName, file, PictureType.EXERCISE_IMAGE));
            foundOrCreatedExercise.getPictures().removeIf(picture1 -> picture1.getType() == PictureType.EXERCISE_IMAGE);
            foundOrCreatedExercise.addPicture(picture);

            // add exercise icon
            picture = pictureService.createOrUpdatePicture(
                    imageService.storeImage(exerciseName, file, PictureType.EXERCISE_ICON));
            foundOrCreatedExercise.getPictures().removeIf(picture1 -> picture1.getType() == PictureType.EXERCISE_ICON);
            foundOrCreatedExercise.addPicture(picture);
        } else {
            log.info("No image was added for exercise {}", exerciseName);
        }
    }
}
