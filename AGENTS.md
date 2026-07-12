# AGENTS.md

Instructions for AI agents working in this repository.

## Project Structure

```markdown
SU-Website/
├── su-frontend/        # React + TypeScript + Vite frontend
│   └── src/
│       ├── App.tsx         # Main app — all pages and routing
│       └── AdminPage.tsx   # Admin panel
├── su-backend/
│   └── backend/demo/   # Spring Boot backend (Java 17, Maven)
│       └── src/main/java/com/example/demo/
│           ├── controller/ # REST controllers
│           ├── entity/     # JPA entities
│           └── repository/ # JPA repositories
├── su-backend/migrations/  # PostgreSQL migration SQL files
├── docs/               # Project documentation
└── reports/            # Weekly sprint reports
```

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, React Router v7
- **Backend:** Spring Boot 4.1, Java 17, Maven, Spring Data JPA
- **Database:** PostgreSQL
- **Infrastructure:** Docker, Nginx

## Running Locally

### Frontend

```bash
cd su-frontend
npm install
npm run dev       # starts at http://localhost:5173
npm run build     # production build
```

### Backend

```bash
cd su-backend/backend/demo
./mvnw spring-boot:run   # starts at http://localhost:8080
```

### With Docker (production)

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Backend API

Base URL (production): `http://10.93.26.192:8080`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/questionnaire/{id}` | Get one questionnaire |
| POST | `/questionnaire` | Create questionnaire |
| POST | `/questions` | Create question |
| POST | `/options` | Create option |
| POST | `/responses` | Submit questionnaire response |
| POST | `/answers` | Submit answer |

CORS is open for all origins.

## Key Rules

- **Never commit `.env` files or secrets**
- **Never push directly to `main`** — always open a PR from a feature branch
- Branch naming: `{issue-number}-{short-description}` (e.g. `179-agents-md`)
- PRs must be linked to a GitHub issue
- PRs require at least one review before merge

## Frontend Notes

- All pages are in `su-frontend/src/App.tsx`
- Admin panel is in `su-frontend/src/AdminPage.tsx`
- Backend URL is defined at the top of `App.tsx` as `const API_URL`
- Question types must match DB constraints: `open_text`, `single_choice`, `multiple_choice`

## Backend Notes

- All entities must have `@GeneratedValue(strategy = GenerationType.IDENTITY)` on `@Id`
- Database schema is managed via SQL files in `su-backend/migrations/` — apply in order
- CORS config is in `controller/CorsConfig.java`

## What Not to Touch

- Do not modify migration files that are already applied to production
- Do not change `API_URL` in `App.tsx` without updating deployment config
