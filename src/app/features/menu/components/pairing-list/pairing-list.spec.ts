import { TestBed } from '@angular/core/testing';
import { MenuEntry } from '../../../../core/models/menu.model';
import { PairingList } from './pairing-list';

const pairings: MenuEntry[] = [
  { item: { id: 'nebbiolo', name: 'Nebbiolo', prices: [] }, categoryName: 'Tintos' },
  { item: { id: 'negroni', name: 'Negroni', prices: [] }, categoryName: 'Cocktails' },
];

describe('PairingList', () => {
  function render() {
    const fixture = TestBed.createComponent(PairingList);
    fixture.componentRef.setInput('pairings', pairings);
    fixture.detectChanges();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  }

  it('muestra cada sugerencia con su categoría', () => {
    const { element } = render();
    const buttons = element.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[1].textContent).toContain('Negroni');
    expect(buttons[1].textContent).toContain('Cocktails');
  });

  it('emite la sugerencia tocada', () => {
    const { fixture, element } = render();
    let selectedId = '';
    fixture.componentInstance.pairingSelected.subscribe((entry) => (selectedId = entry.item.id));

    element.querySelectorAll('button')[0].click();

    expect(selectedId).toBe('nebbiolo');
  });
});
