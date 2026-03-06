import { Card, CardContent } from "@/components/ui/card";

export default function ProductList({ products }) {
  if (products.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-4">
        Aucun produit pour l'instant
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <Card key={product.id}>
          <CardContent className="flex justify-between items-center p-4">
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-gray-500">{product.description}</p>
            </div>
            <span className="font-bold text-green-600">{product.price} €</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
