package com.workouts.myworkouts.model.dto.user;

import lombok.Data;

@Data
public class UserDto {

    private Long id;

    private String username;

    private String password;

    private String email;

    private String firstName;

    private String lastName;

    private String token;
}
