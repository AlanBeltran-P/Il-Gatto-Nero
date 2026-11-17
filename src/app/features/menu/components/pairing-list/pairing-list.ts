import { Component, input, output } from '@angular/core';
import { MenuEntry } from '../../../../core/models/menu.model';

/** Sección "Va bien con" del modal: productos sugeridos para acompañar. */
@Component({
  selector: 'app-pairing-list',
  templateUrl: './pairing-list.html',
  styleUrl: './pairing-list.css',
})
export class PairingList {
  readonly pairings = input.required<MenuEntry[]>();
  readonly pairingSelected = output<MenuEntry>();
}
