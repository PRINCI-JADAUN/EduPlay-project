# EDUPlay

**EDUPlay turns school learning into an interactive adventure.** Instead of only reading about a concept, students explore a virtual school, enter a subject room, follow a story mission, manipulate learning objects, complete a practical or guided activity, and finish with a quiz.

> EDUPlay is an active prototype. It demonstrates the learning-game workflow and reusable story/activity engine; it is not yet a complete, curriculum-reviewed library for every subject and class.

## Project introduction

EDUPlay is a browser-based educational game for students in Classes 1–12. A 3D campus acts as the entry point to subject rooms, a library, and virtual learning activities. Each currently seeded activity or practical can be presented as an age-tiered, ten-scene story with a mission, characters, dialogue, and a resolution.

The project combines a React 3D frontend with a Python/Django API. The API stores curriculum and activity data, validates student actions and quiz answers, records progress, and awards rewards. SQLite is the local default; PostgreSQL and Supabase integrations are optional.

## Project objectives

- Make textbook concepts more engaging through exploration and hands-on virtual activities.
- Give each learning activity a story context, mission, scene progression, and educational explanation.
- Let students interact with virtual objects and instruments using movement, clicking, and drag-and-drop controls.
- Check understanding with a related quiz after an activity or practical, then award XP and coins.
- Provide reusable activity, story, and assessment data structures that can grow across classes and subjects.
- Allow staff to generate safe story drafts, edit them, and approve them before publishing.

## Student and teacher flow

### Student gameplay

1. Choose a class and enter the campus as a guest, or use optional Supabase authentication.
2. Walk to a subject room or browse the library.
3. Choose an available guided activity or practical.
4. Read the story introduction and mission briefing.
5. Follow the on-screen instructions, explore the scene, and interact with virtual objects.
6. The API checks each required action and advances story scenes as the activity progresses.
7. Complete the related quiz. The server scores it, records the result, and awards rewards.
8. Read the story ending and return to the subject room or campus.

### Staff story workflow

1. An authenticated staff user requests a story draft using the staff-only story-generation API.
2. The generator returns structured story data and validates it against the activity schema and safe action/animation allowlists.
3. A teacher or administrator edits the story and its scenes in Django admin.
4. Staff publish the draft only after it passes validation.

The local age-tiered story generator works without an AI service. An optional OpenAI-compatible provider can be configured for draft generation. Generated stories are data, not executable scripts; arbitrary generated code is not run by the game.

## Current functionality and scope

- Classes 1–12 with a class-specific subject directory and database-backed learning content.
- A procedural 3D campus, student avatar, classrooms, laboratory spaces, and library.
- Guided activities with interactive steps, draggable objects, and subject-specific virtual props.
- A virtual Class 10 pH practical with server-defined sample results and validated observations.
- Related, server-scored quizzes and XP/coin rewards.
- 119 seeded published story templates for the current activity/practical catalog, with scene and dialogue updates during play.
- Contextual offline learning-assistant fallback and links to external learning resources.

**Important scope limits:** the current catalog is not the requested 7–10 unique, curriculum-reviewed activities per subject for every class. Many stories and activities use reusable templates. The pH practical is the validated scientific simulation; other practical templates should not be treated as scientifically verified experiments. Teacher/parent dashboards, multiplayer, and authored full subject worlds are not yet implemented. Story text, activities, and quiz questions need curriculum-expert review before classroom use.

## Technologies

| Area | Technologies and role |
| --- | --- |
| Frontend | React 19, JavaScript, Vite |
| 3D graphics | Three.js, React Three Fiber, Drei |
| Physics | Rapier via `@react-three/rapier` |
| UI | Bootstrap, Lucide icons, custom CSS |
| Backend/API | Python, Django 5.2, Django REST Framework |
| Database | SQLite by default; PostgreSQL via `DATABASE_URL` |
| Authentication | Local guest mode; optional Supabase Auth/JWT |
| Story generation | Validated offline templates; optional OpenAI-compatible API |
| Testing | Django test runner, Vitest, React Testing Library |

## Architecture and data flow

