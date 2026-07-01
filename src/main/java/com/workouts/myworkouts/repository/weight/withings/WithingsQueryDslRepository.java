package com.workouts.myworkouts.repository.weight.withings;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.workouts.myworkouts.model.dto.weight.projections.SingleMeasurement;
import com.workouts.myworkouts.model.entity.weight.QTanitaMeasurement;
import com.workouts.myworkouts.model.entity.withings.QWithingsMeasurement;
import com.workouts.myworkouts.model.enums.MeasurementType;
import com.workouts.myworkouts.repository.weight.MeasurementQueryDslRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class WithingsQueryDslRepository implements MeasurementQueryDslRepository {

    private final EntityManager entityManager;

    public List<SingleMeasurement> findByColumnNameAndDate(MeasurementType measurementType) {
        QWithingsMeasurement qWithingsMeasurement = QWithingsMeasurement.withingsMeasurement;
        return new JPAQueryFactory(entityManager)
                .select(Projections.constructor(
                        SingleMeasurement.class,
                        qWithingsMeasurement.date,
                        getColumnByMeasurementType(measurementType, qWithingsMeasurement)
                ))
                .from(qWithingsMeasurement)
                .fetch();
    }

    private Expression<?> getColumnByMeasurementType(MeasurementType measurementType, QWithingsMeasurement qWithingsMeasurement) {
        return switch (measurementType) {
            case WEIGHT -> qWithingsMeasurement.weight;
            case BMI -> qWithingsMeasurement.bmi;
            case FAT_RATIO -> qWithingsMeasurement.fatRatio;
            case FAT_MASS -> qWithingsMeasurement.fatMassWeight;
            case MUSCLE_MASS -> qWithingsMeasurement.muscleMass;
            case MUSCLE_MASS_RATIO -> qWithingsMeasurement.muscleMassRatio;
            case BONE_MASS -> qWithingsMeasurement.boneMass;
            case WATER_MASS -> qWithingsMeasurement.hydration;
            case WATER_RATIO -> qWithingsMeasurement.hydrationRatio;
        };
    }
}
