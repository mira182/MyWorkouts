import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
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
import {take} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgxWeightChartData} from "../model/ngx-chart-data-model";
import {NgxWeightChartService} from "../../../services/rest/chart/weight/ngx/ngx-weight-chart.service";
import {NgxLineChartComponent} from "../charts/ngx-line-chart/ngx-line-chart.component";

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
  ],
  providers: [
    WithingsService,
  ]
})
export class WithingsWeightComponent extends BaseWeightClass implements OnInit {

  displayedColumns = ['date', 'weight', 'bmi', 'bodyFatRatio', 'bodyFatMass', 'bodyWatterRatio', 'bodyWatterMass', 'muscleMass', 'muscleMassRatio'];
  smallFirstTableColumns = ['date', 'weight', 'bmi', 'bodyFatRatio', 'bodyFatMass',];
  smallSecondTableColumns = ['date', 'bodyWatterRatio', 'bodyWatterMass', 'muscleMass', 'muscleMassRatio'];
  differenceTableColumns = ['date', 'weightDifference', 'bodyFatRatioDifference', 'bodyFatMassDifference'];

  public showChartsFormGroup: FormGroup;

  public measurementData: NgxWeightChartData[];

  constructor(private route: ActivatedRoute,
              private snackBar: SnackBarService,
              private withingsService: WithingsService,
              private spinner: NgxSpinnerService,
              private readonly chartService: NgxWeightChartService,
              private readonly formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const withingsCode = params['code'];
      if (withingsCode) {
        this.withingsService.updateMeasurements(withingsCode);
      }
    });

    this.chartService.getMeasurementsByProviderAndType('WITHINGS', 'WEIGHT')
      .pipe(
        take(1),
      )
      .subscribe({
        next: data => {
          console.log(data)
          this.measurementData = [data];
        },
        error: (err) => this.snackBar.showErrorSnackBar(err),
      });
  }

  selectedTab(tabIndex: number) {
    this.selectedTabIndex = tabIndex;
  }

  redirectToWithingsAuthUrl() {
    this.withingsService.redirectToWithingsAuthUrl()
  }

}
