import { TestBed } from '@angular/core/testing';
import { Category } from '../../../../core/models/menu.model';
import { CategoryPager } from './category-pager';

const antipasti: Category = { id: 'antipasti', name: 'Antipasti', items: [] };
const dolci: Category = { id: 'dolci', name: 'Dolci', items: [] };

describe('CategoryPager', () => {
  function render(previous?: Category, next?: Category) {
    const fixture = TestBed.createComponent(CategoryPager);
    fixture.componentRef.setInput('previous', previous);
    fixture.componentRef.setInput('next', next);
    fixture.detectChanges();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  }

  it('muestra los nombres de la categoría anterior y siguiente', () => {
    const { element } = render(antipasti, dolci);
    const names = [...element.querySelectorAll('.pager__name')].map((n) => n.textContent);
    expect(names).toEqual(['Antipasti', 'Dolci']);
  });

  it('no muestra "anterior" en la primera categoría', () => {
    const { element } = render(undefined, dolci);
    expect(element.querySelectorAll('button').length).toBe(1);
    expect(element.textContent).toContain('Siguiente');
  });

  it('emite al tocar siguiente', () => {
    const { fixture, element } = render(antipasti, dolci);
    let emitted = false;
    fixture.componentInstance.nextSelected.subscribe(() => (emitted = true));

    element.querySelector<HTMLButtonElement>('.pager__link--next')!.click();

    expect(emitted).toBe(true);
  });
});
