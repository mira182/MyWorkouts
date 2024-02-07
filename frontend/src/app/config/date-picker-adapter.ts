import {Injectable} from '@angular/core';
import {MomentDateAdapter} from "@angular/material-moment-adapter";

@Injectable()
export class MyDateAdapter extends MomentDateAdapter {

  override getFirstDayOfWeek(): number {
    return 1;
  }

}
