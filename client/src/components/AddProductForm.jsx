import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddProductForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price) return; // validation basique

    setSubmitting(true);
    await onAdd({ ...form, price: parseFloat(form.price) });
    setForm({ name: "", price: "", description: "" }); // reset le form
    setSubmitting(false);
  };

  return (
    <div className="border rounded-lg p-4 mb-6 space-y-4">
      <h2 className="font-semibold">Ajouter un produit</h2>

      <div className="space-y-2">
        <Label>Nom</Label>
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ex: Chaise"
        />
      </div>

      <div className="space-y-2">
        <Label>Prix (€)</Label>
        <Input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Ex: 29.99"
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Optionnel"
        />
      </div>

      <Button onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Ajout..." : "Ajouter"}
      </Button>
    </div>
  );
}
