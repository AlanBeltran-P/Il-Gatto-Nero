import { TestBed } from '@angular/core/testing';
import { MenuHeader } from './menu-header';

describe('MenuHeader', () => {
  function render() {
    const fixture = TestBed.createComponent(MenuHeader);
    fixture.componentRef.setInput('name', 'Il Gatto Nero');
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('muestra el logo con el nombre del local como texto alternativo', () => {
    const logo = render().querySelector('img');
    expect(logo?.getAttribute('src')).toBe('images/Logo.jpg');
    expect(logo?.getAttribute('alt')).toBe('Il Gatto Nero');
  });

  it('deja la bajada completa para lectores de pantalla', () => {
    const hidden = render().querySelector('.menu-header__tagline .visually-hidden');
    expect(hidden?.textContent).toBe('Pizzeria · Cucina Italiana');
  });

  it('separa la bajada en una letra por span para animarla', () => {
    const letters = render().querySelectorAll('.menu-header__letter');
    expect(letters.length).toBe('Pizzeria · Cucina Italiana'.length);
    expect(letters[0].textContent).toBe('P');
  });
});
