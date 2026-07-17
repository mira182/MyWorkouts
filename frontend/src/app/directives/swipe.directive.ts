import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({selector: '[appSwipe]'})
export class SwipeDirective {

  @Input() swipeThreshold = 60;

  @Output() swipeLeft = new EventEmitter<void>();
  @Output() swipeRight = new EventEmitter<void>();

  private startX = 0;
  private startY = 0;
  private tracking = false;

  @HostListener('touchstart', ['$event'])
  protected onTouchStart(event: TouchEvent): void {
    this.tracking = event.touches.length === 1;
    this.startX = event.changedTouches[0].clientX;
    this.startY = event.changedTouches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  protected onTouchEnd(event: TouchEvent): void {
    if (!this.tracking) {
      return;
    }
    this.tracking = false;

    const deltaX = event.changedTouches[0].clientX - this.startX;
    const deltaY = event.changedTouches[0].clientY - this.startY;

    if (Math.abs(deltaX) > this.swipeThreshold && Math.abs(deltaX) > 1.5 * Math.abs(deltaY)) {
      (deltaX < 0 ? this.swipeLeft : this.swipeRight).emit();
    }
  }
}
