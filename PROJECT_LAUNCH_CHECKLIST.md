# Project Launch Checklist

## Sidebar Options and Status

- [x] Dashboard: Loads with API data and fallback data mode.
- [x] Courses: Searchable course catalog with category filter and quiz/topic actions.
- [x] DSA Tracker: Interactive tracks, question bank, approach notes, Java hints, solved-state tracking.
- [x] Mock Interviews: Clickable question-answer bank with interviewer intent and 7-day sprint.
- [x] AI Mentor: Prompt-based guidance, action plans, and skill-gap matrix.
- [x] Roadmaps: Structured sequence view with progress bars and actions.
- [x] Leaderboard: Weekly/monthly toggle and problem-solved context.
- [x] Projects: Portfolio blueprints with milestone tracker and completion progress.
- [x] Resume Builder: Dynamic summary + experience bullets + copy bundle action.
- [x] Community: Joinable peer sessions and accountability workflow.
- [x] Settings: Persistent preferences saved in local storage.
- [x] Admin: Metrics + fallback mode + release readiness checklist.

## Render Readiness

- [x] `render.yaml` added for backend + frontend.
- [x] Backend `PORT` binding support enabled.
- [x] CORS origin patterns externalized for deployed frontend URLs.
- [x] SPA rewrite rule configured for deep routes (example: `/admin`).

## Verification Run

- [x] Backend tests: `mvn test`
- [x] Frontend build: `npm.cmd run build`
- [x] API smoke test: `powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-test.ps1`
- [x] UI route smoke test: `node frontend/scripts/ui-smoke.cjs`
