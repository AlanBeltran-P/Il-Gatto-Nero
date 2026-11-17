import { TestBed } from '@angular/core/testing';
import { MenuFooter } from './menu-footer';

describe('MenuFooter', () => {
  function render(): HTMLElement {
    const fixture = TestBed.createComponent(MenuFooter);
    fixture.componentRef.setInput('name', 'Il Gatto Nero');
    fixture.componentRef.setInput('promotions', [
      { id: 'efectivo-15', title: '15% off en efectivo', description: 'Abonando en efectivo.' },
    ]);
    fixture.componentRef.setInput('notes', ['Valor cubierto $3.500', 'Efectivo 15% off']);
    fixture.componentRef.setInput('allergyNotice', 'Trabajamos con ingredientes frescos.');
    fixture.componentRef.setInput('updatedAt', '2026-11-17');
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('muestra las promociones', () => {
    const element = render();
    expect(element.querySelector('.menu-footer__promo-title')?.textContent).toBe(
      '15% off en efectivo',
    );
    expect(element.textContent).toContain('Abonando en efectivo.');
  });

  it('no muestra el logo de la marca', () => {
    expect(render().querySelector('img')).toBeNull();
  });

  it('muestra las notas del local', () => {
    expect(render().querySelectorAll('.menu-footer__notes li').length).toBe(2);
  });

  it('muestra el aviso de alérgenos', () => {
    expect(render().textContent).toContain('Trabajamos con ingredientes frescos.');
  });

  it('muestra la fecha de actualización formateada', () => {
    expect(render().textContent).toContain('17 de noviembre de 2026');
  });
});
