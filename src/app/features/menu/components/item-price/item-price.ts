import { Component, computed, input } from '@angular/core';
import { MenuItem } from '../../../../core/models/menu.model';
import { hasPrices, isItemAvailable } from '../../../../core/utils/menu-item';
import { ArPricePipe } from '../../../../shared/pipes/ar-price.pipe';

@Component({
  selector: 'app-item-price',
  imports: [ArPricePipe],
  templateUrl: './item-price.html',
  styleUrl: './item-price.css',
})
export class ItemPrice {
  readonly item = input.required<MenuItem>();

  protected readonly isAvailable = computed(() => isItemAvailable(this.item()));
  protected readonly hasPrices = computed(() => hasPrices(this.item()));
}
