package com.workouts.myworkouts.model.mapper;

import com.workouts.myworkouts.config.JwtTokenUtil;
import com.workouts.myworkouts.model.dto.user.UserDto;
import com.workouts.myworkouts.model.entity.user.User;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public abstract class UserMapper {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    public abstract UserDto entityToDto(User user);

    public abstract User dtoToEntity(UserDto user);

    @AfterMapping
    void appendToken(@MappingTarget UserDto userDto, User user) {
        userDto.setToken(jwtTokenUtil.generateToken(user));
    }
}
