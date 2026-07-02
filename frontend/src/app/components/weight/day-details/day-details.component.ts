import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MeasurementRow} from "../measurements-table/measurements-table.component";

@Component({
  selector: 'app-day-details',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './day-details.component.html',
  styleUrl: './day-details.component.scss'
})
export class DayDetailsComponent {

  @Input({required: true}) numericColumns: string[] = [];
  @Input() units: Record<string, string> = {};

  protected dayRows: MeasurementRow[] = [];

  private _date: Date | null = null;
  private _data: MeasurementRow[] = [];

  @Input()
  set date(value: Date | null) {
    this._date = value;
    this.refresh();
  }

  get date(): Date | null {
    return this._date;
  }

  @Input()
  set data(rows: MeasurementRow[]) {
    this._data = rows ?? [];
    this.refresh();
  }

  private refresh(): void {
    if (!this._date) {
      this.dayRows = [];
      return;
    }
    const selected = DayDetailsComponent.dayKey(this._date);
    this.dayRows = this._data.filter(row => DayDetailsComponent.dayKey(new Date(row.date)) === selected);
  }

  private static dayKey(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }
}
