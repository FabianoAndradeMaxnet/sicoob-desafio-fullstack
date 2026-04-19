package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.domain.Beneficio;

public interface BeneficioRepository extends JpaRepository<Beneficio, Long>{
}