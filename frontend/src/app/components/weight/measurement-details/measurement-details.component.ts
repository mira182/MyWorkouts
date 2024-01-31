import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import moment, {Moment} from "moment";
import {ScaleType} from "../base-weight/base-weight.class";
import {TanitaService} from "../../../services/weight/tanita/tanita.service";
import {WithingsService} from "../../../services/weight/withings/withings.service";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {DaySelectComponent} from "../../day-select/day-select.component";
import {TanitaMeasurementModel} from "../../../model/weight/tanita-measurement.model";
import {WithingsMeasurementModel} from "../../../model/weight/withings-measurement.model";
import {take} from "rxjs";
import {isNil} from "lodash";

export interface MeasurementDetails {
  name: string;
  value: number;
  unit: string;
  secondValue?: number;
  secondUnit?: string;
}

@Component({
  selector: ' app-measurement-details',
  templateUrl: './measurement-details.component.html',
  styleUrls: ['./measurement-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDivider,
    MatListModule,
    DaySelectComponent,
  ],
  providers: [
    TanitaService,
    WithingsService,
  ]
})
export class MeasurementDetailsComponent implements OnInit, OnChanges {

  @Input() measurementData: TanitaMeasurementModel[] | WithingsMeasurementModel[];

  @Input() date: Moment = moment();

  @Input() scaleType: ScaleType;

  measurementDetails : MeasurementDetails[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private tanitaService : TanitaService,
              private withingsService : WithingsService) {}

  ngOnInit(): void {
    // this.loadMeasurement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // we got data from outside
    // console.log(this.measurementData);
    // if (!isNil(this.measurementData)) {
    //   return;
    // }
    //
    // // date has changed => load new data
    // if (!isNil(changes['date']?.currentValue) && changes['date'].currentValue !== changes['date'].previousValue) {
    //   this.loadMeasurement();
    // }
  }

  private loadMeasurement(): void {
    switch (this.scaleType) {
      case ScaleType.TANITA:
        this.tanitaService.getMeasurementByDate(this.date)
          .pipe(
            take(1),
          )
          .subscribe(measurementData => {
            this.measurementData = measurementData;
            console.log(this.measurementData);
          });
        break;
      case ScaleType.WITHINGS:
        this.withingsService.getMeasurementByDate(this.date)
          .pipe(
            take(1),
          )
          .subscribe(measurementData => {
            this.measurementData = measurementData;
          });
        break;
    }
  }

  protected onDaySelected(date: moment.Moment) {
    this.date = date;
    this.loadMeasurement();
  }
}
