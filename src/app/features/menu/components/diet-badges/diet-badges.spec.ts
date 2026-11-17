import { TestBed } from '@angular/core/testing';
import { DietTag } from '../../../../core/models/menu.model';
import { DietBadges } from './diet-badges';

describe('DietBadges', () => {
  function render(tags: DietTag[]): HTMLElement {
    const fixture = TestBed.createComponent(DietBadges);
    fixture.componentRef.setInput('tags', tags);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('muestra las etiquetas con su nombre y en orden fijo', () => {
    const items = render(['picante', 'sin-tacc']).querySelectorAll('li');
    expect([...items].map((li) => li.textContent)).toEqual(['Sin TACC', 'Picante']);
  });

  it('no muestra nada si no hay etiquetas', () => {
    expect(render([]).querySelector('ul')).toBeNull();
  });
});
