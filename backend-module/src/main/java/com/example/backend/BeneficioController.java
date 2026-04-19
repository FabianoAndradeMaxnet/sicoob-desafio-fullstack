package com.example.backend;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.BeneficioDTO;
import com.example.backend.dto.TransferDTO;
import com.example.backend.service.BeneficioService;

@RestController
@RequestMapping("/api/v1/beneficios")
public class BeneficioController {

    private final BeneficioService service;

    public BeneficioController(BeneficioService service) {
        this.service = service;
    }

    @GetMapping
    public List<BeneficioDTO> list() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public BeneficioDTO buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public BeneficioDTO criar(@RequestBody BeneficioDTO beneficio) {
        return service.criar(beneficio);
    }

    @PostMapping("/transferencias")
    public void transferir(@RequestBody TransferDTO dto) {
        service.transfer(dto.getFromId(), dto.getToId(), dto.getAmount());
    }
}