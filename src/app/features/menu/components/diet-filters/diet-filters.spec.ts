import { TestBed } from '@angular/core/testing';
import { DietFilters } from './diet-filters';

describe('DietFilters', () => {
  function render() {
    const fixture = TestBed.createComponent(DietFilters);
    fixture.componentRef.setInput('tags', ['sin-tacc', 'vegetariano']);
    fixture.detectChanges();
    return { fixture, buttons: (fixture.nativeElement as HTMLElement).querySelectorAll('button') };
  }

  it('muestra un botón por etiqueta con su nombre', () => {
    const { buttons } = render();
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent?.trim()).toBe('Sin TACC');
  });

  it('activa y desactiva una etiqueta al tocarla', () => {
    const { fixture, buttons } = render();

    buttons[1].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selected()).toEqual(['vegetariano']);
    expect(buttons[1].getAttribute('aria-pressed')).toBe('true');

    buttons[1].click();
    expect(fixture.componentInstance.selected()).toEqual([]);
  });
});
