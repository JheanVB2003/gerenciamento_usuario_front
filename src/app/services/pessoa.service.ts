import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoas.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private apiUrl = 'http://localhost:8080/api/usuario'; // **MUDE PARA A URL DA SUA API**

    constructor(private http: HttpClient) { }

    /**
     * Obtém todas as pessoas cadastradas.
     * @returns Um Observable com um array de Pessoas.
     */
    getTodasPessoas(): Observable<Pessoa[]> {

      return this.http.get<Pessoa[]>(this.apiUrl);
    }

    /**
     * Obtém uma pessoa específica pelo ID.
     * @param id O ID da pessoa.
     * @returns Um Observable com a Pessoa.
     */
    getPessoaPorId(id: number): Observable<Pessoa> {
      return this.http.get<Pessoa>(`${this.apiUrl}/${id}`);
    }

    /**
     * Cadastra uma nova pessoa.
     * @param pessoa Os dados da pessoa a serem cadastrados.
     * @returns Um Observable com a Pessoa cadastrada.
     */
    cadastrarPessoa(pessoa: Pessoa): Observable<Pessoa> {
      return this.http.post<Pessoa>(`${this.apiUrl}/cadastro`, pessoa);
    }

    /**
     * Atualiza uma pessoa existente.
     * @param id O ID da pessoa a ser atualizada.
     * @param pessoa Os novos dados da pessoa.
     * @returns Um Observable com a Pessoa atualizada.
     */
    atualizarPessoa(id: number, pessoa: Pessoa): Observable<Pessoa> {
      return this.http.put<Pessoa>(`${this.apiUrl}/${id}`, pessoa);
    }

    /**
     * Deleta uma pessoa.
     * @param id O ID da pessoa a ser deletada.
     * @returns Um Observable vazio (ou com um objeto de sucesso, dependendo da sua API).
     */
    deletarPessoa(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
