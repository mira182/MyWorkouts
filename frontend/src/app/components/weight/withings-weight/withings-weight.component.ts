import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WithingsMeasurementModel} from "../../../model/weight/withings-measurement.model";
import {MeasurementsTableComponent} from "../measurements-table/measurements-table.component";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {TranslateModule} from "@ngx-translate/core";
import {SnackBarService} from "../../../services/snack-bar/snack-bar.service";
import {MeasurementDetailsComponent} from "../measurement-details/measurement-details.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {CommonModule} from "@angular/common";
import {WithingsService} from "../../../services/weight/withings/withings.service";
import {BaseWeightClass} from "../base-weight/base-weight.class";
import {forkJoin, take} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgxWeightChartData} from "../model/ngx-chart-data-model";
import {MeasurementType} from "../../../model/weight/measurement-type.enum";
import {NgxWeightChartService} from "../../../services/rest/chart/weight/ngx/ngx-weight-chart.service";
import {NgxLineChartComponent} from "../charts/ngx-line-chart/ngx-line-chart.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

interface ChartDefinition {
  key: string;
  title: string;
  types: MeasurementType[];
}

interface RangeOption {
  label: string;
  days: number; // 0 = all
}

@Component({
  selector: 'app-withings-weight',
  templateUrl: './withings-weight.component.html',
  styleUrls: ['./withings-weight.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTooltip,
    MatTabsModule,
    MeasurementDetailsComponent,
    MatIcon,
    MatIconButton,
    TranslateModule,
    NgxLineChartComponent,
    MatButtonToggleModule,
    NgxSpinnerModule,
    MeasurementsTableComponent,
  ],
  providers: [
    WithingsService,
  ]
})
export class WithingsWeightComponent extends BaseWeightClass implements OnInit {

  protected readonly numericColumns = [
    'weight', 'bmi', 'bodyFatRatio', 'bodyFatMass', 'bodyWatterRatio', 'bodyWatterMass',
    'muscleMass', 'muscleMassRatio', 'boneMass'
  ];

  protected readonly units: Record<string, string> = {
    weight: 'kg',
    bmi: '',
    bodyFatRatio: '%',
    bodyFatMass: 'kg',
    bodyWatterRatio: '%',
    bodyWatterMass: 'kg',
    muscleMass: 'kg',
    muscleMassRatio: '%',
    boneMass: 'kg',
  };
  protected tableData: WithingsMeasurementModel[] = [];

  protected readonly charts: ChartDefinition[] = [
    {key: 'weight', title: 'Weight', types: ['WEIGHT']},
    {key: 'mass', title: 'Fat & muscle mass', types: ['FAT_MASS', 'MUSCLE_MASS']},
    {key: 'ratio', title: 'Fat & muscle ratio', types: ['FAT_RATIO', 'MUSCLE_MASS_RATIO']},
    {key: 'bmi', title: 'BMI', types: ['BMI']},
    {key: 'water', title: 'Water', types: ['WATER_MASS', 'WATER_RATIO']},
    {key: 'bone', title: 'Bone mass', types: ['BONE_MASS']},
  ];

  protected readonly ranges: RangeOption[] = [
    {label: '1W', days: 7},
    {label: '1M', days: 30},
    {label: '3M', days: 90},
    {label: '6M', days: 180},
    {label: '1Y', days: 365},
    {label: 'All', days: 0},
  ];
  protected selectedRangeDays = 7;

  protected viewData: { [key: string]: NgxWeightChartData[] } = {};
  private readonly allData: { [key: string]: NgxWeightChartData[] } = {};

  constructor(private route: ActivatedRoute,
              private snackBar: SnackBarService,
              private withingsService: WithingsService,
              private spinner: NgxSpinnerService,
              private readonly chartService: NgxWeightChartService) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      const withingsCode = params['code'];
      if (withingsCode) {
        this.importMeasurements(withingsCode);
      } else {
        this.loadAllCharts();
        this.loadTable();
      }
    });
  }

  private importMeasurements(code: string): void {
    this.spinner.show();
    this.withingsService.updateMeasurements(code)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBar.showSuccessSnackBar('ALERT.successfully-saved');
          this.loadAllCharts();
          this.loadTable();
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.snackBar.showErrorSnackBar(err?.error);
        },
      });
  }

  private loadAllCharts(): void {
    this.charts.forEach(chart => this.loadChart(chart));
  }

  private loadTable(): void {
    this.withingsService.getMeasurements()
      .pipe(take(1))
      .subscribe({
        next: measurements => this.tableData = measurements,
        error: (err) => this.snackBar.showErrorSnackBar(err?.error),
      });
  }

  protected onRangeChange(days: number): void {
    this.selectedRangeDays = days;
    this.charts.forEach(chart => this.viewData[chart.key] = this.filterByRange(this.allData[chart.key]));
  }

  private loadChart(chart: ChartDefinition): void {
    forkJoin(chart.types.map(type => this.chartService.getMeasurementsByProviderAndType('WITHINGS', type)))
      .pipe(
        take(1),
      )
      .subscribe({
        next: data => {
          this.allData[chart.key] = data;
          this.viewData[chart.key] = this.filterByRange(data);
        },
        error: (err) => this.snackBar.showErrorSnackBar(err),
      });
  }

  private filterByRange(data: NgxWeightChartData[]): NgxWeightChartData[] {
    if (!data || this.selectedRangeDays === 0) {
      return data;
    }
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - this.selectedRangeDays);
    return data.map(series => ({
      ...series,
      series: (series.series ?? []).filter(point => new Date(point.name as unknown as string) >= cutoff)
    }));
  }

  selectedTab(tabIndex: number) {
    this.selectedTabIndex = tabIndex;
  }

  redirectToWithingsAuthUrl(): void {
    this.spinner.show();
    this.withingsService.getWithingsAuthUrl()
      .pipe(take(1))
      .subscribe({
        next: response => {
          if (response?.authUrl) {
            window.location.href = response.authUrl;
          } else {
            this.spinner.hide();
          }
        },
        error: (err) => {
          this.spinner.hide();
          this.snackBar.showErrorSnackBar(err?.error);
        },
      });
  }

}
