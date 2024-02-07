import {Component, OnInit} from '@angular/core';
import {Interval} from "../../../model/time/interval";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MatCardModule} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {WeekDatePickerComponent} from "../week-date-picker/week-date-picker.component";
import {NumberCardModule} from "@swimlane/ngx-charts";
import {NgxDashboardService} from "../../../services/rest/chart/dashborad/charts/ngx/ngx-dashboard.service";
import moment from "moment";
import {NgxDataPoint} from "../../../services/rest/chart/weight/ngx/ngx-weight-chart.service";

@Component({
  selector: 'app-dashboard-totals',
  templateUrl: './dashboard-totals.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatDivider,
    WeekDatePickerComponent,
    NumberCardModule,

  ],
})
export class DashboardTotalsComponent implements OnInit {

  protected data: NgxDataPoint[];

  protected selectedWeekRange: Interval = {
    startDate: moment().startOf('isoWeek'),
    endDate: moment().startOf('isoWeek').add(6, 'days')
  };

  constructor(private readonly ngxDashboardService: NgxDashboardService) { }

  public ngOnInit(): void {
    this.loadChartData();
  }

  protected dateRangeSelected(interval: Interval) {
    this.selectedWeekRange = interval;
    this.loadChartData();
  }

  private loadChartData(): void {
    this.ngxDashboardService.getTotalsChartData(this.selectedWeekRange.startDate, this.selectedWeekRange.endDate)
      .subscribe((data) => {
        this.data = [...data.data];
      });
  }

}
