# SCATP Platform

This repository includes:

- A Next.js marketing site (`/src`)
- A Django + DRF backend (`/backend`) for secure request intake and admin operations

## Frontend Setup (Next.js)

```bash
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_BASE_URL` in your frontend `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## Backend Setup (Django)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 8000
```

### API Endpoints

- `POST /api/requests/` (public): submit a request
- `GET /api/requests/` (admin only): list requests
- `PATCH /api/requests/{id}/` (admin only): update status/notes

### Admin Dashboard (custom UI)

- Login: `http://localhost:8000/dashboard/login/`
- List + filter + search + sort: `http://localhost:8000/dashboard/`
- Detail + status updates: `http://localhost:8000/dashboard/requests/{id}/`

## Security Notes

- Env-based secrets and host config in `backend/.env`
- CORS + CSRF trusted origins configurable via env vars
- Request payload validation/sanitization in DRF serializers
- Basic throttle/rate limits on submission endpoint
