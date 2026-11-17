import {
  Component,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MenuEntry, MenuItem } from '../../../../core/models/menu.model';
import { isItemAvailable } from '../../../../core/utils/menu-item';
import { DietBadges } from '../diet-badges/diet-badges';
import { ItemPrice } from '../item-price/item-price';
import { PairingList } from '../pairing-list/pairing-list';
import { ProductImage } from '../product-image/product-image';

/** Tiene que coincidir con la duración de la animación de cierre en el CSS. */
export const CLOSE_ANIMATION_MS = 400;

@Component({
  selector: 'app-product-modal',
  imports: [ItemPrice, ProductImage, DietBadges, PairingList],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.css',
})
export class ProductModal {
  readonly item = input.required<MenuItem>();
  readonly categoryName = input('');
  readonly pairings = input<MenuEntry[]>([]);
  readonly closed = output<void>();
  readonly pairingSelected = output<MenuEntry>();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');

  /** Se activa dos frames después de abrir: dispara la transición de entrada. */
  protected readonly isEntered = signal(false);
  protected readonly isClosing = signal(false);
  protected readonly isAvailable = computed(() => isItemAvailable(this.item()));

  constructor() {
    afterNextRender(() => this.open());
    // Al pasar a otro producto (maridaje) el panel vuelve arriba
    effect(() => {
      this.item();
      this.panel()?.nativeElement.scrollTo?.({ top: 0 });
    });
  }

  /**
   * Primero se abre el dialog con el panel abajo. Esperamos dos frames para que
   * el celular termine el primer render (que es pesado) antes de animar;
   * si no, la animación arranca "a mitad de camino" y se ve brusca.
   */
  private open(): void {
    this.dialog().nativeElement.showModal?.();
    requestAnimationFrame(() => requestAnimationFrame(() => this.isEntered.set(true)));
  }

  /** Reproduce la animación de salida y después avisa que se cerró. */
  protected requestClose(): void {
    if (this.isClosing()) {
      return;
    }
    this.isClosing.set(true);
    setTimeout(() => {
      this.dialog().nativeElement.close?.();
      this.closed.emit();
    }, CLOSE_ANIMATION_MS);
  }

  /** Tecla Escape: cancelamos el cierre nativo para animarlo. */
  protected onCancel(event: Event): void {
    event.preventDefault();
    this.requestClose();
  }

  /** Click fuera del panel (sobre el fondo oscuro). */
  protected onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) {
      this.requestClose();
    }
  }
}
