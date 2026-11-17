import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SITE_CONFIG } from '../config/site.config';
import { MenuData } from '../models/menu.model';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly http = inject(HttpClient);

  getMenu(): Observable<MenuData> {
    return this.http.get<MenuData>(SITE_CONFIG.menuDataUrl);
  }
}
