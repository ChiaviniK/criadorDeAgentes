import { StackConfig } from '../types/agent';

export const STACKS: Record<string, StackConfig> = {
  typescript: {
    id: 'typescript',
    name: 'Variante D — TypeScript',
    badge: 'NestJS + Next.js / React + Prisma',
    backend: 'NestJS / Node.js LTS',
    frontend: 'Next.js / React',
    database: 'PostgreSQL / MySQL',
    orm: 'Prisma ou TypeORM + Migrations',
    testRunner: 'Vitest / Jest + Playwright',
    guidelines: [
      'Strict mode sempre habilitado no TypeScript.',
      'Proibido o uso de `any` sem justificativa formal em comentário.',
      'DTOs com validação em tempo de execução usando class-validator ou Zod em todas as fronteiras.',
      'Injeção de dependência nativa do NestJS e isolamento de módulos.',
      'Componentes React funcionais com hooks customizados para regras de UI e Zod para formulários.',
    ],
    recommendedRules: [
      'typescript-strict.md',
      'nestjs-architecture.md',
      'nextjs-react-clean.md',
    ]
  },
  python: {
    id: 'python',
    name: 'Variante B — Python',
    badge: 'FastAPI / Flask + React + SQLAlchemy',
    backend: 'FastAPI ou Flask / Python 3.12+',
    frontend: 'React / Vite ou Next.js',
    database: 'PostgreSQL / MySQL',
    orm: 'SQLAlchemy 2.0 + Alembic',
    testRunner: 'pytest + httpx + pytest-asyncio',
    guidelines: [
      'Type hints completos e verificados com mypy ou pyright.',
      'Schemas Pydantic v2 estritos para validação de entrada e saída.',
      'Sessões SQLAlchemy gerenciadas com context managers e transações atômicas.',
      'Async/await consciente para operações I/O bound no FastAPI.',
      'Isolamento de dependências com Poetry ou uv e ambiente virtual.',
    ],
    recommendedRules: [
      'python-type-hints.md',
      'fastapi-pydantic-security.md',
      'sqlalchemy-alembic-safe.md',
    ]
  },
  java: {
    id: 'java',
    name: 'Variante A — Java',
    badge: 'Spring Boot 3 / Java 21+ + React + JPA',
    backend: 'Spring Boot 3 / Java 21+ (Virtual Threads)',
    frontend: 'React / Vite ou Next.js',
    database: 'PostgreSQL / MySQL / SQL Server',
    orm: 'Spring Data JPA + Flyway / Liquibase',
    testRunner: 'JUnit 5 + Mockito + Testcontainers',
    guidelines: [
      'Java 21+ com Records para DTOs imutáveis e Pattern Matching.',
      'Spring Security 6 com OAuth2/JWT e stateless sessions.',
      'Separação estrita de Controllers REST, Services (@Service) e Repositories (@Repository).',
      'Migrations versionadas estritamente com Flyway ou Liquibase — zero DDL em produção.',
      'Bean Validation (Jakarta Validation: @NotNull, @Size, @Pattern) em todos os endpoints.',
    ],
    recommendedRules: [
      'java-spring-boot-clean.md',
      'flyway-safe-migrations.md',
      'spring-security-jwt.md',
    ]
  },
  dotnet: {
    id: 'dotnet',
    name: 'Variante C — .NET',
    badge: 'ASP.NET Core / C# + React + EF Core',
    backend: 'ASP.NET Core 8/9 / C#',
    frontend: 'React / Vite ou Next.js',
    database: 'SQL Server / PostgreSQL',
    orm: 'Entity Framework Core + Migrations',
    testRunner: 'xUnit + FluentAssertions + Moq',
    guidelines: [
      'C# moderno com records, nullable reference types ativados e pattern matching.',
      'Arquitetura Limpa / MediatR ou Minimal APIs organizadas por endpoints.',
      'Validação com FluentValidation integrada ao pipeline de requisição.',
      'EF Core com DbContextScoped, AsNoTracking para queries de leitura e transações explícitas.',
      'ASP.NET Core Identity ou tokens JWT seguros com ASP.NET Authentication/Authorization middleware.',
    ],
    recommendedRules: [
      'csharp-dotnet-clean.md',
      'efcore-performance-safe.md',
      'aspnet-security-pipeline.md',
    ]
  }
};
