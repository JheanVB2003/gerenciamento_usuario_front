import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoas.model';
import { Router, RouterModule } from '@angular/router';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-pessoa-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxMaskPipe],
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


  carregarPessoas(): void {
    this.pessoaService.getTodasPessoas().subscribe({
      next: (data) => {
        console.log(data);
        this.pessoas = data;
      },
      error: (err) => {
        console.error('Erro ao carregar pessoas:', err);
        alert('Erro ao carregar a lista de pessoas.');

      }
    });
    }


  editarPessoa(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/editar-pessoa', id]);
    } else {
      alert('ID da pessoa não encontrado para edição.');
    }
  }


  deletarPessoa(id: number | undefined): void {
    if (id && confirm('Tem certeza que deseja deletar esta pessoa?')) {
      this.pessoaService.deletarPessoa(id).subscribe({
        next: () => {
          alert('Pessoa deletada com sucesso!');
          this.carregarPessoas();
        },
        error: (err) => {
          console.error('Erro ao deletar pessoa:', err);
          alert('Erro ao deletar a pessoa.');
        }
      });
    }
  }

  novaPessoa(): void {
    this.router.navigate(['/cadastrar-pessoa']);
  }

  formatarCpf(cpf: string): string {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  }

  formatarTelefone(telefone: string): string {
    return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }

}
