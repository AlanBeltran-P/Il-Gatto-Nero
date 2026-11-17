import { TestBed } from '@angular/core/testing';
import { Category } from '../../../../core/models/menu.model';
import { CategoryNav } from './category-nav';

const categories: Category[] = [
  { id: 'antipasti', name: 'Antipasti', items: [] },
  { id: 'pizze', name: 'Le Nostre Pizze', items: [] },
];

describe('CategoryNav', () => {
  function render(activeId = '') {
    const fixture = TestBed.createComponent(CategoryNav);
    fixture.componentRef.setInput('categories', categories);
    fixture.componentRef.setInput('activeId', activeId);
    fixture.detectChanges();
    return fixture;
  }

  it('muestra un botón por categoría', () => {
    const buttons = (render().nativeElement as HTMLElement).querySelectorAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[1].textContent?.trim()).toBe('Le Nostre Pizze');
  });

  it('marca la categoría activa', () => {
    const active = (render('pizze').nativeElement as HTMLElement).querySelector('.is-active');
    expect(active?.getAttribute('data-id')).toBe('pizze');
    expect(active?.getAttribute('aria-selected')).toBe('true');
  });

  it('emite el id al hacer click', () => {
    const fixture = render();
    let selected = '';
    fixture.componentInstance.categorySelected.subscribe((id) => (selected = id));

    (fixture.nativeElement as HTMLElement).querySelectorAll('button')[0].click();

    expect(selected).toBe('antipasti');
  });
});
