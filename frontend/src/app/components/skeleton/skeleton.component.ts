import {Component} from '@angular/core';

@Component({
  selector: 'app-skeleton',
  template: `<div class="h-full w-full animate-pulse rounded-xl bg-[rgba(127,127,127,0.18)]"></div>`,
  styles: [':host { display: block; }'],
})
export class SkeletonComponent {
}
