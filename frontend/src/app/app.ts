import { Component } from '@angular/core';
import { ListaBeneficiosComponent } from './pages/lista-beneficios/lista-beneficios';
import { TransferenciaComponent } from './pages/transferencia/transferencia';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaBeneficiosComponent, TransferenciaComponent],
  template: `
    <app-lista-beneficios #lista></app-lista-beneficios>
    <hr>
    <app-transferencia (atualizado)="lista.carregar()"></app-transferencia>
  `
})
export class AppComponent {}