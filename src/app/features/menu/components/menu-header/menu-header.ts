import { Component, input } from '@angular/core';
import { SITE_CONFIG } from '../../../../core/config/site.config';
import { ThinFrame } from '../../../../shared/components/thin-frame/thin-frame';

@Component({
  selector: 'app-menu-header',
  imports: [ThinFrame],
  templateUrl: './menu-header.html',
  styleUrl: './menu-header.css',
})
export class MenuHeader {
  readonly name = input.required<string>();

  protected readonly logoUrl = SITE_CONFIG.logoUrl;
  protected readonly tagline = SITE_CONFIG.tagline;
  /** Letras de la bajada por separado, para animarlas una por una. */
  protected readonly taglineLetters = Array.from(SITE_CONFIG.tagline);
}
