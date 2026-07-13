import {Component, Input, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {TranslateModule} from "@ngx-translate/core";
import {AppDatePipe} from "../../../pipes/app-date.pipe";

export interface MeasurementRow {
  date: string | Date;

  [metric: string]: any;
}

@Component({
    selector: 'app-measurements-table',
    imports: [
        CommonModule,
        AppDatePipe,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        TranslateModule,
    ],
    templateUrl: './measurements-table.component.html',
    styleUrl: './measurements-table.component.scss'
})
export class MeasurementsTableComponent {

  protected readonly dataSource = new MatTableDataSource<MeasurementRow>();

  protected tableColumns: string[] = [];
  private _numericColumns: string[] = [];

  @Input({required: true})
  set numericColumns(columns: string[]) {
    this._numericColumns = columns ?? [];
    this.tableColumns = ['date', ...this._numericColumns];
  }

  get numericColumns(): string[] {
    return this._numericColumns;
  }

  @Input() units: Record<string, string> = {};

  @Input()
  set data(rows: MeasurementRow[]) {
    this.dataSource.data = rows ?? [];
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    if (paginator) {
      this.dataSource.paginator = paginator;
    }
  }

  constructor() {
    this.dataSource.sortingDataAccessor = (item, property) =>
      property === 'date' ? new Date(item.date).getTime() : item[property];
  }
}
