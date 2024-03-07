package com.workouts.myworkouts.model.entity.picture;

import com.workouts.myworkouts.model.entity.audit.AuditableTime;
import com.workouts.myworkouts.model.entity.exercise.Exercise;
import com.workouts.myworkouts.model.enums.PictureType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
@Table(name = "exercise_picture")
public class ExercisePicture extends AuditableTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 512)
    private String name;

    @Size(max = 2048)
    private String relativePath;

    @Enumerated(EnumType.STRING)
    private PictureType type;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Exercise exercise;
}
