import { TestBed } from '@angular/core/testing';
import { MenuEntry } from '../../../../core/models/menu.model';
import { SearchGroup } from '../../../../core/utils/menu-search';
import { SearchResults } from './search-results';

const groups: SearchGroup[] = [
  {
    category: { id: 'pizze', name: 'Le Nostre Pizze', items: [] },
    items: [
      { id: 'margherita', name: 'Margherita', prices: [] },
      { id: 'marinara', name: 'Marinara', prices: [] },
    ],
  },
  {
    category: { id: 'cocktails', name: 'Cocktails', items: [] },
    items: [{ id: 'margarita', name: 'Margarita', prices: [] }],
  },
];

describe('SearchResults', () => {
  function render(searchGroups: SearchGroup[]) {
    const fixture = TestBed.createComponent(SearchResults);
    fixture.componentRef.setInput('groups', searchGroups);
    fixture.componentRef.setInput('query', 'mar');
    fixture.detectChanges();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  }

  it('muestra la cantidad de resultados y los agrupa por categoría', () => {
    const { element } = render(groups);
    expect(element.querySelector('.results__summary')?.textContent).toContain('3 resultados');
    expect(element.querySelectorAll('.results__category').length).toBe(2);
    expect(element.querySelectorAll('app-menu-item').length).toBe(3);
  });

  it('muestra un mensaje cuando no hay resultados', () => {
    const { element } = render([]);
    expect(element.querySelector('.results__empty')?.textContent).toContain('Sin resultados');
  });

  it('emite el producto con el nombre de su categoría', () => {
    const { fixture, element } = render(groups);
    let selected: MenuEntry | undefined;
    fixture.componentInstance.itemSelected.subscribe((entry) => (selected = entry));

    element.querySelectorAll<HTMLButtonElement>('.item')[2].click();

    expect(selected?.item.id).toBe('margarita');
    expect(selected?.categoryName).toBe('Cocktails');
  });
});
