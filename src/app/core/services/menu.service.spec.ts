import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MenuData } from '../models/menu.model';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(MenuService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('pide el menú al JSON de public/data', () => {
    const fakeMenu = { categories: [] } as unknown as MenuData;
    let received: MenuData | undefined;

    service.getMenu().subscribe((menu) => (received = menu));
    httpTesting.expectOne('data/menu.json').flush(fakeMenu);

    expect(received).toEqual(fakeMenu);
  });
});
