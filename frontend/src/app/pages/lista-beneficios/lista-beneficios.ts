import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficioService, Beneficio } from '../../core/services/beneficio.service';

@Component({
  selector: 'app-lista-beneficios',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="container">
    <h2>💰 Benefícios</h2>

    <table class="tabela">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Valor</th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let b of beneficios">
          <td>{{b.id}}</td>
          <td>{{b.nome}}</td>
          <td class="valor">
            {{ b.valor | currency:'BRL':'symbol':'1.2-2':'pt-BR' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
`
})
export class ListaBeneficiosComponent implements OnInit {

  beneficios: Beneficio[] = [];

  constructor(private service: BeneficioService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.service.listar().subscribe({
      next: (res) => {
        this.beneficios = [...res];
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('ERRO:', err); // 👈 ESSENCIAL
      }
    });
  }
}