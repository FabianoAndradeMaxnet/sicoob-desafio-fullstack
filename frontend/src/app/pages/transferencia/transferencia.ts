import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BeneficioService } from '../../core/services/beneficio.service';

@Component({
  selector: 'app-transferencia',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
  <div class="container">
    <h2>🔄 Transferência</h2>

    <form (ngSubmit)="transferir()" class="form">
      <input [(ngModel)]="fromId" name="fromId" placeholder="Origem" required>
      <input [(ngModel)]="toId" name="toId" placeholder="Destino" required>
      <input [(ngModel)]="valor" name="valor" placeholder="Valor" required>

      <button type="submit">Transferir</button>
    </form>

    <p class="mensagem" *ngIf="mensagem">{{mensagem}}</p>
  </div>
`
})

export class TransferenciaComponent {

  fromId: number | null = null;
  toId: number | null = null;
  valor: number | null = null;
  mensagem = '';

  @Output() atualizado = new EventEmitter<void>();

  constructor(private service: BeneficioService) { }

  transferir() {
    this.service.transferir({
      fromId: this.fromId,
      toId: this.toId,
      amount: this.valor
    }).subscribe({
      next: () => {
        this.mensagem = 'Transferência realizada com sucesso!';

        this.atualizado.emit();

        this.fromId = null;
        this.toId = null;
        this.valor = null;
      },
      error: (err) => {
        this.mensagem = err.error?.message || 'Erro na transferência';
      }
    });
  }
}