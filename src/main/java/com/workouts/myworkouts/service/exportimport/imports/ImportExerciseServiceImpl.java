package com.workouts.myworkouts.service.exportimport.imports;

import com.fasterxml.jackson.core.type.TypeReference;
import com.workouts.myworkouts.model.dto.exercise.ExerciseDto;
import com.workouts.myworkouts.service.exercise.ExerciseService;
import com.workouts.myworkouts.service.exportimport.ExportImportObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImportExerciseServiceImpl implements ImportExerciseService {

    private final ExerciseService exerciseService;

    private final ExportImportObjectMapper mapper;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void importExercises(File exportFolder) throws IOException {
        final File importFile = new File(exportFolder, "exercises_export.json");
        final List<ExerciseDto> exercisesToImport = mapper.readValue(importFile, new TypeReference<>() {});

        exercisesToImport.forEach(exerciseService::createExercise);
    }
}
