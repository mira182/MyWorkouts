import {Injectable} from '@angular/core';
import {RangeType} from "../../model/utils/rangeType";
import {Interval} from "../../model/time/interval";
import {Moment} from "moment";

@Injectable()
export class DateTimeService {

  constructor() { }

  public static startOfWeek(date: Date) {
    const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  public static getFirstAndLastDayOfMonth(date: Date) {
    return {
      firstDay: new Date(date.getFullYear(), date.getMonth(), 1),
      lastDay: new Date(date.getFullYear(), date.getMonth() + 1, 0)
    }
  }

  public static getFirstAndLastDateOfWeek(date: Date) {
    return {
      firstDay: this.startOfWeek(date),
      lastDay: this.addDays(this.startOfWeek(date), 6)
    }
  }

  public static addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  public static addMonths(date: Date, months: number) {
    let d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }

  public static getMondays(date: Date) {
    const d = date,
      month = d.getMonth(),
      mondays = [];

    d.setDate(1);

    // Get the first Monday in the month
    while (d.getDay() !== 1) {
      d.setDate(d.getDate() + 1);
    }

    // Get all the other Mondays in the month
    while (d.getMonth() === month) {
      mondays.push(new Date(d.getTime()));
      d.setDate(d.getDate() + 7);
    }

    return mondays;
  }

  public static isAM(date: Date) {
    return date.getHours() > 12;
  }

  public static addTimeByRange(startOfRange: Moment, rangeType: RangeType) {
    switch (rangeType) {
      case RangeType.DAY:
        return startOfRange.add(1, 'd');
      case RangeType.WEEK:
        return startOfRange.add(7, 'd');
      case RangeType.MONTH:
        return startOfRange.add(1, 'M');
    }
  }

  public static monthDiff(interval: Interval) {
    let months;
    months = (new Date(interval.endDate).getFullYear() - new Date(interval.startDate).getFullYear()) * 12;
    months -= new Date(interval.startDate).getMonth();
    months += new Date(interval.endDate).getMonth();
    return months <= 0 ? 0 : months;
  }
}
