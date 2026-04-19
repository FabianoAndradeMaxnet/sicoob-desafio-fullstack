package com.example.backend.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.domain.Beneficio;
import com.example.backend.dto.BeneficioDTO;
import com.example.backend.repository.BeneficioRepository;

@Service
public class BeneficioService {

    private final BeneficioRepository repository;
    private final TransferService tranferService;

    // 🔥 Injeção por construtor (melhor prática)
    public BeneficioService(BeneficioRepository repository,
                            TransferService transferService) {
        this.repository = repository;
        this.tranferService = transferService;
    }

    public List<BeneficioDTO> listar() {
        return repository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public BeneficioDTO buscarPorId(Long id) {
        Beneficio b = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Benefício não encontrado"));
        return toDTO(b);
    }

    @Transactional
    public BeneficioDTO criar(BeneficioDTO dto) {
        Beneficio b = toEntity(dto);
        return toDTO(repository.save(b));
    }

    @Transactional
    public BeneficioDTO atualizar(Long id, BeneficioDTO dto) {
        Beneficio b = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Benefício não encontrado"));

        b.setNome(dto.getNome());
        b.setDescricao(dto.getDescricao());
        b.setValor(dto.getValor());
        b.setAtivo(dto.getAtivo());

        return toDTO(repository.save(b));
    }

    @Transactional
    public void deletar(Long id) {
        repository.deleteById(id);
    }

    // 🔥 Método mais importante do desafio
    @Transactional
    public void transfer(Long fromId, Long toId, BigDecimal amount) {

        if (fromId == null || toId == null) {
            throw new IllegalArgumentException("IDs não podem ser nulos");
        }

        if (fromId.equals(toId)) {
            throw new IllegalArgumentException("Origem e destino não podem ser iguais");
        }

        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Valor inválido");
        }

        // delega para o serviço de transferência (EJB adaptado)
        tranferService.transfer(fromId, toId, amount);
    }

    private BeneficioDTO toDTO(Beneficio b) {
        BeneficioDTO dto = new BeneficioDTO();
        dto.setId(b.getId());
        dto.setNome(b.getNome());
        dto.setDescricao(b.getDescricao());
        dto.setValor(b.getValor());
        dto.setAtivo(b.getAtivo());
        return dto;
    }

    private Beneficio toEntity(BeneficioDTO dto) {
        Beneficio b = new Beneficio();
        b.setNome(dto.getNome());
        b.setDescricao(dto.getDescricao());
        b.setValor(dto.getValor());
        b.setAtivo(dto.getAtivo());
        return b;
    }
}