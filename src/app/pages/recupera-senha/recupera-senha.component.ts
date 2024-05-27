import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LoginService } from '../../services/login.service';
import { Usuario } from '../interface/usuario';
import { ToastrService } from 'ngx-toastr';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@Component({
  selector: 'app-recupera-senha',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    ProgressSpinnerModule
  ],
  templateUrl: './recupera-senha.component.html',
  styleUrl: './recupera-senha.component.css'
})
export class RecuperaSenhaComponent {

  email: string = '';
  loading: boolean = false;

  constructor(private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) { }

  recuperaSenha(email: string) {
    this.loading = true;
    this.loginService.recuperaSenha(email).pipe().subscribe({
      next: (res) => {
        this.toastr.success('E-mail enviado com sucesso!')
        this.loading = false;
        return this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error(err.error)
      }
    })
  }

  back() {
    this.router.navigate(['/login']);
  }
}
