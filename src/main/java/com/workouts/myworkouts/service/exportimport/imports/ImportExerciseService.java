package com.workouts.myworkouts.service.exportimport.imports;

import java.io.File;
import java.io.IOException;

public interface ImportExerciseService {

    void importExercises(File exportFolder) throws IOException;
}
