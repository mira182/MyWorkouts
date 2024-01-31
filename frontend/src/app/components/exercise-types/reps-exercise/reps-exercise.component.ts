import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatCard} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {InputNumberComponent} from "../input-number/input-number.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatTooltip} from "@angular/material/tooltip";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-reps-exercise',
  templateUrl: './reps-exercise.component.html',
  styleUrls: ['./reps-exercise.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    CommonModule,
    ReactiveFormsModule,
    MatIcon,
    InputNumberComponent,
    TranslateModule,
    MatTooltip,
    MatButton,
  ]
})
export class RepsExerciseComponent implements OnInit {

  protected repsForm: FormGroup;

  @Output()
  public update: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  protected initialReps: number = 0;

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.repsForm = this.formBuilder.group({
      sets: this.formBuilder.array([]),
    });
    this.addSet();
    this.update.emit(this.repsForm);
  }

  protected get sets(): FormArray {
    return this.repsForm.get('sets') as FormArray;
  }

  protected newSet(): FormGroup {
    return this.formBuilder.group({
      reps: new FormControl(0)
    });
  }

  protected addSet() {
    if (this.sets.length > 0) {
      this.initialReps = this.sets.at(this.sets.length - 1).value.reps;
    }
    this.sets.push(this.newSet());
    this.update.emit(this.repsForm);
  }

  protected removeSet(i : number) {
    this.sets.removeAt(i);
    this.update.emit(this.repsForm);
  }

  protected repsUpdated(repsValue: number, index: number) {
    this.sets.at(index).patchValue({reps: repsValue});
    this.update.emit(this.repsForm);
  }
}
