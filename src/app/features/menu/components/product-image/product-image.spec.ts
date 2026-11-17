import { TestBed } from '@angular/core/testing';
import { ProductImage } from './product-image';

describe('ProductImage', () => {
  function render(inputs: { src?: string; name: string; decorative?: boolean }) {
    const fixture = TestBed.createComponent(ProductImage);
    fixture.componentRef.setInput('src', inputs.src);
    fixture.componentRef.setInput('name', inputs.name);
    fixture.componentRef.setInput('decorative', inputs.decorative ?? false);
    fixture.detectChanges();
    return fixture;
  }

  it('muestra la foto cuando hay src', () => {
    const element = render({ src: 'images/platos/carbonara.webp', name: 'Carbonara' })
      .nativeElement as HTMLElement;
    const photo = element.querySelector('img');
    expect(photo?.getAttribute('src')).toBe('images/platos/carbonara.webp');
    expect(photo?.getAttribute('alt')).toBe('Carbonara');
  });

  it('muestra el placeholder con la inicial cuando no hay foto', () => {
    const element = render({ name: 'margherita' }).nativeElement as HTMLElement;
    expect(element.querySelector('img')).toBeNull();
    expect(element.querySelector('.product-image__initial')?.textContent).toBe('M');
  });

  it('muestra el placeholder si la foto falla al cargar', () => {
    const fixture = render({ src: 'images/no-existe.webp', name: 'Carbonara' });
    const element = fixture.nativeElement as HTMLElement;

    element.querySelector('img')?.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(element.querySelector('img')).toBeNull();
    expect(element.querySelector('.product-image__placeholder')).not.toBeNull();
  });

  it('usa alt vacío cuando es decorativa', () => {
    const element = render({ src: 'images/x.webp', name: 'Carbonara', decorative: true })
      .nativeElement as HTMLElement;
    expect(element.querySelector('img')?.getAttribute('alt')).toBe('');
  });
});
