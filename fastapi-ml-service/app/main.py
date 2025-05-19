
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import analysis

app = FastAPI(
    title="ML Analysis API",
    description="API for machine learning analysis integrated with Supabase",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(analysis.router)

@app.get("/")
async def root():
    return {"message": "Welcome to ML Analysis API"}
