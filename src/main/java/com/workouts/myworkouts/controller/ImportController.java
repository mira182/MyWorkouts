package com.workouts.myworkouts.controller;

import com.workouts.myworkouts.config.Constants;
import com.workouts.myworkouts.service.exportimport.ExportImportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = Constants.API_BASE_URL + "/import")
public class ImportController {

    private final ExportImportService exportService;

    @GetMapping()
    public boolean importWorkouts() throws FileNotFoundException {
        return exportService.importLatest();
    }

    @GetMapping(value = "/{folderName}")
    public boolean importFromFolder(@PathVariable String folderName) {
        return exportService.importFromFolder(folderName);
    }
}
