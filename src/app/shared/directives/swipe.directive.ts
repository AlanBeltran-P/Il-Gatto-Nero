import { Directive, output } from '@angular/core';

export type SwipeDirection = 'left' | 'right';

interface Point {
  x: number;
  y: number;
}

/** Distancia horizontal mínima para considerar que fue un deslizamiento. */
const MIN_SWIPE_PX = 60;
/** El gesto tiene que ser claramente más horizontal que vertical (para no confundirlo con scroll). */
const HORIZONTAL_RATIO = 1.5;

export function detectSwipe(start: Point, end: Point): SwipeDirection | null {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const isLongEnough = Math.abs(dx) >= MIN_SWIPE_PX;
  const isHorizontal = Math.abs(dx) >= Math.abs(dy) * HORIZONTAL_RATIO;

  if (!isLongEnough || !isHorizontal) {
    return null;
  }
  return dx < 0 ? 'left' : 'right';
}

/** Emite swipeLeft / swipeRight cuando el usuario desliza el dedo horizontalmente. */
@Directive({
  selector: '[appSwipe]',
  host: {
    '(touchstart)': 'onTouchStart($event)',
    '(touchend)': 'onTouchEnd($event)',
  },
})
export class SwipeDirective {
  readonly swipeLeft = output<void>();
  readonly swipeRight = output<void>();

  private start: Point | null = null;

  protected onTouchStart(event: TouchEvent): void {
    const touch = event.touches[0];
    this.start = { x: touch.clientX, y: touch.clientY };
  }

  protected onTouchEnd(event: TouchEvent): void {
    if (!this.start) {
      return;
    }
    const touch = event.changedTouches[0];
    const direction = detectSwipe(this.start, { x: touch.clientX, y: touch.clientY });
    this.start = null;

    if (direction === 'left') {
      this.swipeLeft.emit();
    } else if (direction === 'right') {
      this.swipeRight.emit();
    }
  }
}
