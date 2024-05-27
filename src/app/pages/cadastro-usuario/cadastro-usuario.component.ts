import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Usuario } from '../interface/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule
  ],
  providers: [
  ],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent implements OnInit {

  msgs: any;

  usuario: Usuario = {
    login: '',
    password: '',
    nome: '',
    roles: [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      },
      {
        id: 4
      }
    ]
  };

  constructor(private router: Router,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  async register() {
    if (await this.validar()) {
      this.usuarioService.create(this.usuario).subscribe({
        next: res => {
          this.toastr.success('', 'Usuário cadastrado com sucesso!')
          return this.router.navigate(['/login'])
        },
        error: (err) => {
          this.toastr.info("Usuário já encontra-se cadastrado na nossa base de dados.");
        }
      })
    }
  }

  back() {
    this.router.navigate(['/login']);
  }

  async validar() {
    if (!this.usuario.nome) {
      this.toastr.error('Preencha um nome de usuário.');
      return false;
    }
    if (!this.usuario.login) {
      this.toastr.error("Preencha um login para o usuário.");
      return false;
    }
    if (!this.usuario.password) {
      this.toastr.error('Preencha uma senha para o usuário.');
      return false;
    }
    return true;
  }
}  