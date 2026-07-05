import {Component, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {NgxWeightChartData} from "../../model/ngx-chart-data-model";
import {Color, LineChartModule, ScaleType} from "@swimlane/ngx-charts";
import {curveMonotoneX} from "d3-shape";

@Component({
    selector: 'app-ngx-line-chart',
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
    this.computeXAxisTicks();
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
  // Bright, well-separated line colors that stay readable on the dark theme
  // (ngx-charts' default scheme is muted blues that vanish on dark surfaces).
  scheme: Color = {
    name: 'weightCharts',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      '#ffa726', // orange
      '#26c6da', // cyan
      '#66bb6a', // green
      '#ec407a', // pink
      '#ab47bc', // purple
      '#42a5f5', // blue
      '#ffee58', // yellow
      '#ef5350', // red
    ],
  };

  // Render a dot at each data point. The parent turns this off for the "All" range,
  // where the points are too dense to stay legible.
  @Input()
  @HostBinding('class.show-dots')
  showDots = true;

  private _compact = false;

  @Input()
  @HostBinding('class.compact')
  set compact(value: boolean) {
    this._compact = value;
    if (value) {
      this.legend = false;
      this.showXAxisLabel = false;
      this.showYAxisLabel = false;
    }
    this.computeXAxisTicks();
  }

  get compact(): boolean {
    return this._compact;
  }

  @Output() pointSelected = new EventEmitter<Date>();
  @Output() pointHovered = new EventEmitter<{ date: Date; x: number; y: number }>();
  @Output() pointLeft = new EventEmitter<void>();

  private lastMouse = {x: 0, y: 0};

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.lastMouse = {x: event.clientX, y: event.clientY};
  }

  protected onSelect(event: any): void {
    if (event?.name instanceof Date) {
      this.pointSelected.emit(event.name);
      this.pointHovered.emit({date: event.name, ...this.lastMouse});
    }
  }

  protected onActivate(event: any): void {
    const item = event?.value ?? event;
    if (item?.name instanceof Date) {
      this.pointHovered.emit({date: item.name, ...this.lastMouse});
    }
  }

  protected onDeactivate(): void {
    this.pointLeft.emit();
  }

  private static readonly DAILY_TICKS_MAX_DAYS = 31;

  xAxisTicks?: Date[];
  xScaleMin?: Date;

  xAxisFormat = (value: any): string => {
    const d = new Date(value);
    return `${d.getDate()}.${d.getMonth() + 1}.`;
  };

  private computeXAxisTicks(): void {
    const times = this._chartData
      .flatMap(series => series.series ?? [])
      .map(point => (point.name as unknown as Date).getTime());

    if (this._compact || !times.length) {
      this.xAxisTicks = undefined;
      this.xScaleMin = undefined;
      return;
    }

    const startOfDay = (t: number) => {
      const d = new Date(t);
      d.setHours(0, 0, 0, 0);
      return d;
    };

    const first = startOfDay(Math.min(...times));
    const last = startOfDay(Math.max(...times));
    const days = Math.round((last.getTime() - first.getTime()) / 86_400_000) + 1;

    if (days > NgxLineChartComponent.DAILY_TICKS_MAX_DAYS) {
      this.xAxisTicks = undefined;
      this.xScaleMin = undefined;
      return;
    }

    const ticks: Date[] = [];
    for (let i = 0; i < days; i++) {
      ticks.push(new Date(first.getTime() + i * 86_400_000));
    }
    this.xAxisTicks = ticks;
    this.xScaleMin = first;
  }
}
