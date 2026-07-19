package com.workouts.myworkouts.service.fit;

import com.workouts.myworkouts.model.dto.fit.FitWorkoutDto;
import lombok.NonNull;
import org.springframework.web.multipart.MultipartFile;

public interface FitImportService {

    FitWorkoutDto parseFitFile(@NonNull MultipartFile file);
}
