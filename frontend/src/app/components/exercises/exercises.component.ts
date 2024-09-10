import {Component, OnInit, ViewChild} from '@angular/core';
import {Exercise} from "../../model/exercise/exercise";
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";
import {TranslateModule} from "@ngx-translate/core";
import {DialogsHandlerService} from "../../services/dialogs-handler/dialogs-handler.service";
import {combineLatest, filter, mergeMap, Observable, take, takeUntil} from "rxjs";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {Urls} from "../../model/urls";
import {ExerciseHelperService} from "../../services/exercise-helper/exercise-helper.service";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTabChangeEvent, MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {PageHeaderLayoutComponent} from "../layouts/page-header-layout/page-header-layout.component";
import {Unsubscribe} from "../unsubscribe/unsubscribe";
import {ExerciseItemComponent} from "../exercise-item/exercise-item.component";
import {isNil} from "lodash";
import {ExerciseService} from "../../services/rest/exercise/exercise.service";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatExpansionModule,
    MatButton,
    MatMiniFabButton,
    MatTooltipModule,
    MatIcon,
    MatInput,
    PageHeaderLayoutComponent,
    ExerciseItemComponent,
  ]
})
export class ExercisesComponent extends Unsubscribe implements OnInit {

  protected exercises: Exercise[] = [];

  protected exerciseCategories = [];

  protected exerciseTypes = [];

  readonly IMAGE_BASE_URL = Urls.IMAGE_BASE_URL;

  protected filteredExercises: Observable<Exercise[]>;

  protected searchExerciseFormControl = new FormControl();

  protected exercisesByCategory: Exercise[] = [];

  @ViewChild("exerciseTabs", { static: false }) exerciseTabs: MatTabGroup;

  constructor(private readonly exerciseService: ExerciseService,
              private readonly snackBarService: SnackBarService,
              protected readonly exerciseHelper: ExerciseHelperService,
              private readonly dialogsHandler: DialogsHandlerService) {
    super();
  }

  public ngOnInit(): void {
    // get CATEGORIES and TYPES
    combineLatest([
      this.exerciseService.getAllCategories(),
      this.exerciseService.getAllTypes()
    ])
      .pipe(
        take(1),
      )
      .subscribe({
        next: ([categories, types]) => {
          this.exerciseCategories = categories;
          this.exerciseTypes = types;
        },
        error: err => this.snackBarService.showErrorSnackBar(err),
      });

    // observable of searching
    this.filteredExercises = this.searchExerciseFormControl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.searchExercises(state) : this.exercises.slice()),
        takeUntil(this.unSubscribe),
      );
  }

  private searchExercises(value: string): Exercise[] {
    return this.exercises.filter((s) => new RegExp(value, 'gi').test(s.name));
  }

  protected createExercise() {
    this.dialogsHandler.openCreateExerciseDialog().afterClosed()
      .pipe(
        filter(result => !isNil(result)),
        mergeMap(result => this.exerciseService.createExercise(result.exercise, result.imageFile)),
        take(1)
      )
      .subscribe({
        next: (exercise) => {
          this.loadExercisesByCategory(exercise.category);
          this.snackBarService.showSuccessSnackBar('ALERT.successfully-saved');
        },
        error: err => this.snackBarService.showErrorSnackBar(err),
      });
  }

  protected tabChange(matTabChangeEvent: MatTabChangeEvent) {
    this.loadExercisesByCategory(matTabChangeEvent.tab.textLabel);
  }

  protected exerciseEdited(category: string): void {
    this.loadExercisesByCategory(category);
  }

  private loadExercisesByCategory(category: string): void {
    this.exerciseService.getAllExercisesByCategory(category)
      .pipe(
        take(1),
      )
      .subscribe({
        next: exercises => {
          this.exercisesByCategory = exercises
          this.goToTab(category)
        },
        error: err => this.snackBarService.showErrorSnackBar(err),
      })
  }

  // Define a method to map the label to the tab index and switch tabs
  private goToTab(label: string): void {
    const tabLabels = this.exerciseTabs._tabs.toArray().map(tab => tab.textLabel);
    const tabIndex = tabLabels.indexOf(label);

    if (tabIndex !== -1) {
      this.exerciseTabs.selectedIndex = tabIndex;
    } else {
      console.error(`Tab with label '${label}' not found!`);
    }
  }
}
