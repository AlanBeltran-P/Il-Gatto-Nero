import { Component, input, output } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SafeUrl } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { QrPage } from './qr-page';

/** Reemplazo del QR real: jsdom no tiene canvas. */
@Component({ selector: 'qrcode', template: '' })
class QrCodeStub {
  readonly qrdata = input('');
  readonly width = input(0);
  readonly margin = input(0);
  readonly errorCorrectionLevel = input('');
  readonly elementType = input('');
  readonly colorDark = input('');
  readonly colorLight = input('');
  readonly ariaLabel = input('');
  readonly qrCodeURL = output<SafeUrl>();
}

describe('QrPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    TestBed.overrideComponent(QrPage, {
      remove: { imports: [QRCodeComponent] },
      add: { imports: [QrCodeStub] },
    });
  });

  function render() {
    const fixture = TestBed.createComponent(QrPage);
    fixture.detectChanges();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  }

  it('genera el QR con la URL del menú', () => {
    const { fixture } = render();
    const qr = fixture.debugElement.query((node) => node.name === 'qrcode');
    expect((qr.componentInstance as QrCodeStub).qrdata()).toBe(`${location.origin}/`);
  });

  it('muestra el llamado a escanear y la URL corta', () => {
    const { element } = render();
    expect(element.querySelector('.qr-card__cta')?.textContent).toBe('Escaneá para ver la carta');
    expect(element.querySelector('.qr-card__url')?.textContent).toBe(location.host);
  });

  it('avisa cuando el QR apunta a localhost', () => {
    const { element } = render();
    expect(element.querySelector('.qr-page__warning')?.textContent).toContain(
      'solo funciona en esta computadora',
    );
  });

  it('muestra el botón de descarga cuando el QR está generado', () => {
    const { fixture, element } = render();
    expect(element.querySelector('a[download]')).toBeNull();

    const qr = fixture.debugElement.query((node) => node.name === 'qrcode');
    (qr.componentInstance as QrCodeStub).qrCodeURL.emit('blob:qr-png');
    fixture.detectChanges();

    expect(element.querySelector('a[download]')?.getAttribute('download')).toBe(
      'il-gatto-nero-qr.png',
    );
  });

  it('imprime al tocar el botón', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => undefined);
    const { element } = render();

    element.querySelector<HTMLButtonElement>('.qr-page__button--primary')!.click();

    expect(printSpy).toHaveBeenCalled();
    printSpy.mockRestore();
  });
});
