package com.workouts.myworkouts.repository.weight.tanita;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.workouts.myworkouts.model.dto.weight.projections.SingleMeasurement;
import com.workouts.myworkouts.model.entity.weight.QTanitaMeasurement;
import com.workouts.myworkouts.model.enums.MeasurementType;
import com.workouts.myworkouts.repository.weight.MeasurementQueryDslRepository;
import jakarta.persistence.EntityManager;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class TanitaQueryDslRepository implements MeasurementQueryDslRepository {

    private final EntityManager entityManager;

    public List<SingleMeasurement> findByColumnNameAndDate(@NonNull MeasurementType measurementType) {
        QTanitaMeasurement qTanitaMeasurement = QTanitaMeasurement.tanitaMeasurement;
        return new JPAQueryFactory(entityManager)
                .select(Projections.constructor(
                        SingleMeasurement.class,
                        qTanitaMeasurement.date,
                        getColumnByMeasurementType(measurementType, qTanitaMeasurement)
                ))
                .from(qTanitaMeasurement)
                .fetch();
    }

    private Expression<?> getColumnByMeasurementType(MeasurementType measurementType, QTanitaMeasurement qTanitaMeasurement) {
        return switch (measurementType) {
            case WEIGHT -> qTanitaMeasurement.weight;
        };
    }
}
