package com.workouts.myworkouts.controller;

import com.workouts.myworkouts.service.picture.PictureService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.workouts.myworkouts.config.Constants.API_BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = API_BASE_URL + "/images")
public class PictureController {

    private final PictureService pictureService;

    @GetMapping(value = "/get-image")
    public @ResponseBody byte[] getImage(@RequestParam("pictureId") long pictureId) {
        return pictureService.getPictureDataById(pictureId);
    }
}
