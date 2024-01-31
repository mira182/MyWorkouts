import {CustomErrorResponse} from "../../../../model/error/error.model";

export interface AlertSnackBarModel {
  error: CustomErrorResponse;
  message: string;
}
