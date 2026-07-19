import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {TranslateModule} from '@ngx-translate/core';
import {take} from 'rxjs';
import {ExerciseService} from '../../../services/rest/exercise/exercise.service';
import {ExerciseRecord} from '../../../model/exercise/exercise-record';
import {Exercise} from '../../../model/exercise/exercise';
import {DialogsHandlerService} from '../../../services/dialogs-handler/dialogs-handler.service';
import {SnackBarService} from '../../../services/snack-bar/snack-bar.service';
import {AppDatePipe} from '../../../pipes/app-date.pipe';
import {SkeletonComponent} from '../../skeleton/skeleton.component';

@Component({
  selector: 'app-dashboard-records',
  imports: [
    DecimalPipe,
    MatTableModule,
    MatSortModule,
    TranslateModule,
    AppDatePipe,
    SkeletonComponent,
  ],
  templateUrl: './dashboard-records.component.html',
})
export class DashboardRecordsComponent implements OnInit {

  protected readonly displayedColumns = ['exerciseName', 'maxWeight', 'estimatedOneRepMax', 'maxReps', 'maxWeightDate'];

  protected readonly dataSource = new MatTableDataSource<ExerciseRecord>([]);

  protected loading = signal(true);

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor(private readonly exerciseService: ExerciseService,
              private readonly dialogsHandler: DialogsHandlerService,
              private readonly snackBarService: SnackBarService) {
  }

  public ngOnInit(): void {
    this.exerciseService.getExerciseRecords()
      .pipe(take(1))
      .subscribe({
        next: records => {
          this.dataSource.data = records;
          this.loading.set(false);
        },
        error: err => {
          this.loading.set(false);
          this.snackBarService.showErrorSnackBar(err);
        },
      });
  }

  protected openHistory(record: ExerciseRecord): void {
    this.dialogsHandler.openExerciseHistoryDialog({
      id: record.exerciseId,
      name: record.exerciseName,
      category: record.category,
    } as Exercise);
  }
}
