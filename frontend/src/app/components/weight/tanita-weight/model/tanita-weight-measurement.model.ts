import {BaseWeightMeasurement} from "../../measurement-details/model/base-weight-measurement.model";

export interface TanitaWeightMeasurementModel extends BaseWeightMeasurement {
  visceralFat: number;
  muscleQuality: number;
  physiqueRating: number;
  boneMass: number;
  fatFreeMass: number;
  bmr: number;
  metabolicAge: number;
}
