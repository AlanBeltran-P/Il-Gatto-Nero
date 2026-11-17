import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SwipeDirective, detectSwipe } from './swipe.directive';

describe('detectSwipe', () => {
  it('detecta deslizamiento a la izquierda', () => {
    expect(detectSwipe({ x: 300, y: 100 }, { x: 150, y: 110 })).toBe('left');
  });

  it('detecta deslizamiento a la derecha', () => {
    expect(detectSwipe({ x: 50, y: 100 }, { x: 200, y: 90 })).toBe('right');
  });

  it('ignora movimientos cortos', () => {
    expect(detectSwipe({ x: 100, y: 100 }, { x: 70, y: 100 })).toBeNull();
  });

  it('ignora gestos más verticales que horizontales (scroll)', () => {
    expect(detectSwipe({ x: 100, y: 100 }, { x: 180, y: 300 })).toBeNull();
  });
});

@Component({
  imports: [SwipeDirective],
  template: `<div appSwipe (swipeLeft)="lastSwipe = 'left'" (swipeRight)="lastSwipe = 'right'"></div>`,
})
class HostComponent {
  lastSwipe = '';
}

function touchEvent(type: string, x: number, y: number): Event {
  const event = new Event(type);
  const touch = { clientX: x, clientY: y };
  Object.assign(event, { touches: [touch], changedTouches: [touch] });
  return event;
}

describe('SwipeDirective', () => {
  it('emite swipeLeft al deslizar el dedo hacia la izquierda', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const element = (fixture.nativeElement as HTMLElement).querySelector('div')!;

    element.dispatchEvent(touchEvent('touchstart', 300, 100));
    element.dispatchEvent(touchEvent('touchend', 120, 105));

    expect(fixture.componentInstance.lastSwipe).toBe('left');
  });
});
