# **FreelaCRM** 

<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>

**🏆 4º Lugar no Hackathon BorderLess Coding**

**Backend desenvolvido por mim**, aplicando arquitetura modular escalável e princípios sólidos de engenharia de software.

---

## 💡 Sobre o Projeto

**FreelaCRM** é uma solução eficiente para otimizar a gestão de profissionais freelancers, garantindo maior controle sobre projetos, clientes e faturamento.

Freelancers enfrentam desafios ao gerenciar múltiplos projetos, acompanhar prazos, organizar informações de clientes e calcular ganhos. O FreelaCRM resolve esse problema ao oferecer um sistema intuitivo que:

✅ Centraliza informações essenciais – Gerencia dados pessoais do freelancer e organiza detalhes dos projetos.

✅ Facilita a gestão de clientes – Armazena contatos, preços, prazos e status de cada serviço.

✅ Acompanha o progresso dos projetos – Permite visualizar tarefas concluídas, pendentes e pagamentos a receber.

✅ Fornece dashboards inteligentes – Consolida todas as informações em uma interface clara e acessível.

---

## Índice

- [Funcionalidades Principais](#funcionalidades-principais)
- [Arquitetura do Backend](#arquitetura-do-backend)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Executando a Aplicação](#executando-a-aplicação)
- [Como Contribuir](#como-contribuir)
- [Contato](#contato)

---

## Funcionalidades Principais

- **Registro de Usuário**: Cadastro de novos usuários com validação completa via Zod.
- **Login de Usuário**: Autenticação segura com JWT, também sendo possível realizar o login via SSO (Single Sign-On).
- **Gerenciamento de Clientes**: CRUD completo para gerir clientes, incluindo informações pessoais e status.
- **Gerenciamento de Projetos**: CRUD completo para gerir projetos, incluindo informações de preço, prazo e status.
- **Controle de Tempo**: Registro e controle do tempo investido por projeto com precisão.
- **Dashboard Inteligente**: Informações consolidadas de faturamento, status, quantidade de projetos, prazo e esforço.

---

## 🏗️ Arquitetura do Backend

O backend do FreelaCRM foi desenvolvido seguindo uma **arquitetura Modular MVC com TypeScript**, garantindo qualidade, escalabilidade e manutenibilidade de longo prazo durante o Hackathon.

### 📂 Estrutura de Módulos

Cada módulo do sistema (**auth**, **client**, **project**, **time-entry**, **user**) é **completamente independente** e autocontido:

```
modules/
├── auth/           # Autenticação e autorização
├── client/         # Gestão de clientes
├── project/        # Gestão de projetos
├── time-entry/     # Controle de horas trabalhadas
└── user/           # Gestão de usuários e repositórios
```

**Benefícios dessa estrutura:**
- ✅ **Isolamento total** — alterações em um módulo não afetam outros
- ✅ **Trabalho paralelo** — equipes podem desenvolver módulos simultaneamente
- ✅ **Remoção/adição facilitada** — módulos podem ser extraídos sem impacto
- ✅ **Organização clara** — cada módulo tem suas próprias rotas, controllers, services e repositories

---

### 🔌 Adapters: Isolamento de Dependências Externas

Todas as bibliotecas externas foram **encapsuladas em adapters**, garantindo zero acoplamento com o código de negócio:

```
common/adapters/
├── cryptography/
│   ├── bcrypt-adapter.ts       # Abstrai bcrypt
│   ├── bcrypt-adapter.test.ts
│   ├── jwt-adapter.ts          # Abstrai jsonwebtoken
│   └── jwt-adapter.test.ts
```

**Adapters implementados:**
- **BcryptAdapter** (Hasher) — Hash e comparação de senhas
- **JwtAdapter** (Encrypter) — Geração e validação de tokens JWT


**Por que essa abordagem é superior?**

✅ **Flexibilidade máxima** — trocar bcrypt por Argon2 não afeta services
✅ **Testabilidade absoluta** — mocks simples via interfaces, sem dependências reais
✅ **Zero vendor lock-in** — não ficamos presos a bibliotecas específicas
✅ **Manutenibilidade** — bibliotecas externas isoladas em um único local
✅ **Documentação implícita** — interfaces servem como contratos claros

---

### 🛡️ Middleware Global de Tratamento de Erros

Implementação de **middleware global** para tratamento centralizado de erros HTTP:

```
common/middlewares/
├── error-handler-middleware.ts  # Tratamento global de erros
├── check-auth-middleware.ts     # Autenticação JWT
├── cors.ts                      # Configuração CORS
└── validation-middleware.ts     # Validação com Zod
```

**O middleware de erros garante:**
- ✅ **Status HTTP apropriados** — erros retornam códigos corretos (400, 401, 404, 500)
- ✅ **Respostas padronizadas** — formato consistente de erro em toda API
- ✅ **Segurança** — detalhes internos não são expostos em produção
- ✅ **Logging centralizado** — todos os erros são registrados adequadamente
- ✅ **Experiência do desenvolvedor** — mensagens claras facilitam debugging

**Tratamento de erros personalizados:**

```
common/errors/
└── http-errors.ts  # Classes de erro customizadas (BadRequest, Unauthorized, NotFound, etc.)
```

Erros customizados garantem que cada camada da aplicação pode lançar exceções específicas que são automaticamente convertidas em respostas HTTP apropriadas pelo middleware global.

---

### 🧪 Testes Completos com Vitest

**100% das rotas testadas**, garantindo confiabilidade e qualidade:

- ✅ **Testes de adapters** — todas as abstrações de bibliotecas testadas isoladamente
- ✅ **Testes unitários** — services e repositories com mocks via interfaces
- ✅ **Testes de integração** — rotas HTTP completas (GET, POST, PUT, DELETE)
- ✅ **Performance otimizada** — Vitest é significativamente mais rápido que Jest
- ✅ **Cobertura automatizada** — via `@vitest/coverage-v8`

**Graças aos adapters, os testes são:**
- Extremamente **rápidos** (sem I/O real)
- **Simples de escrever** (mocks triviais)
- **Confiáveis** (sem dependências externas)
- **Determinísticos** (sempre produzem os mesmos resultados)


---

## 🚀 Benefícios da Arquitetura Implementada

### 🎨 Manutenibilidade Máxima
- Código organizado por **contextos de negócio** (módulos isolados)
- Dependências externas **concentradas em adapters**
- Refatoração segura graças às **interfaces bem definidas**
- **Zero acoplamento** entre módulos e bibliotecas

### 🔄 Flexibilidade Excepcional
- Migrar de **bcrypt para Argon2**? Apenas implemente um novo Hasher
- Adicionar **Redis para cache**? Crie um novo CacheAdapter
- Mudar de **JWT para sessões**? Substitua o JwtAdapter
- **Nenhuma** dessas mudanças afeta services, controllers ou repositories

### 🧪 Testabilidade Absoluta
- Testes **não dependem de banco real** (mocks via adapters)
- Bibliotecas **facilmente mockadas** via interfaces
- Testes **extremamente rápidos** (sem I/O real)
- **Cobertura completa** sem complexidade
- **TDD natural** — escrever testes é simples e direto

### 📈 Escalabilidade Garantida
- Novos módulos **não afetam código existente**
- Adapters **reutilizáveis** entre todos os módulos
- Equipes trabalham **paralelamente** sem conflitos
- Preparado para **microsserviços** (módulos já são independentes)
- **Performance consistente** com crescimento da aplicação

### 🛡️ Segurança em Camadas
- Validação em **múltiplas camadas** (Zod + DTOs)
- Senhas **nunca expostas** (encapsuladas no BcryptAdapter)
- **Middleware global** trata erros sem expor detalhes internos
- Tokens JWT com **expiração curta** minimizam janela de ataque

---

## ⚙️ Tecnologias Utilizadas

### **Backend**
| Tecnologia | Função |
|------------|--------|
| **Node.js + TypeScript** | Runtime e tipagem estática para desenvolvimento seguro |
| **Express.js** | Framework HTTP leve e eficiente |
| **Prisma ORM** | Mapeamento de dados tipado e eficiente |
| **Zod** | Validação de dados segura e funcional |
| **bcrypt + JWT** | Criptografia e autenticação com AccessTokens |
| **Vitest** | Framework moderno de testes com alta performance |
| **Docker** | Ambientes consistentes para desenvolvimento |

### **Frontend**
| Tecnologia | Função |
|------------|--------|
| **React + TypeScript** | Interface de usuário interativa e tipada |
| **TailwindCSS** | Estilização ágil com classes utilitárias |

---

## 🏃 Instalação

### **Pré-requisitos**
- Node.js 18+ e npm
- Docker (para banco de dados)
- PostgreSQL

### **Passos**

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/yuribodo/a-base-vem-forte.git
   cd a-base-vem-forte
   ```

2. **Instale as dependências do Backend**:
   ```bash
   cd backend
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   ```bash
   cp .env.example .env
   # Edite o .env com suas credenciais
   ```

4. **Execute as migrações do Prisma**:
   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor Backend**:
   ```bash
   npm run start
   ```

6. **Para o Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## 🧪 Executando Testes

```bash
npm test              # Executa todos os testes
npm run test:unit     # Modo watch para desenvolvimento
npm run test:verbose  # Modo detalhado com logs
npm run test:ci       # Testes + cobertura para CI/CD
```

---

## 🤝 Como Contribuir

1. Fork o repositório
2. Crie uma branch para sua feature: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'feat: adiciona nova feature'`
4. Push para a branch: `git push origin minha-feature`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença especificada no repositório.

---

**Desenvolvido com arquitetura sólida e princípios de engenharia de software para durar, evoluir e escalar.** 🚀
