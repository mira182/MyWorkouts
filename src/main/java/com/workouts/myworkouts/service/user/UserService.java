package com.workouts.myworkouts.service.user;


import com.workouts.myworkouts.model.dto.user.UserDto;
import com.workouts.myworkouts.model.entity.user.User;

import java.util.List;

public interface UserService {

    User saveOrUpdateUser(UserDto user);

    void updateUser(long id, UserDto user);

    List<User> findAll();

    void delete(long id);

    User findOne(String username);

    User findById(Long id);

    UserDto getUserDtoWithToken(String username);
}
