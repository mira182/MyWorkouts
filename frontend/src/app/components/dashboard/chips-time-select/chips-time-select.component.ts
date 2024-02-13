import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateTimeService} from "../../../services/date-time/date-time.service";
import {MatChipOption, MatChipsModule} from "@angular/material/chips";
import {Interval} from "../../../model/time/interval";
import moment, {Moment} from "moment";
import {CommonModule} from "@angular/common";

export class MonthChip {
  id: number;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-chips-time-select',
  templateUrl: './chips-time-select.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatChipOption,
  ]
})
export class ChipsTimeSelectComponent implements OnInit {

  protected chips: MonthChip[] = [
    {
      id: 1,
      name: "1 month",
      selected: true
    },
    {
      id: 2,
      name: "3 months",
      selected: false
    },
    {
      id: 3,
      name: "6 months",
      selected: false
    },
    {
      id: 4,
      name: "1 year",
      selected: false
    },
    {
      id: 5,
      name: "2 years",
      selected: false
    }
  ];

  @Input()
  public interval: Interval;

  @Output()
  public chipSelected: EventEmitter<Interval> = new EventEmitter<Interval>();

  constructor() { }

  ngOnInit(): void {
    if (this.interval) {
      const selectedChip = this.intervalToChip(this.interval)
      this.selectChip(selectedChip)
    }
  }

  private intervalToChip(interval: Interval): MonthChip {
    const numberOfMonths = moment(interval.endDate).diff(interval.startDate, 'months', true);
    switch (numberOfMonths) {
      case 0:
      case 1:
        return this.chips[0]
      case 3:
        return this.chips[1]
      case 6:
        return this.chips[2]
      case 12:
        return this.chips[3]
      case 24:
        return this.chips[4]
      default:
        return this.chips[0];
    }
  }

  protected selectChip(chip: MonthChip) {
    this.chips.forEach(chip => chip.selected = false);
    chip.selected = true;
    let selectedInterval;
    const firstAndLastDayOfMonth = DateTimeService.getFirstAndLastDayOfMonth(new Date());
    const firstDayOfMonth: Moment = moment().startOf('month');
    const lastDayOfMonth: Moment = moment().endOf('month');
    switch (chip.id) {
      case 1: // 1 month
        selectedInterval = { startDate: firstDayOfMonth, endDate:  lastDayOfMonth };
        break;
      case 2: // 3 months
        selectedInterval = { startDate: firstDayOfMonth.subtract(3, 'months'), endDate: lastDayOfMonth };
        break;
      case 3: // 6 months
        selectedInterval = { startDate: firstDayOfMonth.subtract(6, 'months'), endDate: lastDayOfMonth };
        break;
      case 4: // 1 year
        selectedInterval = { startDate: firstDayOfMonth.subtract(12, 'months'), endDate: lastDayOfMonth };
        break;
      case 5: // 2 years
        selectedInterval = { startDate: firstDayOfMonth.subtract(24, 'months'), endDate: lastDayOfMonth };
        break;
    }
    this.chipSelected.emit(selectedInterval);
  }

}
