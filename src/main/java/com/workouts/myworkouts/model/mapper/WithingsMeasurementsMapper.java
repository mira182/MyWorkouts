package com.workouts.myworkouts.model.mapper;

import com.workouts.myworkouts.model.dto.weight.withings.MeasureDto;
import com.workouts.myworkouts.model.dto.weight.withings.MeasureGroupDto;
import com.workouts.myworkouts.model.dto.weight.withings.MeasureType;
import com.workouts.myworkouts.model.dto.weight.withings.WithingsMeasurementDto;
import com.workouts.myworkouts.model.entity.withings.WithingsMeasurement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.TimeZone;

import static com.workouts.myworkouts.service.WeightUtils.calculatePercentage;

@Mapper(componentModel = "spring")
public abstract class WithingsMeasurementsMapper {

    @Mapping(target = "bodyFatMass", source = "fatMassWeight")
    @Mapping(target = "bodyFatRatio", source = "fatRatio")
    @Mapping(target = "bodyWatterMass", source = "hydration")
    @Mapping(target = "bodyWatterRatio", source = "hydrationRatio")
    public abstract WithingsMeasurementDto entityToDto(WithingsMeasurement measurement);

    public WithingsMeasurement dtoToEntity(MeasureGroupDto measureGroupDto, TimeZone timeZone) {

        WithingsMeasurement measurement = new WithingsMeasurement();
        measurement.setDate(LocalDateTime.ofInstant(Instant.ofEpochSecond(measureGroupDto.getDate()), timeZone.toZoneId()));
        measurement.setWeight(convertMeasureToDouble(getMeasureByType(measureGroupDto, MeasureType.WEIGHT)));
        measurement.setFatFreeMass(convertMeasureToDouble(getMeasureByType(measureGroupDto, MeasureType.FAT_FREE_MASS)));
        measurement.setFatRatio(convertMeasureToDouble(getMeasureByType(measureGroupDto, MeasureType.FAT_RATIO)));
        measurement.setFatMassWeight(convertMeasureToDouble(getMeasureByType(measureGroupDto, MeasureType.FAT_MASS_WEIGHT)));
        measurement.setMuscleMass(convertMeasureToDouble(getMeasureByType(measureGroupDto, MeasureType.MUSCLE_MASS)));
        measurement.setMuscleMassRatio(calculatePercentage(measurement.getWeight(), measurement.getMuscleMass()));
        measurement.setHydration(convertMeasureToDouble(getMeasureByType(measureGroupDto, MeasureType.HYDRATION)));
        measurement.setHydrationRatio(calculatePercentage(measurement.getWeight(), measurement.getHydration()));
        measurement.setBoneMass(convertMeasureToDouble(getMeasureByType(measureGroupDto, MeasureType.BONE_MASS)));
        measurement.setBmi(bmiCalculator(measurement.getWeight()));

        return measurement;
    }

    private static double convertMeasureToDouble(MeasureDto measureDto) {
        if (measureDto != null) {
            return BigDecimal.valueOf(measureDto.getValue() * Math.pow(10, measureDto.getUnit()))
                    .setScale(2, RoundingMode.HALF_UP)
                    .doubleValue();
        } else return 0;
    }

    private static MeasureDto getMeasureByType(MeasureGroupDto measureGroupDto, MeasureType type) {
        return measureGroupDto.getMeasures().stream()
                .filter(measureDto -> measureDto.getType() == type)
                .findFirst()
                .orElse(null);
    }

    private static double bmiCalculator(double weight) {
        final double height = 1.86;
        return BigDecimal.valueOf(weight / Math.pow(height, 2))
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
    }
}
