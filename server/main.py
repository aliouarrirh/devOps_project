from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import client

app = FastAPI()

# CORS pour React en local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Vérifie la connexion MongoDB au démarrage
@app.on_event("startup")
async def startup_db():
    try:
        await client.admin.command("ping")
        print("✅ Connecté à MongoDB Atlas")
    except Exception as e:
        print(f"❌ Erreur MongoDB : {e}")

@app.get("/")
async def root():
    return {"message": "API en ligne"}