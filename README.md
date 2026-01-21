# Full-Stack Application

A full-stack web application built with FastAPI (Python) backend and React + TypeScript frontend.

## Project Structure

```
.
├── backend/          # FastAPI backend
│   ├── app/
│   │   ├── api/      # API routes
│   │   ├── models/   # Database models
│   │   ├── schemas/  # Pydantic schemas
│   │   └── services/ # Business logic
│   └── tests/        # Backend tests
├── frontend/         # React + TypeScript frontend
│   └── src/
│       ├── components/
│       └── services/
└── docker-compose.yml
```

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 20+
- Docker and Docker Compose (optional)

### Local Development

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

Backend will run on http://localhost:8000

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on http://localhost:5173

### Docker Development

```bash
docker-compose up --build
```

Services:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Database: localhost:5432

## Testing

### Backend Tests

```bash
cd backend
pytest
```

### Frontend Tests

```bash
cd frontend
npm test
```

## API Documentation

FastAPI provides automatic interactive API documentation:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
