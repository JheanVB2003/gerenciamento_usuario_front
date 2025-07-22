// src/app/models/pessoa.model.ts
export interface Pessoa {
  id?: number; // O ID pode ser opcional, dependendo de como sua API gera
  nome: string;
  cpf: string;
  email: string;
  sexo: string;
  telefone: string;
}
