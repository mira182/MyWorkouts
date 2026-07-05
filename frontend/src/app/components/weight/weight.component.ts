import {Component, OnInit} from "@angular/core";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {TanitaWeightComponent} from "./tanita-weight/tanita-weight.component";
import {WithingsWeightComponent} from "./withings-weight/withings-weight.component";

@Component({
    selector: 'app-weight',
    templateUrl: './weight.component.html',
    styleUrls: ['./weight.component.scss'],
    imports: [
        MatTabGroup,
        MatTab,
        TanitaWeightComponent,
        WithingsWeightComponent
    ]
})
export class WeightComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }
}
