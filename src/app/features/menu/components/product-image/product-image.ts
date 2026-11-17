import { Component, booleanAttribute, computed, input, linkedSignal } from '@angular/core';

export type ProductImageSize = 'thumb' | 'large';

/**
 * Foto del plato. Si no hay foto (o no carga) muestra un placeholder
 * en blanco y negro con la inicial del plato.
 */
@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.html',
  styleUrl: './product-image.css',
  host: {
    '[class.product-image--large]': "size() === 'large'",
  },
})
export class ProductImage {
  readonly src = input<string | undefined>();
  readonly name = input.required<string>();
  readonly size = input<ProductImageSize>('thumb');
  /** Si es true, la imagen es decorativa (el nombre ya se lee al lado). */
  readonly decorative = input(false, { transform: booleanAttribute });

  /** Se reinician solos cuando cambia la foto. */
  protected readonly hasFailed = linkedSignal({ source: this.src, computation: () => false });
  protected readonly isLoaded = linkedSignal({ source: this.src, computation: () => false });

  protected readonly showPhoto = computed(() => Boolean(this.src()) && !this.hasFailed());
  protected readonly altText = computed(() => (this.decorative() ? '' : this.name()));
  protected readonly initial = computed(() => this.name().trim().charAt(0).toUpperCase());
}
