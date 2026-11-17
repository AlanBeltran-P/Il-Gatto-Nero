import { TestBed } from '@angular/core/testing';
import { ThinFrame } from './thin-frame';

describe('ThinFrame', () => {
  it('es decorativo y no se lee en lectores de pantalla', () => {
    const fixture = TestBed.createComponent(ThinFrame);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).getAttribute('aria-hidden')).toBe('true');
  });

  it('no tiene contenido: es solo la línea del borde', () => {
    const fixture = TestBed.createComponent(ThinFrame);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).children.length).toBe(0);
  });
});
