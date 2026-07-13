import {Pipe, PipeTransform} from '@angular/core';
import moment from 'moment';
import {DATE_FORMATS} from '../config/date-formats';

@Pipe({name: 'appDate'})
export class AppDatePipe implements PipeTransform {

  transform(value: unknown, preset: keyof typeof DATE_FORMATS = 'display'): string {
    if (!value) {
      return '';
    }
    const parsed = moment(value as string | number | Date);
    return parsed.isValid() ? parsed.format(DATE_FORMATS[preset]) : '';
  }
}
