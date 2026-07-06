import {Component, OnInit, signal} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {SnackBarService} from "../../../services/snack-bar/snack-bar.service";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {MatTableModule} from "@angular/material/table";
import {TanitaService} from "../../../services/weight/tanita/tanita.service";
import {WithingsService} from "../../../services/weight/withings/withings.service";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MeasurementDetailsComponent} from "../measurement-details/measurement-details.component";

import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {BaseWeightClass} from "../base-weight/base-weight.class";
import {take} from "rxjs";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {
  NgxWeightChartService
} from "../../../services/rest/chart/weight/ngx/ngx-weight-chart.service";
import moment from "moment";
import {NgxWeightChartData} from "../model/ngx-chart-data-model";
import {MeasurementsTableComponent} from "../measurements-table/measurements-table.component";
import {TanitaMeasurementModel} from "../../../model/weight/tanita-measurement.model";

@Component({
    selector: 'app-tanita-weight',
    templateUrl: './tanita-weight.component.html',
    styleUrls: ['./tanita-weight.component.scss'],
    imports: [
    ReactiveFormsModule,
    MatTabsModule,
    FormsModule,
    MeasurementDetailsComponent,
    MatTableModule,
    MatIconButton,
    MatIcon,
    MatTooltip,
    TranslateModule,
    NgxChartsModule,
    NgxSpinnerModule,
    MeasurementsTableComponent
],
    providers: [
        TanitaService,
        WithingsService,
        MatCheckboxModule,
        MatTableModule,
    ]
})
export class TanitaWeightComponent extends BaseWeightClass implements OnInit {


  protected readonly numericColumns = [
    'weight', 'bmi', 'bodyFatRatio', 'bodyFatMass', 'bodyWatterRatio', 'bodyWatterMass',
    'muscleMass', 'muscleMassRatio', 'muscleQuality', 'boneMass', 'visceralFat', 'bmr',
    'metabolicAge', 'physiqueRating'
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
    muscleQuality: '',
    boneMass: 'kg',
    visceralFat: '',
    bmr: 'kcal',
    metabolicAge: '',
    physiqueRating: '',
  };
  protected tableData = signal<TanitaMeasurementModel[]>([]);

  public showChartsFormGroup: FormGroup;

  protected checkboxLabelKeys: string[] = ['WEIGHT', 'BMI', 'BODY_FAT'];

  public tanitaWeightData = signal<NgxWeightChartData[] | undefined>(undefined);

  constructor(private readonly tanitaService: TanitaService,
              private readonly translateService: TranslateService,
              private readonly snackBar: SnackBarService,
              private readonly spinner: NgxSpinnerService,
              private readonly chartService: NgxWeightChartService,
              private readonly formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.showChartsFormGroup = this.formBuilder.group({
      showChartsCheckboxes: this.formBuilder.array(this.checkboxLabelKeys.map(() => false)), // this.checkboxLabelKeys.map(() => false)
    });

    this.chartService.getMeasurementsByProviderAndType('TANITA', 'WEIGHT')
      .pipe(
        take(1),
      )
      .subscribe({
        next: data => {
          this.tanitaWeightData.set([data]);
        },
        error: (err) => this.snackBar.showErrorSnackBar(err),
      });

    this.loadTable();
  }

  private loadTable(): void {
    this.tanitaService.getMeasurements()
      .pipe(take(1))
      .subscribe({
        next: measurements => this.tableData.set(measurements),
        error: (err) => this.snackBar.showErrorSnackBar(err?.error),
      });
  }

  public xAxisFormat(val: string, index: any) {
    return moment(val).format('ll');
  }

  get checkboxControls(): FormControl[] {
    return (this.showChartsFormGroup.get('showChartsCheckboxes') as FormArray).controls as FormControl[];
  }

  public selectedTab(tabIndex: number) {
    this.selectedTabIndex.set(tabIndex);
  }

  public updateTanitaData() {
    this.spinner.show();
    this.tanitaService.updateReport()
      .pipe(
        take(1)
      )
      .subscribe({
        next: (response) => {
          this.spinner.hide();
          this.snackBar.showSuccessSnackBar(this.translateService.instant("ALERT.update-weight-report-successful") + (response.message ? ' ' + response.message : ''));
        },
        error: (error) => {
          this.snackBar.showErrorSnackBar(error.error);
          this.spinner.hide();
        },
      });
  }

  public onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

}
