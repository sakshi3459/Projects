from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import health, birthday

app = FastAPI(
    title="FastAPI Backend",
    description="Full-stack application backend API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(birthday.router, prefix="/api/birthday", tags=["birthday"])

@app.get("/")
async def root():
    return {"message": "Welcome to the API"}
