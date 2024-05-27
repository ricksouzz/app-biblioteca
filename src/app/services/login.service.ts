import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Usuario } from '../pages/interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  BASE_URL = environment.BASE_URL;

  constructor(private httpClient: HttpClient) {
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true // Inclui credenciais na requisição
  };

  login(usuario: Usuario): Observable<any> {
    const url = `${this.BASE_URL}/usuarios/login`
    return this.httpClient.post(url, usuario, this.httpOptions)
  }

  recuperaSenha(login: string): Observable<any>{
    const url = `${this.BASE_URL}/usuarios/recuperaSenha`
    return this.httpClient.post(url, login, this.httpOptions)
  }

  alteraSenha(usuario: Usuario): Observable<any>{
    const url = `${this.BASE_URL}/usuarios/alteraSenha`
    return this.httpClient.post(url, usuario, this.httpOptions)
  }
}
