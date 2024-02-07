import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {Interval} from "../../../model/time/interval";
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {combineLatest, take} from "rxjs";
import {LineChartModule, NgxChartsModule, PieChartModule} from "@swimlane/ngx-charts";
import {WeekDatePickerComponent} from "../week-date-picker/week-date-picker.component";
import moment from "moment";
import {GoogleChartsModule} from "angular-google-charts";
import {
  ChartJsDashboardService
} from "../../../services/rest/chart/dashborad/charts/chartjs/chart-js-dashboard.service";
import {createBreakdownChartConfig} from "../../../model/charts/configuration/create-breakdown-chart.config";
import {isNil} from "lodash";
import {ChartsService} from "../../../services/rest/chart/dashborad/charts/charts.service";
import {Chart} from 'chart.js';

@Component({
  selector: 'app-dashboard-breakdown',
  templateUrl: './dashboard-breakdown.component.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    TranslateModule,
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    PieChartModule,
    LineChartModule,
    WeekDatePickerComponent,
    NgxChartsModule,
    GoogleChartsModule,
  ]
})
export class DashboardBreakdownComponent implements OnInit {

  protected selectedBreakdownValue: FormControl;

  protected breakdownOptions: string[] = [];

  protected breakdownGroups: string[] = [];

  protected chart: Chart<"pie", number[], string>;

  protected selectedInterval: Interval = {
    startDate: moment().startOf('isoWeek'),
    endDate: moment().startOf('isoWeek').add('6', 'days')
  }

  constructor(private readonly chartsService: ChartsService,
              private readonly chartJsDashboardService: ChartJsDashboardService) {
  }

  ngOnInit(): void {
    combineLatest([
      this.chartsService.getAllBreakdownChartTypes(),
      this.chartsService.getAllBreakdownChartGroups()
    ])
      .pipe(
        take(1),
      )
      .subscribe(([breakdownChartTypes, breakdownChartGroups]) => {
        this.breakdownOptions = breakdownChartTypes;
        this.breakdownGroups = breakdownChartGroups;
      });

    this.selectedBreakdownValue = new FormControl({ group: 'EXERCISE_CATEGORY', option: "SETS_NUMBER"});

    this.getBreakDownChartData();
  }

  protected dateRangeSelected(interval: Interval) {
    this.selectedInterval = interval;
    this.getBreakDownChartData();
  }

  protected breakdownTypeSelected() {
    this.getBreakDownChartData();
  }

  private getBreakDownChartData(): void {
    this.chartJsDashboardService.getBreakdownChartData(
      this.selectedBreakdownValue.value.group,
      this.selectedBreakdownValue.value.option,
      this.selectedInterval.startDate,
      this.selectedInterval.endDate,
    )
      .pipe(
        take(1)
      )
      .subscribe(data => {
        if (!isNil(this.chart)) {
          this.chart.destroy();
        }

        this.chart = createBreakdownChartConfig(
          data.data.map(point => point.key),
          data.data.map(point => point.value));
      });
  }
}
