import { MenuItem } from '../models/menu.model';

export function isItemAvailable(item: MenuItem): boolean {
  return item.available !== false;
}

export function hasPrices(item: MenuItem): boolean {
  return item.prices.length > 0;
}
