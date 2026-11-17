import { Pipe, PipeTransform } from '@angular/core';

const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

@Pipe({ name: 'arPrice' })
export class ArPricePipe implements PipeTransform {
  transform(amount: number): string {
    return priceFormatter.format(amount);
  }
}
