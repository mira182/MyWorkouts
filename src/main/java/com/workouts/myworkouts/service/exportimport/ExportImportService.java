package com.workouts.myworkouts.service.exportimport;

import java.io.FileNotFoundException;

public interface ExportImportService {

    boolean importLatest() throws FileNotFoundException;

    boolean importFromFolder(String folderName);

}
