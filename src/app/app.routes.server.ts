import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // El menú se genera como HTML en el build: abre al instante y ya trae la carta adentro.
  { path: '', renderMode: RenderMode.Prerender },
  // El QR se dibuja en un canvas y necesita la URL real del sitio: solo en el navegador.
  { path: 'qr', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Client },
];
