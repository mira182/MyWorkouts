package com.workouts.myworkouts.controller;

import com.workouts.myworkouts.model.dto.user.LoginUser;
import com.workouts.myworkouts.model.dto.user.UserDto;
import com.workouts.myworkouts.model.entity.user.User;
import com.workouts.myworkouts.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.workouts.myworkouts.config.Constants.API_BASE_URL;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = API_BASE_URL + "/users")
public class UserController {

    private final UserService userService;

    private final AuthenticationManager authenticationManager;

    @GetMapping
    public List<User> listUser(){
        return userService.findAll();
    }

    @GetMapping(value = "/{id}")
    public User getOne(@PathVariable(value = "id") Long id){
        return userService.findById(id);
    }

    @PostMapping(value="/register")
    public User createUser(@RequestBody UserDto user){
        return userService.saveOrUpdateUser(user);
    }

    @PostMapping(value = "/authenticate")
    public ResponseEntity<UserDto> login(@RequestBody LoginUser loginUser) throws AuthenticationException {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUser.getUsername(),
                        loginUser.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final UserDto userDto = userService.getUserDtoWithToken(loginUser.getUsername());
        return ResponseEntity.ok(userDto);
    }

    @PutMapping(value = "/{id}")
    public void updateUser(@PathVariable long id, @RequestBody UserDto user){
        userService.updateUser(id, user);
    }

    @DeleteMapping
    public void deleteUser(@PathVariable(value = "id") Long id) {
        userService.delete(id);
    }

}
