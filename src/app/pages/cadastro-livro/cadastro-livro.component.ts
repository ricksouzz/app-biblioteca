import { LocalStorageService } from './../../services/local-storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LivroService } from '../../services/livro.service';
import { catchError, firstValueFrom, map, of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@Component({
  selector: 'app-cadastro-livro',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  templateUrl: './cadastro-livro.component.html',
  styleUrl: './cadastro-livro.component.css'
})
export class CadastroLivroComponent implements OnInit {
  await: any;

  constructor(private livroService: LivroService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) {
  }

  livros: any[] = [];
  livroSelecionado: any = {};

  telaListagem: boolean = true;
  telaEdicao: boolean = false;
  telaNovo: boolean = false;

  async ngOnInit() {
    this.listaLivro();
  }

  listaLivro() {
    this.livroService.findAll().subscribe({
      next: (res) => {
        this.livros = res;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  cadastrarLivro() {
    this.livroSelecionado = {};
    this.telaListagem = false;
    this.telaNovo = true;
  }

  async adicionarLivro() {
    this.livroService.create(this.livroSelecionado).pipe(
      map((res) => {
        this.toastr.success('', 'Livro criado com sucesso!')
        return this.voltarParaHome();
      }),
      catchError((err) => {
        this.toastr.error(err.error)
        return of(null)
      })
    ).subscribe()
  }

  editarLivro(i: number) {
    this.livroSelecionado = this.livros[i];
    this.telaListagem = false;
    this.telaEdicao = true;
  }

  async salvarEdicao() {
    const usuarioId = firstValueFrom(await this.localStorageService.recuperarUsuarioId())
    this.livroSelecionado.usuarioId = usuarioId
    this.livroService.update(this.livroSelecionado).pipe(
      map((res) => {
        this.toastr.success('', 'Livro editado com sucesso!')
        return this.voltarParaHome();
      }),
      catchError((err) => {
        console.log(err)
        this.toastr.error(err.error)
        return of(null)
      })
    ).subscribe()
  }

  confirmarDelecao(livro: any) {
    this.confirmationService.confirm({
      header: 'Excluir Livro?',
      message: `Tem certeza que deseja deletar o livro "${livro.descricao}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.deletarLivro(livro);
      }
    });
  }

  async deletarLivro(livro: any) {
    const usuarioId = firstValueFrom(await this.localStorageService.recuperarUsuarioId())
    this.livroSelecionado.usuarioId = usuarioId
    this.livroService.delete(livro.id).pipe(
      map((res) => {
        this.toastr.success('', 'Livro excluído com sucesso.')
        return this.voltarParaHome();
      }),
      catchError((err) => {
        console.log(err)
        this.toastr.error(err.error)
        return of(null)
      })
    ).subscribe()
  }

  voltarParaHome() {
    this.telaEdicao = false;
    this.telaNovo = false;
    this.telaListagem = true;
    return this.ngOnInit()
  }

  logout() {
    this.toastr.warning("Você efetuou o logout da aplicação.")
    this.router.navigate(['/login']);
  }
}
