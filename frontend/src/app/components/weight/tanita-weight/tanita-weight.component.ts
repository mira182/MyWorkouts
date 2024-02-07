import {Component, OnInit} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {SnackBarService} from "../../../services/snack-bar/snack-bar.service";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {MatTableModule} from "@angular/material/table";
import {TanitaService} from "../../../services/weight/tanita/tanita.service";
import {WithingsService} from "../../../services/weight/withings/withings.service";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MeasurementDetailsComponent} from "../measurement-details/measurement-details.component";
import {CommonModule} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {BaseWeightClass} from "../base-weight/base-weight.class";
import {take} from "rxjs";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {
  NgxWeightChartData,
  NgxWeightChartService
} from "../../../services/rest/chart/weight/ngx/ngx-weight-chart.service";
import moment from "moment";

@Component({
  selector: 'app-tanita-weight',
  templateUrl: './tanita-weight.component.html',
  styleUrls: ['./tanita-weight.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCheckbox,
    FormsModule,
    MeasurementDetailsComponent,
    MatTableModule,
    MatIconButton,
    MatIcon,
    MatTooltip,
    TranslateModule,
    NgxChartsModule,
    NgxSpinnerModule,
  ],
  providers: [
    TanitaService,
    WithingsService,
    MatCheckboxModule,
    MatTableModule,
  ],
})
export class TanitaWeightComponent extends BaseWeightClass implements OnInit {


  displayedColumns = ['date', 'weight', 'bmi', 'bmr', 'bodyFatRatio', 'bodyWatterRatio', 'muscleMass', 'muscleMassRatio', 'muscleQuality', 'physiqueRating', 'visceralFat', 'metabolicAge'];
  smallFirstTableColumns = ['date', 'weight', 'bmi', 'bodyFatRatio', 'visceralFat'];
  smallSecondTableColumns = ['date', 'bmr', 'bodyWatterRatio', 'muscleMass',  'muscleMassRatio'];
  differenceTableColumns = ['date', 'weightDifference', 'bodyFatRatioDifference', 'bodyFatMassDifference', 'visceralFatDifference'];

  public showChartsFormGroup: FormGroup;

  protected checkboxLabelKeys: string[] = ['WEIGHT', 'BMI', 'BODY_FAT'];

  public tanitaWeightData: NgxWeightChartData[];

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
          this.tanitaWeightData = [data];
        },
        error: (err) => this.snackBar.showErrorSnackBar(err),
      });
  }

  public xAxisFormat(val: string, index: any) {
    return moment(val).format('ll');
  }

  get checkboxControls(): FormControl[] {
    return (this.showChartsFormGroup.get('showChartsCheckboxes') as FormArray).controls as FormControl[];
  }

  public selectedTab(tabIndex: number) {
    this.selectedTabIndex = tabIndex;
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