```text
Student browser
  React UI + 3D game (Vite / Three.js)
           │ /api requests
           ▼
      Django REST API
           │ Django ORM
           ▼
     SQLite or PostgreSQL
```

The frontend sends player actions and quiz answers to Django. The backend validates the current activity step, stores attempts and story progress, scores quizzes, and returns rewards. During local development, Vite proxies `/api` requests to Django.

The database includes class/subject/activity and practical data, quiz questions, learners and attempts, and structured story records (stories, characters, scenes, dialogue, missions, transitions, animation events, branches, rewards, and player story progress). `python manage.py seed_demo` loads the demo curriculum and activities.

## Requirements

- Python 3.10 or later
- Node.js 20 or later
- npm

## Run locally on Windows

Open two PowerShell terminals from the project root (`D:\HCL EDUPLAY`).

### 1. Set up and start the backend

```powershell
Set-Location 'D:\HCL EDUPLAY\backend'
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py seed_demo
python manage.py runserver 127.0.0.1:8000
```

The API health check is `http://127.0.0.1:8000/api/health/`. The local SQLite database is `backend\db.sqlite3`.

If PowerShell prevents environment activation, either allow activation for your user or run the virtual environment's Python directly:

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py seed_demo
.\.venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000
```

### 2. Set up and start the frontend

In the second PowerShell terminal:

```powershell
Set-Location 'D:\HCL EDUPLAY\frontend'
npm install
npm run dev
```

Open the Vite URL shown in the terminal (normally `http://localhost:5173`). Keep both backend and frontend terminals running while using the app.

### Optional teacher/admin account

To open Django admin locally, create an administrator account:

```powershell
Set-Location 'D:\HCL EDUPLAY\backend'
.\.venv\Scripts\python.exe manage.py createsuperuser
```

Then sign in at `http://127.0.0.1:8000/admin/`. Story-generation and publishing endpoints require a staff account and Django session authentication.

## Optional configuration

### Supabase authentication and PostgreSQL

The default setup uses SQLite and guest play; Supabase is not required. For Supabase Auth, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `frontend\.env`, and set `SUPABASE_URL` plus the backend-only `SUPABASE_JWT_SECRET` in `backend\.env`. Example files are provided as `.env.example`.

To use hosted Supabase PostgreSQL, set `DATABASE_URL` in `backend\.env` to the database connection string. A Supabase project URL and publishable/anon key are **not** PostgreSQL connection credentials. Never put a database password, service-role key, or JWT secret in frontend code or commit secrets to source control.

### AI story provider

Offline story generation is the default. To enable a compatible provider, set `STORY_AI_API_URL`, `STORY_AI_API_KEY`, and `STORY_AI_MODEL` in `backend\.env`. Keep the API key backend-only. Generated drafts still require staff review and approval.

## Tests and production build

Run backend tests:

```powershell
Set-Location 'D:\HCL EDUPLAY\backend'
.\.venv\Scripts\python.exe manage.py test learning
```

Run frontend tests and build:

```powershell
Set-Location 'D:\HCL EDUPLAY\frontend'
npm test
npm run build
```

The production frontend output is written to `frontend\dist`.

## Controls

| Input | Action |
| --- | --- |
| W / A / S / D | Move |
| Shift | Run |
| Space | Jump |
| Mouse drag | Rotate the camera |
| E | Enter/interact with a nearby building |
| Esc | Pause or resume |

Activity and practical tasks also provide on-screen controls for picking up, placing, pouring, mixing, measuring, and recording observations. All practicals are virtual; do not use real chemicals or equipment based on an in-game activity.

## Project layout

```text
backend/
  config/       Django settings and URL routing
  learning/     API, models, story engine, migrations, tests, and seed command
  db.sqlite3    Local demo database (created after migration)
frontend/
  src/          React screens, 3D worlds, API client, styles, and tests
  vite.config.js Development server and API proxy configuration
```

## Deployment notes

The local defaults are for development only. Before deployment, configure a strong `DJANGO_SECRET_KEY`, `DEBUG=False`, `LOCAL_DEMO_MODE=False`, `ALLOWED_HOSTS`, HTTPS/CORS settings, and a production database. Define and test appropriate access controls and Supabase Row Level Security policies before storing student data in a hosted project.
