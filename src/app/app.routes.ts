import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Il Gatto Nero · Menú',
    loadComponent: () => import('./features/menu/menu-page').then((m) => m.MenuPage),
  },
  {
    path: 'qr',
    title: 'Il Gatto Nero · Código QR',
    loadComponent: () => import('./features/qr/qr-page').then((m) => m.QrPage),
  },
  { path: '**', redirectTo: '' },
];
