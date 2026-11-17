export const SITE_CONFIG = {
  /**
   * URL pública del menú (la que se codifica en el QR), por ejemplo "https://ilgattonero.com.ar".
   * Si queda vacía se usa la dirección desde la que se abre la página.
   */
  publicUrl: '',
  /** Se usa en el header, que se muestra antes de que llegue el JSON del menú. */
  name: 'Il Gatto Nero',
  logoUrl: 'images/Logo.jpg',
  menuDataUrl: 'data/menu.json',
  tagline: 'Pizzeria · Cucina Italiana',
} as const;
