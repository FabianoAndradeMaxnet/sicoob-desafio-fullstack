// src/app/core/services/beneficio.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Beneficio {
  id?: number;
  nome: string;
  descricao?: string;
  valor: number;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BeneficioService {

  private api = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  listar(): Observable<Beneficio[]> {
  return this.http.get<Beneficio[]>(`${this.api}/beneficios`);
}

criar(b: Beneficio): Observable<Beneficio> {
  return this.http.post<Beneficio>(`${this.api}/beneficios`, b);
}

atualizar(id: number, b: Beneficio): Observable<Beneficio> {
  return this.http.put<Beneficio>(`${this.api}/beneficios/${id}`, b);
}

deletar(id: number) {
  return this.http.delete(`${this.api}/beneficios/${id}`);
}

transferir(data: any) {
  return this.http.post(`${this.api}/beneficios/transferencias`, data); 
}
}