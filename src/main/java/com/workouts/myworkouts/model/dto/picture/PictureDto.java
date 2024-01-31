package com.workouts.myworkouts.model.dto.picture;

import com.workouts.myworkouts.model.enums.PictureType;
import jakarta.validation.constraints.Size;
import lombok.*;


@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PictureDto {

    private Long id;

    @Size(max = 512)
    private String name;

    @Size(max = 2048)
    private String relativePath;

    private PictureType type;
}
