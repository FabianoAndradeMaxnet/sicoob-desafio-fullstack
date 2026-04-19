package com.example.backend.service;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.domain.Beneficio;

import jakarta.persistence.EntityManager;
import jakarta.persistence.LockModeType;
import jakarta.persistence.PersistenceContext;

@Service
@Transactional
public class TransferService {

    @PersistenceContext
    private EntityManager em;

    public void transfer(Long fromId, Long toId, BigDecimal amount) {

        Beneficio from = em.find(
                Beneficio.class,
                fromId,
                LockModeType.OPTIMISTIC
        );

        Beneficio to = em.find(
                Beneficio.class,
                toId,
                LockModeType.OPTIMISTIC
        );

        if (from == null || to == null) {
            throw new IllegalArgumentException("Benefício não encontrado");
        }

        if (!from.getAtivo() || !to.getAtivo()) {
            throw new IllegalStateException("Benefício inativo");
        }

        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Valor inválido");
        }

        if (from.getValor().compareTo(amount) < 0) {
            throw new IllegalStateException("Saldo insuficiente");
        }

        from.setValor(from.getValor().subtract(amount));
        to.setValor(to.getValor().add(amount));

        // opcional (Hibernate já gerencia automaticamente)
        em.merge(from);
        em.merge(to);
    }
}