import { TestBed } from '@angular/core/testing';
import { Category } from '../../../../core/models/menu.model';
import { CategorySection } from './category-section';

const antipasti: Category = {
  id: 'antipasti',
  name: 'Antipasti',
  note: 'Ingredientes de estación.',
  items: [
    { id: 'carpaccio', name: 'Carpaccio', prices: [{ amount: 32000 }] },
    { id: 'polpette', name: 'Polpette al sugo', prices: [{ amount: 35000 }] },
  ],
  extras: [{ name: 'Adicional focaccia', amount: 4000 }],
};

describe('CategorySection', () => {
  function render(): HTMLElement {
    const fixture = TestBed.createComponent(CategorySection);
    fixture.componentRef.setInput('category', antipasti);
    fixture.componentRef.setInput('position', 1);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('usa el id de la categoría como ancla de la sección', () => {
    expect(render().querySelector('section')?.id).toBe('antipasti');
  });

  it('muestra número, título y nota', () => {
    const element = render();
    expect(element.querySelector('.category__position')?.textContent).toBe('01');
    expect(element.querySelector('h2')?.textContent).toBe('Antipasti');
    expect(element.querySelector('.category__note')?.textContent).toBe('Ingredientes de estación.');
  });

  it('muestra todos los items y los adicionales', () => {
    const element = render();
    expect(element.querySelectorAll('app-menu-item').length).toBe(2);
    expect(element.querySelector('.category__extras')?.textContent).toContain('Adicional focaccia');
  });

  it('reenvía el item clickeado', () => {
    const fixture = TestBed.createComponent(CategorySection);
    fixture.componentRef.setInput('category', antipasti);
    fixture.componentRef.setInput('position', 1);
    fixture.detectChanges();
    let selectedId = '';
    fixture.componentInstance.itemSelected.subscribe((item) => (selectedId = item.id));

    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('.item')[1].click();

    expect(selectedId).toBe('polpette');
  });
});
