// src/app/components/pessoa-list/pessoa-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoas.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pessoa-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.scss']
})
export class PessoaListComponent implements OnInit {
  pessoas: Pessoa[] = [];

  constructor(
    private pessoaService: PessoaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarPessoas();
  }

  /**
   * Carrega a lista de todas as pessoas.
   */
  carregarPessoas(): void {
    this.pessoaService.getTodasPessoas().subscribe({
      next: (data) => {
        this.pessoas = data;
      },
      error: (err) => {
        console.error('Erro ao carregar pessoas:', err);
        alert('Erro ao carregar a lista de pessoas.');
      }
    });
    }

  /**
   * Navega para a tela de edição de uma pessoa.
   * @param id O ID da pessoa a ser editada.
   */
  editarPessoa(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/editar-pessoa', id]);
    } else {
      alert('ID da pessoa não encontrado para edição.');
    }
  }

  /**
   * Deleta uma pessoa após confirmação.
   * @param id O ID da pessoa a ser deletada.
   */
  deletarPessoa(id: number | undefined): void {
    if (id && confirm('Tem certeza que deseja deletar esta pessoa?')) {
      this.pessoaService.deletarPessoa(id).subscribe({
        next: () => {
          alert('Pessoa deletada com sucesso!');
          this.carregarPessoas(); // Recarrega a lista após a exclusão
        },
        error: (err) => {
          console.error('Erro ao deletar pessoa:', err);
          alert('Erro ao deletar a pessoa.');
        }
      });
    }
  }

  /**
   * Navega para a tela de cadastro de uma nova pessoa.
   */
  novaPessoa(): void {
    this.router.navigate(['/cadastrar-pessoa']);
  }
}
