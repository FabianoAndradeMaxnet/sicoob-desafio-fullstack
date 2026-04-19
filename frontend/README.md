# 🏗️ Desafio Fullstack Integrado – Sicoob

## 📌 Visão Geral

Este projeto implementa uma solução fullstack completa com arquitetura em camadas, contemplando:

* Banco de dados (H2)
* Camada de serviço (EJB adaptado)
* Backend REST (Spring Boot)
* Frontend (Angular Standalone)

O sistema permite gerenciar benefícios e realizar transferências entre eles, garantindo integridade dos dados e consistência transacional.

---

## 🧠 Decisões Técnicas

### 🔹 1. Simplificação do EJB para Spring Service

O serviço originalmente fornecido como EJB foi adaptado para um `@Service` Spring.

**Motivo:**

* O Spring Boot não executa EJB nativamente
* Evita dependência de container Java EE
* Mantém a lógica de negócio intacta

**Resultado:**
✔ Código mais simples
✔ Execução standalone
✔ Fácil manutenção

---

### 🔹 2. Controle Transacional

Utilizado:

```java
@Transactional
```

**Motivo:**

* Garantir rollback automático em caso de erro
* Manter consistência na transferência

---

### 🔹 3. Controle de Concorrência

Implementado:

LockModeType.OPTIMISTIC


**Motivo:**

* Evitar inconsistência em atualizações simultâneas
* Simular comportamento esperado do EJB

---

### 🔹 4. Arquitetura em Camadas

Estrutura adotada:

controller → service → repository → database


**Motivo:**

* Separação de responsabilidades
* Facilidade de testes
* Código mais organizado

---

### 🔹 5. DTO Pattern

Utilização de DTOs (`BeneficioDTO`, `TransferDTO`)

**Motivo:**

* Evitar exposição direta da entidade
* Melhor controle de dados trafegados

---

### 🔹 6. Frontend Standalone (Angular 19)

Utilizado Angular com componentes standalone.

**Motivo:**

* Simplifica estrutura (sem AppModule)
* Melhor organização
* Aderente às versões mais recentes

---

### 🔹 7. Comunicação entre Componentes

Utilizado:

@Output() atualizado = new EventEmitter<void>();


**Motivo:**

* Atualizar lista após transferência
* Manter componentes desacoplados

---

### 🔹 8. Formatação de Moeda

Utilizado:

currency:'BRL':'symbol':'1.2-2':'pt-BR'


**Motivo:**

* Melhor experiência do usuário
* Adequação ao padrão brasileiro

---

### 🔹 9. Tratamento de CORS

Configurado no backend:

.allowedOrigins("http://localhost:4200")


**Motivo:**

* Permitir comunicação frontend/backend em ambiente local

---

## 🐞 Correção do Bug (EJB)

Problemas identificados:

* ❌ Não validava saldo
* ❌ Não validava valor
* ❌ Não controlava concorrência

Soluções aplicadas:

✔ Validação de saldo
✔ Validação de valor positivo
✔ Lock otimista
✔ Uso de transação

---

## 🚀 Como Executar

### 🔧 Backend

```bash
cd backend-module
mvn clean install
mvn spring-boot:run
```

Acesse:

http://localhost:8080/api/v1/beneficios


---

### 🎨 Frontend

cd frontend
npm install
ng serve


Acesse:
http://localhost:4200

---

## 🧪 Testes

* Testes manuais via navegador e Postman
* Validação de cenários:

  * Transferência válida
  * Saldo insuficiente
  * Valores inválidos

---

## 📊 Funcionalidades

✔ Listar benefícios
✔ Criar benefício
✔ Atualizar benefício
✔ Deletar benefício
✔ Transferir valores entre benefícios

---

## 🏁 Considerações Finais

A solução prioriza:

* Simplicidade
* Clareza arquitetural
* Boas práticas modernas
* Facilidade de execução

O projeto foi desenvolvido visando equilíbrio entre robustez técnica e praticidade de execução em ambiente de avaliação.

---

## 👨‍💻 Autor

Fabiano Andrade
