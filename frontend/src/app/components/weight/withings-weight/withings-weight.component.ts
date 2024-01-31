import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {SnackBarService} from "../../../services/snack-bar/snack-bar.service";
import {ThemeService} from "../../../services/theme/theme.service";
import {MeasurementDetailsComponent} from "../measurement-details/measurement-details.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {CommonModule} from "@angular/common";
import {WithingsService} from "../../../services/weight/withings/withings.service";
import {BaseWeightClass} from "../base-weight/base-weight.class";

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

  constructor(private route: ActivatedRoute,
              private snackBar: SnackBarService,
              private withingsService: WithingsService,
              private spinner: NgxSpinnerService) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const withingsCode = params['code'];
      if (withingsCode) {
        this.withingsService.saveMeasurements(withingsCode);
      }
    });
  }

  selectedTab(tabIndex: number) {
    this.selectedTabIndex = tabIndex;
  }

  redirectToGetCodeUrl() {
    window.location.href =
      WithingsService.GET_CODE_URL + '?response_type=code&client_id=' + WithingsService.CLIENT_ID + '&redirect_uri=' + WithingsService.REDIRECT_URI + '&state=test&scope=user.metrics';
  }

}
