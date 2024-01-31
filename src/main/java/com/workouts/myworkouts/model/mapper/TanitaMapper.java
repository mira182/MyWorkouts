package com.workouts.myworkouts.model.mapper;

import com.workouts.myworkouts.model.dto.weight.tanita.TanitaMeasurementsDto;
import com.workouts.myworkouts.model.entity.weight.TanitaMeasurement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TanitaMapper {

    @Mapping(target = "bodyFatRatio", source = "bodyFat")
    @Mapping(target = "bodyWatterRatio", source = "bodyWatter")
    TanitaMeasurementsDto entityToDto(TanitaMeasurement weightReport);
}
