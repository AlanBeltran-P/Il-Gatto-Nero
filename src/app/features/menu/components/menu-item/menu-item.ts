import { Component, computed, input, output } from '@angular/core';
import { MenuItem as MenuItemData } from '../../../../core/models/menu.model';
import { isItemAvailable } from '../../../../core/utils/menu-item';
import { DietBadges } from '../diet-badges/diet-badges';
import { ItemPrice } from '../item-price/item-price';
import { ProductImage } from '../product-image/product-image';

@Component({
  selector: 'app-menu-item',
  imports: [ItemPrice, ProductImage, DietBadges],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.css',
})
export class MenuItem {
  readonly item = input.required<MenuItemData>();
  readonly selected = output<MenuItemData>();

  protected readonly isAvailable = computed(() => isItemAvailable(this.item()));
  protected readonly variantsText = computed(() => (this.item().variants ?? []).join(' · '));
}
