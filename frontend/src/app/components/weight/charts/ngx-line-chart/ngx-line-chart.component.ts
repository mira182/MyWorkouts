import {Component, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {NgxWeightChartData} from "../../model/ngx-chart-data-model";
import {Color, LineChartModule, ScaleType} from "@swimlane/ngx-charts";
import {curveMonotoneX} from "d3-shape";
import moment from "moment";
import {DATE_FORMATS} from "../../../../config/date-formats";

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

  // ngx-charts' own legend either steals width (right) or overflows the fixed-height
  // host (below — it reserves no space). We render a compact legend ourselves instead.
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  // The y values are self-explanatory here; the "Value" axis name only ate plot width.
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Value';
  timeline: boolean = true;
  autoScale: boolean = true;
  curve = curveMonotoneX;
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

  @Input()
  @HostBinding('class.show-dots')
  showDots = true;

  private _compact = false;

  @Input()
  @HostBinding('class.compact')
  set compact(value: boolean) {
    this._compact = value;
    if (value) {
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
  // Cap visible x-axis labels so dates don't overlap on dense ranges (e.g. a full month).
  private static readonly MAX_X_TICKS = 7;

  xAxisTicks?: Date[];
  xScaleMin?: Date;

  xAxisFormat = (value: any): string => moment(value).format(DATE_FORMATS.shortDayMonth);

  protected tooltipDate(value: any): string {
    return value ? moment(value).format(DATE_FORMATS.display) : '';
  }

  // Only worth a legend when there's more than one line to tell apart (and not the sparkline).
  protected get showCustomLegend(): boolean {
    return !this._compact && this._chartData.length > 1;
  }

  // Series are colored by their order in the scheme domain (ScaleType.Ordinal).
  protected get legendItems(): { name: string; color: string }[] {
    return this._chartData.map((series, i) => ({
      name: (series as { name?: string }).name ?? '',
      color: this.scheme.domain[i % this.scheme.domain.length],
    }));
  }

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

    // Step so we show at most MAX_X_TICKS evenly-spaced days across the range.
    const step = Math.max(1, Math.ceil(days / NgxLineChartComponent.MAX_X_TICKS));
    const ticks: Date[] = [];
    for (let i = 0; i < days; i += step) {
      ticks.push(new Date(first.getTime() + i * 86_400_000));
    }
    // Always anchor the final day so the axis ends on the latest measurement.
    if (ticks[ticks.length - 1]?.getTime() !== last.getTime()) {
      ticks.push(last);
    }
    this.xAxisTicks = ticks;
    this.xScaleMin = first;
  }
}
