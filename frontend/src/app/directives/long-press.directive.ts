import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';

/**
 * Emits longPress after the host is held for `longPressDelay` ms without moving.
 *
 * The tap that follows the release is swallowed, so a long press never also
 * triggers the element's normal click action.
 */
@Directive({selector: '[appLongPress]'})
export class LongPressDirective {

  /** Hold duration (ms) before it counts as a long press. */
  @Input() longPressDelay = 500;

  @Output() longPress = new EventEmitter<void>();

  private timer?: ReturnType<typeof setTimeout>;
  private fired = false;
  private startX = 0;
  private startY = 0;

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  protected onPressStart(event: TouchEvent | MouseEvent): void {
    const point = LongPressDirective.pointOf(event);
    this.startX = point.x;
    this.startY = point.y;
    this.fired = false;

    this.timer = setTimeout(() => {
      this.fired = true;
      this.longPress.emit();
    }, this.longPressDelay);
  }

  @HostListener('touchmove', ['$event'])
  protected onTouchMove(event: TouchEvent): void {
    const point = LongPressDirective.pointOf(event);
    if (Math.abs(point.x - this.startX) > 10 || Math.abs(point.y - this.startY) > 10) {
      this.cancel();
    }
  }

  @HostListener('touchend')
  @HostListener('touchcancel')
  @HostListener('mouseup')
  @HostListener('mouseleave')
  protected onPressEnd(): void {
    this.cancel();
  }

  @HostListener('click', ['$event'])
  protected onClick(event: MouseEvent): void {
    if (this.fired) {
      // Don't let the long press double as a normal tap.
      event.preventDefault();
      event.stopPropagation();
      this.fired = false;
    }
  }

  @HostListener('contextmenu', ['$event'])
  protected onContextMenu(event: Event): void {
    // This element owns the long press, so the native menu (Android's "save image",
    // text selection callout, …) is never wanted here — suppress it unconditionally.
    // Android fires contextmenu at roughly the same moment as our timer, so making
    // this conditional on `fired` would let the menu through in a race.
    event.preventDefault();
  }

  private cancel(): void {
    clearTimeout(this.timer);
    this.timer = undefined;
  }

  private static pointOf(event: TouchEvent | MouseEvent): { x: number; y: number } {
    const touch = (event as TouchEvent).changedTouches?.[0];
    return touch
      ? {x: touch.clientX, y: touch.clientY}
      : {x: (event as MouseEvent).clientX, y: (event as MouseEvent).clientY};
  }
}
