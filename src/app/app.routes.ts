import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { CadastroLivroComponent } from './pages/cadastro-livro/cadastro-livro.component';
import { RecuperaSenhaComponent } from './pages/recupera-senha/recupera-senha.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cadastro-usuario',
    component: CadastroUsuarioComponent
  },
  {
    path: 'cadastro-livro',
    component: CadastroLivroComponent
  },
  {
    path: 'recupera-senha',
    component: RecuperaSenhaComponent
  }
];
