import { LocalStorageService } from './../../services/local-storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LivroService } from '../../services/livro.service';
import { catchError, firstValueFrom, map, of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CarouselModule } from 'primeng/carousel';
import { FileUpload, FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
@Component({
  selector: 'app-cadastro-livro',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ConfirmDialogModule,
    CarouselModule,
    FileUploadModule
  ],
  providers: [ConfirmationService],
  templateUrl: './cadastro-livro.component.html',
  styleUrl: './cadastro-livro.component.css'
})
export class CadastroLivroComponent implements OnInit {

  @ViewChild('fubauto') fileUpload: FileUpload | undefined;
  await: any;
  responsiveOptions: any
  
  constructor(private livroService: LivroService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
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
    this.livroSelecionado = i;
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

  uploadImagemLivro(event: any) {
    const file = event.files[0]
    const reader = new FileReader();

    reader.onload = () => {
      this.livroSelecionado.imagemLivro = reader.result;
    };
    reader.readAsDataURL(file);
  }

  limpaUpload() {
    this.fileUpload?.clear()
    this.livroSelecionado.imagemLivro = null;
  }

  logout() {
    this.toastr.warning("Você efetuou o logout da aplicação.")
    this.router.navigate(['/login']);
  }
}
