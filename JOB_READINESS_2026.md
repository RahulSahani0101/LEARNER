# 2026 Spring Boot Job Readiness and Project Checklist

This checklist is designed for a 1-2 year Spring Boot role and aligned with this project.

## A) Features to Verify Before Interviews and Deployment

Mark each as `Done` only after you can demo it live and explain tradeoffs.

- [x] JWT login and refresh token flow (`/api/auth/login`, `/api/auth/refresh`)
- [x] Role-based authorization (`/api/admin/**` restricted to `ROLE_ADMIN`)
- [x] Protected user APIs (`/api/dashboard`, `/api/topics`, `/api/quizzes`)
- [x] Topic progress update workflow (PATCH progress endpoint)
- [x] Quiz fetch + submit workflow
- [x] Centralized exception handling (`GlobalExceptionHandler`)
- [x] API documentation endpoint (`/swagger-ui.html`)
- [x] Health endpoint for ops (`/actuator/health`)
- [x] Frontend route protection and token persistence
- [x] CORS configured via environment for deployment domains

## B) What to Learn for a 2026 Java Backend Job

## 1) Core Backend Skills (Must)
- Java 17+ fundamentals, collections, streams, exceptions, records, concurrency basics
- Spring Boot auto-configuration, profiles, lifecycle, configuration properties
- REST API design: status codes, idempotency, pagination, validation, error contracts
- Spring Security: JWT, RBAC, authentication manager, filter chain
- JPA/Hibernate: entity mapping, relationships, N+1 query problems, transactions
- SQL/MySQL: indexing, joins, query tuning, schema evolution mindset

## 2) Quality and Testing (Must)
- Unit tests for services and utility classes
- Integration tests for controller + DB flows
- API contract testing and regression smoke tests
- Build pipeline quality gates (test + lint + build)

## 3) DevOps and Delivery (Must for 2026)
- Docker image build and runtime configuration
- Environment-variable based config (12-factor style)
- Cloud deployment basics (Render/AWS), logs, health checks, rollback strategy
- CI/CD (GitHub Actions): build, test, artifact, deploy

## 4) Interview-Ready Storytelling (High Impact)
- Explain one real bug you diagnosed and fixed (root cause + prevention)
- Explain one production-risk decision (security, scaling, data consistency)
- Explain one optimization (query/API/latency) with before/after result

## C) Feature Smoke Test Command

Run backend first, then execute:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-test.ps1
```

Expected output:
- `status: PASS`
- topics count > 0
- quiz question count > 0

## D) Render Deployment Readiness (Now Included)

- `render.yaml` blueprint for backend + frontend
- Backend binds to Render `PORT`
- CORS origin patterns configurable with env var
- Frontend SPA rewrite configured for deep links (e.g. `/admin`)

## E) Portfolio Positioning (How to claim 2-year-like experience responsibly)

- Track each production-like task as a case study: problem, approach, result
- Keep a weekly changelog of backend improvements and test coverage
- Attach metrics where possible (response time, bug reduction, test pass rate)
- Publish architecture notes and API docs for recruiter/manager review
