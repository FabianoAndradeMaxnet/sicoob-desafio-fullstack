import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferenciaComponent } from './transferencia';
import { BeneficioService } from '../../core/services/beneficio.service';
import { of, throwError } from 'rxjs';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('TransferenciaComponent', () => {
  let component: TransferenciaComponent;
  let fixture: ComponentFixture<TransferenciaComponent>;
  let serviceMock: any;

  beforeEach(async () => {
    serviceMock = {
      transferir: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [TransferenciaComponent],
      providers: [
        { provide: BeneficioService, useValue: serviceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve realizar transferência com sucesso', () => {
    component.fromId = 1;
    component.toId = 2;
    component.valor = 100;

    serviceMock.transferir.mockReturnValue(of({}));

    const emitSpy = vi.spyOn(component.atualizado, 'emit');

    component.transferir();

    expect(serviceMock.transferir).toHaveBeenCalledWith({
      fromId: 1,
      toId: 2,
      amount: 100
    });

    expect(component.mensagem).toBe('Transferência realizada com sucesso!');
    expect(emitSpy).toHaveBeenCalled();

    expect(component.fromId).toBeNull();
    expect(component.toId).toBeNull();
    expect(component.valor).toBeNull();
  });

  it('deve tratar erro na transferência', () => {
    serviceMock.transferir.mockReturnValue(
      throwError(() => ({ error: { message: 'Saldo insuficiente' } }))
    );

    component.transferir();

    expect(component.mensagem).toBe('Saldo insuficiente');
  });
});