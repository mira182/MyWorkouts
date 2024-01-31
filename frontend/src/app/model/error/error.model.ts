import {Moment} from "moment";

export interface CustomErrorResponse {
  statusCode: number;
  message: string;
  timestamp: Moment;
}
