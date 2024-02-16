package com.workouts.myworkouts.service.exportimport;

import com.workouts.myworkouts.service.exportimport.imports.ImportExerciseService;
import com.workouts.myworkouts.service.exportimport.imports.ImportWorkoutsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExportImportServiceImpl implements ExportImportService {

    private static final DateTimeFormatter TIMESTAMP_PATTERN = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

    private final ImportExerciseService importExerciseService;

    private final ImportWorkoutsService importWorkoutsService;

    @Override
    @Transactional
    public boolean importLatest() throws FileNotFoundException {
        final File importFolder = ResourceUtils.getFile("classpath:export");
        if (importFolder.listFiles() == null) return false;

        Optional<String> latestExportFolderName = Arrays.stream(importFolder.listFiles())
                .filter(File::isDirectory)
                .map(File::getName)
                .max(String::compareTo);

        if (latestExportFolderName.isPresent()) {
            final File latestExportFolder = new File(importFolder, latestExportFolderName.get());
            try {
                importExerciseService.importExercises(latestExportFolder);
                importWorkoutsService.importWorkouts(latestExportFolder);
            } catch (IOException e) {
                log.error("Failed to import data", e);
                throw new IllegalStateException("Failed to import data", e);
            }
        }
        return true;
    }

    @Override
    public boolean importFromFolder(String folderName) {
        final File importFolder = new File("export");
        if (importFolder.listFiles() == null) return false;

        final File exportFolder = new File(importFolder, folderName);
        try {
            importExerciseService.importExercises(exportFolder);
            importWorkoutsService.importWorkouts(exportFolder);
        } catch (IOException e) {
            log.error("Failed to import data", e);
            throw new IllegalStateException("Failed to import data", e);
        }
        return true;
    }
}
