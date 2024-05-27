import { MessageService } from 'primeng/api';
import { environment } from '../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Observable, firstValueFrom, map, of, switchMap } from 'rxjs';
import { Usuario } from '../pages/interface/usuario';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private localStorageService: LocalStorageService) {

  }

  getHeaderAndAuth(): Observable<HttpHeaders> {
    return this.localStorageService.recuperarUsuarioId().pipe(
      switchMap((usuarioId) => {
        return this.localStorageService.recuperarUsuario().pipe(
          switchMap((res: Usuario) => {
            const username = res.login;
            const password = res.password;
            const basicAuthHeader = 'Basic ' + btoa(username + ':' + password);
            const userId = usuarioId ? usuarioId.toString() : '';
            return of(new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': basicAuthHeader,
              'User': userId
            }));
          })
        );
      })
    );
  }
}