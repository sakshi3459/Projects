# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack web application with FastAPI backend and React + TypeScript frontend. The backend uses SQLAlchemy for database operations and Pydantic for data validation. The frontend uses Vite as the build tool and Axios for API communication.

## Development Commands

### Backend (FastAPI)

```bash
# Setup
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env

# Run development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Run tests
pytest

# Run tests with coverage
pytest --cov=app tests/

# Run specific test file
pytest tests/test_health.py

# Run specific test
pytest tests/test_health.py::test_health_check
```

### Frontend (React + TypeScript)

```bash
# Setup
cd frontend
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Docker

```bash
# Start all services
docker-compose up

# Start with rebuild
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f [service_name]
```

## Architecture

### Backend Structure

- **app/api/**: API route handlers organized by resource. Each module exports a router that is included in main.py
- **app/models/**: SQLAlchemy ORM models representing database tables
- **app/schemas/**: Pydantic models for request/response validation and serialization
- **app/services/**: Business logic layer that sits between API routes and models
- **app/config.py**: Application configuration using pydantic-settings, loads from .env
- **app/main.py**: FastAPI application entry point, includes routers and middleware
- **tests/**: Backend tests using pytest and TestClient

### Frontend Structure

- **src/components/**: Reusable React components
- **src/services/**: API client configuration and service functions
- **src/services/api.ts**: Axios instance configured with base URL and interceptors
- **vite.config.ts**: Vite configuration with proxy setup to backend (/api -> http://localhost:8000)

### API Communication

- Frontend proxies `/api` requests to backend at `http://localhost:8000`
- Backend enables CORS for `http://localhost:5173` (Vite dev server)
- All API calls go through the centralized axios client in `frontend/src/services/api.ts`

### Database

- PostgreSQL is used in production (via Docker)
- Connection string configured in backend/.env as DATABASE_URL
- SQLAlchemy handles ORM and migrations via Alembic (when set up)

## Key Patterns

### Adding a New API Endpoint

1. Create route handler in `backend/app/api/[resource].py`:
```python
from fastapi import APIRouter

router = APIRouter()

@router.get("/items")
async def get_items():
    return {"items": []}
```

2. Include router in `backend/app/main.py`:
```python
from app.api import items

app.include_router(items.router, prefix="/api", tags=["items"])
```

3. Call from frontend using the API client:
```typescript
import { apiClient } from './services/api'

const response = await apiClient.get('/items')
```

### Adding Database Models

1. Create model in `backend/app/models/`:
```python
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True)
    name = Column(String)
```

2. Create corresponding Pydantic schema in `backend/app/schemas/`:
```python
from pydantic import BaseModel

class ItemBase(BaseModel):
    name: str

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int

    class Config:
        from_attributes = True
```

### Environment Variables

Backend configuration is loaded from `.env` file via `app/config.py`. Never commit `.env` files. Always update `.env.example` when adding new required variables.

## Testing

### Backend Testing

- Use `TestClient` from fastapi.testclient for API tests
- Tests are in `backend/tests/` directory
- Follow naming convention: `test_*.py` for files, `test_*` for functions
- Use pytest fixtures for common setup

### Frontend Testing

- Vitest is configured for unit and component tests
- Test files should be named `*.test.ts` or `*.test.tsx`
- Place tests next to the components they test

## Port Configuration

- Frontend dev server: 5173
- Backend API: 8000
- PostgreSQL: 5432
- API docs: http://localhost:8000/docs (Swagger UI)
- API docs: http://localhost:8000/redoc (ReDoc)
