import {Component, Input, OnInit} from '@angular/core';
import {NgxDataPoint, NgxWeightChartData} from "../../model/ngx-chart-data-model";
import {LineChartModule} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-ngx-line-chart',
  standalone: true,
  imports: [
    LineChartModule
  ],
  templateUrl: './ngx-line-chart.component.html',
  styleUrl: './ngx-line-chart.component.scss'
})
export class NgxLineChartComponent implements OnInit {

  @Input()
  chartData: NgxWeightChartData[];

  multi: any[];
  view: any[] = [700, 300];
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  ngOnInit(): void {
    this.multi = this.chartData
  }
}
