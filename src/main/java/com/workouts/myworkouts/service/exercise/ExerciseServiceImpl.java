package com.workouts.myworkouts.service.exercise;

import com.workouts.myworkouts.exceptions.ExerciseNotFoundException;
import com.workouts.myworkouts.model.dto.exercise.ExerciseDto;
import com.workouts.myworkouts.model.dto.exercise.ExerciseStatsDto;
import com.workouts.myworkouts.model.dto.exercise.PersonalRecordsDto;
import com.workouts.myworkouts.model.dto.workout.projections.WorkoutExerciseDateDto;
import com.workouts.myworkouts.model.entity.exercise.Exercise;
import com.workouts.myworkouts.model.entity.picture.ExercisePicture;
import com.workouts.myworkouts.model.entity.workout.WorkoutSet;
import com.workouts.myworkouts.model.enums.ExerciseCategory;
import com.workouts.myworkouts.model.enums.PictureType;
import com.workouts.myworkouts.model.mapper.ExerciseMapper;
import com.workouts.myworkouts.model.mapper.WorkoutSetMapper;
import com.workouts.myworkouts.repository.exercise.ExerciseRepository;
import com.workouts.myworkouts.repository.workout.WorkoutExerciseRepository;
import com.workouts.myworkouts.service.image.ImageService;
import com.workouts.myworkouts.service.picture.PictureService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Comparator;
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

    private final WorkoutExerciseRepository workoutExerciseRepository;

    private final WorkoutSetMapper workoutSetMapper;

    @Override
    @Transactional
    public List<ExerciseDto> getAllExercises() {
        return exerciseRepository.findAll().stream()
                .map(exerciseMapper::entityToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ExerciseDto createExercise(@NonNull ExerciseDto exerciseDto) {
        return exerciseMapper.entityToDto(findOrCreateExercise(exerciseDto));
    }

    @Override
    @Transactional
    public ExerciseDto createExercise(@NonNull ExerciseDto exerciseDto, MultipartFile file) {
        Exercise foundOrCreatedExercise = findOrCreateExercise(exerciseDto);

        if (foundOrCreatedExercise != null) {
            addImagesToExercise(exerciseDto.getName(), foundOrCreatedExercise, file);
        }

        return exerciseMapper.entityToDto(foundOrCreatedExercise);
    }

    private Exercise findOrCreateExercise(@NonNull ExerciseDto exerciseDto) {
        if (exerciseDto.getId() != null) {
            return exerciseRepository.findById(exerciseDto.getId()).orElseThrow(() -> new ExerciseNotFoundException(exerciseDto.getId()));
        } else {
            return exerciseRepository.findExerciseByName(exerciseDto.getName())
                    .orElseGet(() -> exerciseRepository.save(exerciseMapper.dtoToEntity(exerciseDto)));
        }
    }

    @Override
    @Transactional
    public ExerciseDto updateExercise(@NonNull ExerciseDto exerciseDto, long id, MultipartFile file) {
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
    public List<ExerciseDto> findAllByCategory(@NonNull ExerciseCategory category) {
        return exerciseRepository.findByCategory(category).stream()
                .map(exerciseMapper::entityToDto)
                .sorted(Comparator.comparing(ExerciseDto::getName))
                .toList();
    }

    @Override
    @Transactional
    public void deleteExercise(long id) {
        exerciseRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ExerciseStatsDto getExerciseStats(long exerciseId, LocalDate before) {
        final List<WorkoutExerciseDateDto> history = workoutExerciseRepository.findByExerciseIdOrderByWorkoutDateDesc(exerciseId);

        // History is ordered by workout date descending, so the first entry before the
        // reference date is the most recent previous session.
        final WorkoutExerciseDateDto lastSession = history.stream()
                .filter(entry -> before == null || entry.getDate().isBefore(before))
                .findFirst()
                .orElse(null);

        final List<WorkoutSet> allSets = history.stream()
                .flatMap(entry -> entry.getWorkoutExercise().getWorkoutSets().stream())
                .toList();

        final PersonalRecordsDto personalRecords = PersonalRecordsDto.builder()
                .maxWeight(allSets.stream().mapToDouble(WorkoutSet::getWeight).max().orElse(0))
                .maxReps(allSets.stream().mapToInt(WorkoutSet::getReps).max().orElse(0))
                .bestSetVolume(allSets.stream().mapToDouble(set -> set.getWeight() * set.getReps()).max().orElse(0))
                .estimatedOneRepMax(allSets.stream().mapToDouble(set -> set.getWeight() * (1 + set.getReps() / 30.0)).max().orElse(0))
                .build();

        return ExerciseStatsDto.builder()
                .lastSessionDate(lastSession != null ? lastSession.getDate() : null)
                .lastSessionSets(lastSession != null
                        ? lastSession.getWorkoutExercise().getWorkoutSets().stream().map(workoutSetMapper::entityToDto).toList()
                        : List.of())
                .personalRecords(personalRecords)
                .build();
    }

    private void addImagesToExercise(String exerciseName, Exercise foundOrCreatedExercise, MultipartFile file) {
        if (file != null) {
            log.info("Storing image with filename: {} for exercise: {}", file.getOriginalFilename(), exerciseName);

            // add exercise picture
            ExercisePicture exercisePicture = pictureService.createOrUpdatePicture(
                    imageService.storeImage(exerciseName, file, PictureType.EXERCISE_IMAGE));
            foundOrCreatedExercise.getPictures().removeIf(picture1 -> picture1.getType() == PictureType.EXERCISE_IMAGE);
            foundOrCreatedExercise.addPicture(exercisePicture);

            // add exercise icon
            exercisePicture = pictureService.createOrUpdatePicture(
                    imageService.storeImage(exerciseName, file, PictureType.EXERCISE_ICON));
            foundOrCreatedExercise.getPictures().removeIf(picture1 -> picture1.getType() == PictureType.EXERCISE_ICON);
            foundOrCreatedExercise.addPicture(exercisePicture);
        } else {
            log.info("No image was added for exercise {}", exerciseName);
        }
    }
}
