import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RevealDirective } from './reveal.directive';

@Component({
  imports: [RevealDirective],
  template: `<p appReveal>Hola</p>`,
})
class HostComponent {}

describe('RevealDirective', () => {
  it('agrega la clase reveal al elemento', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const paragraph = (fixture.nativeElement as HTMLElement).querySelector('p');
    expect(paragraph?.classList).toContain('reveal');
  });

  it('muestra el elemento si el navegador no soporta IntersectionObserver', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const paragraph = (fixture.nativeElement as HTMLElement).querySelector('p');
    expect(paragraph?.classList).toContain('is-visible');
  });
});
