package com.workouts.myworkouts.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class StaticResourceConfiguration implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        final String imgLocation = Paths.get("img").toAbsolutePath().toUri().toString();
        registry.addResourceHandler("/img/**")
                .addResourceLocations(imgLocation.endsWith("/") ? imgLocation : imgLocation + "/");
    }
}
