import { LocalStorageService } from './../../services/local-storage.service';
import { Usuario } from './../interface/usuario';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    ProgressSpinnerModule,
    CheckboxModule
  ], providers: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  lembraUsuario: boolean = false;

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
  ngOnInit(): void {
    this.getLoginSalvo();
  }

  login() {
    this.loading = true;
    this.loginService.login(this.usuario).pipe(
      switchMap((res: Usuario) => {
        this.toastr.success('Login realizado com sucesso.');
        this.localStorageService.guardarUsuarioId(res.id)
        return this.localStorageService.guardarUsuario(this.usuario).pipe(
          map(() => res)
        );
      }),
      tap(() => {
        if (this.lembraUsuario) {
          localStorage.setItem('login', this.usuario.login);
        }

        this.loading = false;
        this.router.navigate(['/cadastro-livro']);
      }),
      catchError((err) => {
        this.loading = false;
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
    this.loading = true;
    localStorage.clear()
    this.router.navigate(['/login'])
    this.loading = false;
  }

  getLoginSalvo() {
    const login = localStorage.getItem('login')
    if (login) {
      this.usuario.login = login;
    }
  }
}