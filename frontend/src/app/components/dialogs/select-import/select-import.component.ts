import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ExportImportService} from "../../../services/rest/export-import/export-import.service";
import moment from 'moment';
import {FolderNameModel} from "./model/folder-name.model";
import {MatLine} from "@angular/material/core";
import {MatActionList, MatListItem} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {CommonModule, DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-select-import',
  templateUrl: './select-import.component.html',
  styleUrls: ['./select-import.component.scss'],
  standalone: true,
  imports: [
    MatLine,
    MatActionList,
    MatIcon,
    MatIconButton,
    MatListItem,
    DatePipe,
    CommonModule,
  ]
})
export class SelectImportComponent implements OnInit {

  folderNames: FolderNameModel[] = [];

  constructor(public dialogRef: MatDialogRef<SelectImportComponent>,
              private importService: ExportImportService) { }

  ngOnInit(): void {
    this.importService.getExportFolderNames().subscribe(folderNames => {
      folderNames.forEach(name => {
        this.folderNames.push({
          name: name,
          date: moment([parseInt(name.substring(0, 4)),
          parseInt(name.substring(4, 6)) - 1,
          parseInt(name.substring(6, 8)),
          parseInt(name.substring(8, 10)),
          parseInt(name.substring(10, 12)),
          parseInt(name.substring(12, 14))])
        });
      });
    });
  }

  importFromFolder(folder: FolderNameModel) {
    this.dialogRef.close(folder.name);
  }

}
