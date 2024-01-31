package com.workouts.myworkouts.model.entity.exercise;

import com.workouts.myworkouts.model.entity.audit.AuditableTime;
import com.workouts.myworkouts.model.entity.picture.Picture;
import com.workouts.myworkouts.model.enums.ExerciseCategory;
import com.workouts.myworkouts.model.enums.ExerciseType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "exercise")
public class Exercise extends AuditableTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(unique = true)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ExerciseType type;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ExerciseCategory category;

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinTable(
            joinColumns = @JoinColumn(name = "exercise_id"),
            inverseJoinColumns = @JoinColumn(name = "picture_id")
    )
    private List<Picture> pictures = new ArrayList<>();

    public void addPicture(Picture picture) {
        pictures.add(picture);
    }

    public void removePicture(Picture picture) {
        pictures.remove(picture);
    }

}
