import { TestBed } from '@angular/core/testing';
import { BackToTop } from './back-to-top';

describe('BackToTop', () => {
  function render(visible: boolean): HTMLButtonElement {
    const fixture = TestBed.createComponent(BackToTop);
    fixture.componentRef.setInput('visible', visible);
    fixture.detectChanges();
    return (fixture.nativeElement as HTMLElement).querySelector('button')!;
  }

  it('está oculto y fuera del foco cuando no es visible', () => {
    const button = render(false);
    expect(button.classList).not.toContain('is-visible');
    expect(button.getAttribute('tabindex')).toBe('-1');
  });

  it('se muestra cuando es visible', () => {
    expect(render(true).classList).toContain('is-visible');
  });

  it('sube al inicio de la página al hacer click', () => {
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    render(true).click();
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    scrollSpy.mockRestore();
  });
});
