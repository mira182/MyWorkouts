import {Component, ElementRef, OnInit, signal, ViewChild} from '@angular/core';
import {Exercise} from "../../model/exercise/exercise";
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";
import {TranslateModule} from "@ngx-translate/core";
import {DialogsHandlerService} from "../../services/dialogs-handler/dialogs-handler.service";
import {combineLatest, filter, finalize, mergeMap, Observable, take, takeUntil} from "rxjs";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {Urls} from "../../model/urls";
import {ExerciseHelperService} from "../../services/exercise-helper/exercise-helper.service";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatTabChangeEvent, MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {PageHeaderLayoutComponent} from "../layouts/page-header-layout/page-header-layout.component";
import {Unsubscribe} from "../unsubscribe/unsubscribe";
import {ExerciseItemComponent} from "../exercise-item/exercise-item.component";
import {isNil} from "lodash";
import {ExerciseService} from "../../services/rest/exercise/exercise.service";
import {SkeletonComponent} from "../skeleton/skeleton.component";
import {EmptyStateComponent} from "../empty-state/empty-state.component";

@Component({
    selector: 'app-exercises',
    templateUrl: './exercises.component.html',
    styleUrls: ['./exercises.component.scss'],
    imports: [
        TranslateModule,
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatTabsModule,
        MatExpansionModule,
        MatMiniFabButton,
        MatIconButton,
        MatTooltipModule,
        MatIcon,
        MatInput,
        PageHeaderLayoutComponent,
        ExerciseItemComponent,
        SkeletonComponent,
        EmptyStateComponent,
    ]
})
export class ExercisesComponent extends Unsubscribe implements OnInit {

  protected exercises: Exercise[] = [];

  protected exerciseCategories = signal<string[]>([]);

  protected exerciseTypes = [];

  readonly IMAGE_BASE_URL = Urls.IMAGE_BASE_URL;

  protected filteredExercises: Observable<Exercise[]>;

  protected searchExerciseFormControl = new FormControl();

  protected exercisesByCategory = signal<Exercise[]>([]);

  // Set when an exercise is picked from search, so its panel flashes + scrolls into view.
  protected highlightedExerciseId = signal<number | null>(null);

  // Header search collapses to an icon; this drives the inline expand/collapse.
  protected searchOpen = signal(false);

  protected categoryLoading = signal(false);

  @ViewChild("exerciseTabs", { static: false }) exerciseTabs: MatTabGroup;

  @ViewChild("searchInput") searchInput: ElementRef<HTMLInputElement>;

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
          this.exerciseCategories.set(categories);
          this.exerciseTypes = types;
          // MatTabGroup's (selectedTabChange) doesn't fire for the initially-selected
          // tab, so load the first category's exercises up front.
          if (categories.length > 0) {
            this.loadExercisesByCategory(categories[0]);
          }
        },
        error: err => this.snackBarService.showErrorSnackBar(err),
      });

    // load ALL exercises to back the search autocomplete
    this.exerciseService.getAllExercises()
      .pipe(take(1))
      .subscribe({
        next: exercises => this.exercises = exercises,
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

  protected openSearch(): void {
    this.searchOpen.set(true);
    // Focus once the inline field has been revealed.
    setTimeout(() => this.searchInput?.nativeElement.focus());
  }

  protected closeSearch(): void {
    this.searchExerciseFormControl.setValue('');
    this.searchOpen.set(false);
  }

  // When a search result is picked, jump to that exercise's category tab.
  protected onExerciseSelected(event: MatAutocompleteSelectedEvent): void {
    const exercise = this.exercises.find(e => e.name === event.option.value);
    if (exercise) {
      this.highlightedExerciseId.set(exercise.id);
      this.loadExercisesByCategory(exercise.category);
    }
    this.closeSearch();
  }

  // Scroll to the highlighted exercise within the active tab (the same list is
  // rendered in every tab, so scope the lookup to the active tab body) and clear
  // the highlight afterwards so re-selecting the same item re-triggers the flash.
  private scrollToHighlighted(): void {
    const id = this.highlightedExerciseId();
    if (id == null) {
      return;
    }
    setTimeout(() => {
      const selector = `[data-exercise-id="${id}"]`;
      const active = document.querySelector('.mat-mdc-tab-body-active');
      const el = (active?.querySelector(selector)
        ?? Array.from(document.querySelectorAll(selector))
          .find(n => (n as HTMLElement).offsetParent !== null)) as HTMLElement | undefined;
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 400);
    setTimeout(() => this.highlightedExerciseId.set(null), 2400);
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
    this.categoryLoading.set(true);
    this.exerciseService.getAllExercisesByCategory(category)
      .pipe(
        finalize(() => this.categoryLoading.set(false)),
        take(1),
      )
      .subscribe({
        next: exercises => {
          this.exercisesByCategory.set(exercises)
          this.goToTab(category)
          this.scrollToHighlighted()
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
