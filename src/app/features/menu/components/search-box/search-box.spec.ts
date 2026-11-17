import { TestBed } from '@angular/core/testing';
import { SearchBox } from './search-box';

describe('SearchBox', () => {
  function render() {
    const fixture = TestBed.createComponent(SearchBox);
    fixture.detectChanges();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  }

  it('actualiza la búsqueda al escribir', () => {
    const { fixture, element } = render();
    const input = element.querySelector('input')!;

    input.value = 'carbonara';
    input.dispatchEvent(new Event('input'));

    expect(fixture.componentInstance.query()).toBe('carbonara');
  });

  it('muestra el botón de borrar solo cuando hay texto', () => {
    const { fixture, element } = render();
    expect(element.querySelector('.search__clear')).toBeNull();

    fixture.componentInstance.query.set('vino');
    fixture.detectChanges();

    expect(element.querySelector('.search__clear')).not.toBeNull();
  });

  it('borra la búsqueda con el botón', () => {
    const { fixture, element } = render();
    fixture.componentInstance.query.set('vino');
    fixture.detectChanges();

    element.querySelector<HTMLButtonElement>('.search__clear')!.click();

    expect(fixture.componentInstance.query()).toBe('');
  });
});
