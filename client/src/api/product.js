const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Récupérer tous les produits
export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error("Erreur lors de la récupération");
  return res.json();
};

// Ajouter un produit
export const addProduct = async (product) => {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Erreur lors de l'ajout");
  return res.json();
};
