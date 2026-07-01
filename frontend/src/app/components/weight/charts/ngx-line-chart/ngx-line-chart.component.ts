import {Component, HostBinding, Input} from '@angular/core';
import {NgxWeightChartData} from "../../model/ngx-chart-data-model";
import {LineChartModule} from "@swimlane/ngx-charts";
import {curveMonotoneX} from "d3-shape";

@Component({
  selector: 'app-ngx-line-chart',
  standalone: true,
  imports: [
    LineChartModule
  ],
  templateUrl: './ngx-line-chart.component.html',
  styleUrl: './ngx-line-chart.component.scss'
})
export class NgxLineChartComponent {

  private _chartData: NgxWeightChartData[] = [];

  @Input()
  set chartData(data: NgxWeightChartData[]) {
    this._chartData = (data ?? []).filter(Boolean).map(series => ({
      ...series,
      series: (series.series ?? [])
        // Drop 0 values — those are missing metrics (double defaults to 0.0), not real measurements.
        .filter(point => point.value > 0)
        .map(point => ({
          name: new Date(point.name as unknown as string),
          value: point.value
        }))
    })) as unknown as NgxWeightChartData[];
  }

  get chartData(): NgxWeightChartData[] {
    return this._chartData;
  }

  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Value';
  timeline: boolean = true;
  autoScale: boolean = true;
  curve = curveMonotoneX;

  // Render a dot at each data point. The parent turns this off for the "All" range,
  // where the points are too dense to stay legible.
  @Input()
  @HostBinding('class.show-dots')
  showDots = true;
}
