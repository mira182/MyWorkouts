package com.workouts.myworkouts.service.exportimport.imports;

import com.fasterxml.jackson.core.type.TypeReference;
import com.workouts.myworkouts.model.dto.export.WorkoutExerciseExportDto;
import com.workouts.myworkouts.service.exportimport.ExportImportObjectMapper;
import com.workouts.myworkouts.service.workout.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImportWorkoutsServiceImpl implements ImportWorkoutsService {

    private final WorkoutService workoutService;

    private final ExportImportObjectMapper mapper;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void importWorkouts(File exportFolder) throws IOException {
        final File importFile = new File(exportFolder, "workouts_export.json");
        final List<WorkoutExerciseExportDto> exercisesToImport = mapper.readValue(importFile, new TypeReference<>() {});

        exercisesToImport.forEach(workoutService::importWorkoutExercises);
    }
}
