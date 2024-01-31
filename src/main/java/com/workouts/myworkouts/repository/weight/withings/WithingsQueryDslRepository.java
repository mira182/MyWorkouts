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

    private Expression<?> getColumnByMeasurementType(MeasurementType measurementType, QWithingsMeasurement qTanitaMeasurement) {
        return switch (measurementType) {
            case WEIGHT -> qTanitaMeasurement.weight;
        };
    }
}
