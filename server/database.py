from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

if not MONGO_URL:
    raise Exception("MONGO_URL manquant dans le .env")

client = AsyncIOMotorClient(MONGO_URL)
db = client["produits_db"]
products_collection = db["products"]