// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { PessoaListComponent } from './components/pessoa-list/pessoa-list.component';
import { PessoaFormComponent } from './components/pessoa-form/pessoa-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/pessoas', pathMatch: 'full' }, // Rota padrão
  { path: 'pessoas', component: PessoaListComponent },
  { path: 'cadastrar-pessoa', component: PessoaFormComponent },
  { path: 'editar-pessoa/:id', component: PessoaFormComponent }, // Rota para edição, com parâmetro de ID
  { path: '**', redirectTo: '/pessoas' } // Redireciona rotas não encontradas para a lista
];
