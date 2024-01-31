import {Router} from "@angular/router";
import {Moment} from "moment";

export enum ScaleType {
  TANITA,
  WITHINGS
}

export class BaseWeightClass {

  showWeight : boolean = true;
  showBMI : boolean = true;
  showBodyFat : boolean = true;
  showMuscleMass : boolean = true;
  showBodyWatter : boolean = true;
  showAnalysis : boolean = true;

  allCharts = [];

  measurementDate: Moment;

  selectedScaleType: ScaleType = ScaleType.TANITA;
  selectedTabIndex = 0;

}
