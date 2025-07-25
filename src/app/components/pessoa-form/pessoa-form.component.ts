import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoas.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-pessoa-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgxMaskDirective],
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss']
})
export class PessoaFormComponent implements OnInit {
  pessoa: Pessoa = {
    nome: '',
    cpf: '',
    email: '',
    sexo: '',
    telefone: ''
  };
  isEditing: boolean = false;
  pessoaId: number | null = null;

  constructor(
    private pessoaService: PessoaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditing = true;
        this.pessoaId = +idParam;
        this.carregarPessoaParaEdicao(this.pessoaId);
      }
    });
  }


  carregarPessoaParaEdicao(id: number): void {
    this.pessoaService.getPessoaPorId(id).subscribe({
      next: (data) => {
        this.pessoa = data;
      },
      error: (err) => {
        console.error('Erro ao carregar pessoa para edição:', err);
        alert('Erro ao carregar os dados da pessoa.');
      }
    });
  }


  onSubmit(): void {
    if (this.isEditing && this.pessoaId) {
      this.pessoaService.atualizarPessoa(this.pessoaId, this.pessoa).subscribe({
        next: () => {
          alert('Pessoa atualizada com sucesso!');
          this.router.navigate(['/pessoas']);
        },
        error: (err) => {
          console.error('Erro ao atualizar pessoa:', err);
          alert('Erro ao atualizar a pessoa.');
        }
      });
    } else {
      this.pessoaService.cadastrarPessoa(this.pessoa).subscribe({
        next: () => {
          alert('Pessoa cadastrada com sucesso!');
          this.router.navigate(['/pessoas']);
        },
        error: (err) => {
          console.error('Erro ao cadastrar pessoa:', err);
          alert('Erro ao cadastrar a pessoa. Verifique o CPF, pode já estar em uso.');
        }
      });
    }
  }


  voltarParaLista(): void {
    this.router.navigate(['/pessoas']);
  }
}
