import {Component, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";

@Component({
  template: '',
  standalone: true,
})
export class Unsubscribe implements OnDestroy {

  protected unSubscribe: Subject<void> = new Subject<void>();

    public ngOnDestroy(): void {
        this.unSubscribe.next();
    }

}
