# CODESA

CODESA is a full-stack EdTech platform focused on Java backend and DSA interview preparation.

## Stack
- Frontend: React 18, TypeScript, Vite 5, Tailwind 3, Framer Motion, React Query, Zustand
- Backend: Spring Boot 3.3.1, Java 17 runtime (Java 21-ready code style), Spring Security JWT, Spring Data JPA
- Database: MySQL 8
- DevOps: Docker Compose

## Quick Start
1. Copy `.env.example` to `.env` and update secrets.
2. Local backend only (fastest for learning):
   - `cd backend`
   - `mvn spring-boot:run`
   - By default, this runs profile `dev` using embedded in-memory H2.
3. Local full stack with MySQL (production-like):
   - `docker compose up --build`
   - Backend runs with profile `mysql`.
4. Frontend local dev:
   - `cd frontend`
   - `npm install`
   - `npm run dev`
5. Run API smoke test (optional but recommended):
   - `powershell -ExecutionPolicy Bypass -File .\scripts\smoke-test.ps1`
6. Run UI route smoke test (verifies every sidebar page opens):
   - `cd frontend`
   - `npm run ui:smoke`

## Runtime Profiles
- `dev` (default): embedded H2 database, no external MySQL required.
- `mysql`: uses MySQL datasource from `SPRING_DATASOURCE_*` variables.

## Shareable Deployment
To host this for real users, deploy using the Docker setup on any VM/container platform.

Example:.
1. Push this repo to GitHub.
2. Create a VM on Render, Railway, Fly.io, or AWS EC2.
3. Install Docker + Docker Compose on that host.
4. Set `.env` values (strong JWT secrets, DB credentials).
5. Run `docker compose up --build -d`.
6. Point your domain to the host and expose `80/443` via reverse proxy (Nginx/Caddy).

## Render Deployment (Blueprint)
This repository now includes `render.yaml` for one-click Render setup:

1. Push repository to GitHub.
2. In Render dashboard, choose **New +** -> **Blueprint**.
3. Select this repository.
4. Render creates:
   - `codesa-backend` (Docker web service)
   - `codesa` (static site)
5. Update environment values after first deploy:
   - Backend `APP_CORS_ALLOWED_ORIGIN_PATTERNS` to your real frontend URL
   - Frontend `VITE_API_BASE_URL` to your real backend URL + `/api`

Notes:
- Backend port auto-binds via `PORT` environment variable.
- SPA deep links (for example `/admin`) are handled by rewrite in `render.yaml`.

## Feature Coverage
- Dashboard with fallback mode when API is unavailable
- Courses + Roadmaps with search/filter and quiz/topic actions
- DSA tracker with clickable tracks, question bank, and Java hints
- Interview prep board with technical + behavioral model answers
- AI mentor page with prompt-based action plans and skill-gap matrix
- Projects tracker with milestone checklist
- Resume builder with generated summary and resume bullets
- Community sessions with join toggles
- Persistent settings and admin release checklist

## Demo Credentials
- Admin: `admin@javadevmastery.com` / `Password@123`
- Demo: `demo@javadevmastery.com` / `Password@123`
- Test: `test@javadevmastery.com` / `Password@123`
