import { Component } from '@angular/core';

/**
 * Marco de línea fina que se abre desde el centro.
 * Se posiciona absoluto sobre su contenedor (que debe tener position: relative).
 * El retardo de la animación se ajusta con la variable CSS --frame-delay.
 */
@Component({
  selector: 'app-thin-frame',
  template: '',
  styleUrl: './thin-frame.css',
  host: {
    'aria-hidden': 'true',
  },
})
export class ThinFrame {}
