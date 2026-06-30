import {Moment} from "moment/moment";

export interface NgxDataPoint {
  name: Moment;
  value: number;
}

export interface NgxWeightChartData {
  name: string;
  series: NgxDataPoint[];
}
