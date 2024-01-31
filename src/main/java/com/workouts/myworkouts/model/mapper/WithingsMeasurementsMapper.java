package com.workouts.myworkouts.model.mapper;

import com.workouts.myworkouts.model.dto.weight.withings.WithingsMeasureDto;
import com.workouts.myworkouts.model.dto.weight.withings.WithingsMeasureGroupDto;
import com.workouts.myworkouts.model.dto.weight.withings.WithingsMeasureType;
import com.workouts.myworkouts.model.dto.weight.withings.WithingsMeasurementsDto;
import com.workouts.myworkouts.model.entity.withings.WithingsMeasurement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.TimeZone;

import static com.workouts.myworkouts.service.WeightUtils.bmiCalculator;
import static com.workouts.myworkouts.service.WeightUtils.calculatePercentage;

@Mapper(componentModel = "spring")
public abstract class WithingsMeasurementsMapper {

    @Mapping(target = "bodyFatMass", source = "fatMassWeight")
    @Mapping(target = "bodyFatRatio", source = "fatRatio")
    @Mapping(target = "bodyWatterMass", source = "hydration")
    @Mapping(target = "bodyWatterRatio", source = "hydrationRatio")
    public abstract WithingsMeasurementsDto entityToDto(WithingsMeasurement measurement);

    public WithingsMeasurement dtoToEntity(WithingsMeasureGroupDto withingsMeasureGroupDto, TimeZone timeZone) {

        WithingsMeasurement measurement = new WithingsMeasurement();
        measurement.setDate(LocalDateTime.ofInstant(Instant.ofEpochSecond(withingsMeasureGroupDto.getDate()), timeZone.toZoneId()));
        measurement.setWeight(convertMeasureToDouble(getMeasureByType(withingsMeasureGroupDto, WithingsMeasureType.WEIGHT)));
        measurement.setFatFreeMass(convertMeasureToDouble(getMeasureByType(withingsMeasureGroupDto, WithingsMeasureType.FAT_FREE_MASS)));
        measurement.setFatRatio(convertMeasureToDouble(getMeasureByType(withingsMeasureGroupDto, WithingsMeasureType.FAT_RATIO)));
        measurement.setFatMassWeight(convertMeasureToDouble(getMeasureByType(withingsMeasureGroupDto, WithingsMeasureType.FAT_MASS_WEIGHT)));
        measurement.setMuscleMass(convertMeasureToDouble(getMeasureByType(withingsMeasureGroupDto, WithingsMeasureType.MUSCLE_MASS)));
        measurement.setMuscleMassRatio(calculatePercentage(measurement.getWeight(), measurement.getMuscleMass()));
        measurement.setHydration(convertMeasureToDouble(getMeasureByType(withingsMeasureGroupDto, WithingsMeasureType.HYDRATION)));
        measurement.setHydrationRatio(calculatePercentage(measurement.getWeight(), measurement.getHydration()));
        measurement.setBoneMass(convertMeasureToDouble(getMeasureByType(withingsMeasureGroupDto, WithingsMeasureType.BONE_MASS)));
        measurement.setBmi(bmiCalculator(measurement.getWeight()));

        return measurement;
    }

    private static double convertMeasureToDouble(WithingsMeasureDto withingsMeasureDto) {
        if (withingsMeasureDto != null) {
            return BigDecimal.valueOf(withingsMeasureDto.getValue() * Math.pow(10, withingsMeasureDto.getUnit()))
                    .setScale(2, RoundingMode.HALF_UP)
                    .doubleValue();
        } else return 0;
    }

    private static WithingsMeasureDto getMeasureByType(WithingsMeasureGroupDto withingsMeasureGroupDto, WithingsMeasureType type) {
        return withingsMeasureGroupDto.getMeasures().stream()
                .filter(withingsMeasureDto -> withingsMeasureDto.getType() == type)
                .findFirst()
                .orElse(null);
    }
}
