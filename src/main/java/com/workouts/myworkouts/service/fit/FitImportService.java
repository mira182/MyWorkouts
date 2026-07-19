package com.workouts.myworkouts.service.fit;

import com.workouts.myworkouts.model.dto.fit.FitWorkoutDto;
import com.workouts.myworkouts.model.dto.fit.GarminMappingDto;
import lombok.NonNull;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FitImportService {

    FitWorkoutDto parseFitFile(@NonNull MultipartFile file);

    void saveMappings(@NonNull List<GarminMappingDto> mappings);
}
