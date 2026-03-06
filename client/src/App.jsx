import { useState, useEffect } from "react";
import { getProducts, addProduct } from "./api/product";
import ProductList from "./components/ProductList";
import AddProductForm from "./components/AddProductForm";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // READ — au chargement de la page
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Impossible de charger les produits");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ADD — ajouter et mettre à jour la liste sans recharger
  const handleAdd = async (newProduct) => {
    try {
      const created = await addProduct(newProduct);
      setProducts((prev) => [...prev, created]); // ← pas de GET, on ajoute direct
    } catch (err) {
      setError("Impossible d'ajouter le produit");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des produits</h1>
      <AddProductForm onAdd={handleAdd} />
      <ProductList products={products} />
    </div>
  );
}
