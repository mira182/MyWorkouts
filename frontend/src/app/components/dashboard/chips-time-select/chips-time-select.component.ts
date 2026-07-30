import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatChipOption, MatChipsModule} from "@angular/material/chips";
import {Interval} from "../../../model/time/interval";
import moment, {Moment} from "moment";


export class MonthChip {
  id: number;
  name: string;
  selected: boolean;
}

@Component({
    selector: 'app-chips-time-select',
    templateUrl: './chips-time-select.component.html',
    imports: [
    MatChipsModule,
    MatChipOption
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
    },
    {
      id: 6,
      name: "All",
      selected: false
    }
  ];

  private static allTimeStart(): Moment {
    return moment('1970-01-01');
  }

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
    const numberOfMonths = Math.round(moment(interval.endDate).diff(interval.startDate, 'months', true));
    if (numberOfMonths <= 1) return this.chips[0];   // 1 month
    if (numberOfMonths <= 4) return this.chips[1];   // 3 months
    if (numberOfMonths <= 7) return this.chips[2];   // 6 months
    if (numberOfMonths <= 13) return this.chips[3];  // 1 year
    if (numberOfMonths <= 25) return this.chips[4];  // 2 years
    return this.chips[5];                            // All
  }

  protected selectChip(chip: MonthChip) {
    this.chips.forEach(chip => chip.selected = false);
    chip.selected = true;
    let selectedInterval;
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
      case 6: // all
        selectedInterval = { startDate: ChipsTimeSelectComponent.allTimeStart(), endDate: lastDayOfMonth };
        break;
    }
    this.chipSelected.emit(selectedInterval);
  }

}
