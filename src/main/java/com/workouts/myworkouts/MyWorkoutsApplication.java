package com.workouts.myworkouts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class MyWorkoutsApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyWorkoutsApplication.class, args);
    }

}
