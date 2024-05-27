import { UtilService } from './util.service';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Usuario } from '../pages/interface/usuario';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  BASE_URL = environment.BASE_URL;

  constructor(private httpClient: HttpClient) {
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true // Inclui credenciais na requisição
  };

  create(usuario: Usuario): Observable<any> {
    const url = `${this.BASE_URL}/usuarios`
    return this.httpClient.post(url, usuario, this.httpOptions);
  }

  recuperaSenha(obj: any) {
    const url = `${this.BASE_URL}usuarios/recuperaSenha`
    this.httpClient.put(url, obj)
  }

}
