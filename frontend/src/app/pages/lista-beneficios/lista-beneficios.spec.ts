import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaBeneficiosComponent } from './lista-beneficios';
import { BeneficioService } from '../../core/services/beneficio.service';
import { of, throwError } from 'rxjs';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChangeDetectorRef } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

describe('ListaBeneficiosComponent', () => {
  let component: ListaBeneficiosComponent;
  let fixture: ComponentFixture<ListaBeneficiosComponent>;
  let serviceMock: any;

  beforeEach(async () => {
    serviceMock = {
      listar: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ListaBeneficiosComponent],
      providers: [
        { provide: BeneficioService, useValue: serviceMock },
        {
          provide: ChangeDetectorRef,
          useValue: { detectChanges: vi.fn() }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaBeneficiosComponent);
    component = fixture.componentInstance;
  });

  // 🧪 TESTE 1 - criação
  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar carregar no ngOnInit', () => {
    serviceMock.listar.mockReturnValue(of([])); // 🔥 ESSENCIAL

    const spy = vi.spyOn(component, 'carregar');

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  // 🧪 TESTE 3 - carregar dados com sucesso
  it('deve preencher lista de benefícios', () => {
    const mockData = [
      { id: 1, nome: 'A', valor: 100, ativo: true },
      { id: 2, nome: 'B', valor: 200, ativo: true }
    ];

    serviceMock.listar.mockReturnValue(of(mockData));

    const detectSpy = vi.spyOn(component['cd'], 'detectChanges');

    component.carregar();

    expect(serviceMock.listar).toHaveBeenCalled();
    expect(component.beneficios.length).toBe(2);
    expect(component.beneficios).toEqual(mockData);
    expect(detectSpy).toHaveBeenCalled();
  });

  // 🧪 TESTE 4 - tratar erro
  it('deve tratar erro ao carregar benefícios', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

    serviceMock.listar.mockReturnValue(
      throwError(() => new Error('Erro de API'))
    );

    component.carregar();

    expect(consoleSpy).toHaveBeenCalled();
  });
});