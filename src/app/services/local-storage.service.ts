import { Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { Usuario } from '../pages/interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private USER_KEY: string = '62033ce3-7a82-4d8c-9fd0-9e7b2e8c206b';
  private USER_ID_KEY: string = '93645ce3-7a82-4d8c-9fd0-9e7b2e8c206b'

  public guardarUsuario(usuario: any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      if (usuario === null || usuario === undefined) {
        observer.error("Valor de usuario é nulo")
      }
      const u = {
        login: usuario.login,
        password: usuario.password,
      }
      try {
        sessionStorage.setItem(this.USER_KEY, JSON.stringify(u));
        observer.next(u);
      } catch (e) {
        observer.error(`Usuário não recuperado ${e}`)
      }
      observer.complete();
    });
  }

  public recuperarUsuario(): Observable<Usuario> {
    return new Observable((observe: Observer<Usuario>) => {
      let user: any = sessionStorage.getItem(this.USER_KEY);
      if (user === null || user === undefined) {
        observe.error('Usuario não está logado');
      } else {
        const usuario = JSON.parse(user);
        const u: Usuario = {
          nome: usuario.nome,
          login: usuario.login,
          password: usuario.password,
          roles: usuario.role
        };
        observe.next(u);
      }
      observe.complete();
    });
  }

  public guardarUsuarioId(usuarioId:any){
    if (usuarioId === null || usuarioId === undefined) {
      throw Error('Usuario id não pode ser nulo');
    }
    sessionStorage.setItem(this.USER_ID_KEY, usuarioId);
  }

  public recuperarUsuarioId(){
    return of(sessionStorage.getItem(this.USER_ID_KEY));
  }

}
