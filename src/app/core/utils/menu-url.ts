/** URL que se codifica en el QR: la pública si está configurada, si no la actual. Siempre termina en "/". */
export function resolveMenuUrl(publicUrl: string, currentOrigin: string): string {
  const baseUrl = publicUrl.trim() || currentOrigin;
  return `${baseUrl.replace(/\/+$/, '')}/`;
}

/** Versión corta para mostrar impresa: sin "https://" ni la barra final. */
export function toDisplayUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/+$/, '');
}

/** true si la URL solo funciona en esta computadora (no sirve para imprimir en un QR). */
export function isLocalUrl(url: string): boolean {
  return /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?(\/|$)/.test(url);
}
