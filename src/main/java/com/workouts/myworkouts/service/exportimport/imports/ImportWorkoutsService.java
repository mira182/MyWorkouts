package com.workouts.myworkouts.service.exportimport.imports;

import java.io.File;
import java.io.IOException;

public interface ImportWorkoutsService {

    void importWorkouts(File exportFolder) throws IOException;
}
