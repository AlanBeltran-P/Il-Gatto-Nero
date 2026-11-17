import { DOCUMENT } from '@angular/common';
import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { SITE_CONFIG } from '../../core/config/site.config';
import { isLocalUrl, resolveMenuUrl, toDisplayUrl } from '../../core/utils/menu-url';
import { ThinFrame } from '../../shared/components/thin-frame/thin-frame';

/** Tamaño en píxeles del QR generado: grande para que se imprima nítido. */
const QR_SIZE_PX = 1024;

@Component({
  selector: 'app-qr-page',
  imports: [QRCodeComponent, RouterLink, ThinFrame],
  templateUrl: './qr-page.html',
  styleUrl: './qr-page.css',
  /*
   * Sin encapsulación para poder darle tamaño al <canvas> que genera la librería del QR.
   * Todas las clases empiezan con "qr-" para no chocar con el resto del sitio.
   */
  encapsulation: ViewEncapsulation.None,
})
export class QrPage {
  private readonly document = inject(DOCUMENT);

  protected readonly logoUrl = SITE_CONFIG.logoUrl;
  protected readonly tagline = SITE_CONFIG.tagline;
  protected readonly qrSize = QR_SIZE_PX;
  protected readonly menuUrl = resolveMenuUrl(SITE_CONFIG.publicUrl, this.document.location.origin);
  protected readonly displayUrl = toDisplayUrl(this.menuUrl);
  protected readonly isLocal = isLocalUrl(this.menuUrl);

  /** Imagen PNG del QR para el botón de descarga (la emite la librería al generarlo). */
  protected readonly downloadUrl = signal<SafeUrl | null>(null);

  protected print(): void {
    this.document.defaultView?.print();
  }
}
