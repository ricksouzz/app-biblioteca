import { LocalStorageService } from './../../services/local-storage.service';
import { Usuario } from './../interface/usuario';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule
  ], providers: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: Usuario = {
    login: '', password: '',
    nome: '',
    roles: []
  };

  constructor(private router: Router,
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService
  ) {
  }

  login() {
    this.loginService.login(this.usuario).pipe(
      switchMap((res: Usuario) => {
        this.toastr.success('Login realizado com sucesso.');
        this.localStorageService.guardarUsuarioId(res.id)
        return this.localStorageService.guardarUsuario(this.usuario).pipe(
          map(() => res)
        );
      }),
      tap(() => {
        this.router.navigate(['/cadastro-livro']);
      }),
      catchError((err) => {
        this.toastr.error(err.error);
        return of(null);
      })
    ).subscribe();
  }


  register() {
    this.router.navigate(['/cadastro-usuario'])
  }

  forgotPassword() {
    this.router.navigate(['/recupera-senha'])
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}