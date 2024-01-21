package com.workouts.myworkouts.repository.weight;

import com.workouts.myworkouts.model.entity.weight.TanitaLastUpdate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TanitaLastUpdateRepository extends JpaRepository<TanitaLastUpdate, Long> {

    Optional<TanitaLastUpdate> findTopByOrderByIdDesc();
}
