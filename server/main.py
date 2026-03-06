from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from database import client, products_collection
from models import Product

app = FastAPI()

# CORS pour React en local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper — convertit un doc MongoDB en dict propre
def product_helper(product) -> dict:
    return {
        "id": str(product["_id"]),
        "name": product["name"],
        "price": product["price"],
        "description": product.get("description"),
    }

# Vérif connexion MongoDB au démarrage
@app.on_event("startup")
async def startup_db():
    try:
        await client.admin.command("ping")
        print("Connecté à MongoDB Atlas")
    except Exception as e:
        print(f"Erreur MongoDB : {e}")

# ─────────────────────────────────────────
# GET /products — récupérer tous les produits
# ─────────────────────────────────────────
@app.get("/products")
async def get_products():
    products = []
    async for product in products_collection.find():
        products.append(product_helper(product))
    return products

# ─────────────────────────────────────────
# POST /products — ajouter un produit
# ─────────────────────────────────────────
@app.post("/products", status_code=201)
async def create_product(product: Product):
    result = await products_collection.insert_one(product.dict())
    new_product = await products_collection.find_one({"_id": result.inserted_id})
    return product_helper(new_product)
