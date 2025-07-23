import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoas.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private apiUrl = 'http://localhost:8080/api/usuario';

    constructor(private http: HttpClient) { }


    getTodasPessoas(): Observable<Pessoa[]> {

      return this.http.get<Pessoa[]>(this.apiUrl);
    }


    getPessoaPorId(id: number): Observable<Pessoa> {
      return this.http.get<Pessoa>(`${this.apiUrl}/${id}`);
    }

    cadastrarPessoa(pessoa: Pessoa): Observable<Pessoa> {
      return this.http.post<Pessoa>(`${this.apiUrl}/cadastro`, pessoa);
    }


    atualizarPessoa(id: number, pessoa: Pessoa): Observable<Pessoa> {
      return this.http.put<Pessoa>(`${this.apiUrl}/${id}`, pessoa);
    }

    deletarPessoa(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
