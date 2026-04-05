"use client";

import { useState, useEffect } from "react";
import { Product } from "../types/product";

type Props = {
  onSave: (product: Product) => void;
  editingProduct: Product | null;
};

export default function ProductForm({ onSave, editingProduct }: Props) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        price: editingProduct.price.toString(),
        description: editingProduct.description,
        image: editingProduct.image,
      });
    }
  }, [editingProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const product: Product = {
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      name: form.name,
      price: Number(form.price),
      description: form.description,
      image: form.image,
    };

    onSave(product);

    setForm({ name: "", price: "", description: "", image: "" });
  };

  return (
    <form
      className="bg-white/80 text-black backdrop-blur p-6 rounded-2xl shadow-lg space-y-3"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold">
        {editingProduct ? "Edit Product ✏️" : "Add Product ➕"}
      </h2>

      {/* NAME */}
      <input
        placeholder="Product Name"
        className="w-full border p-2 rounded text-black placeholder-gray-500"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      {/* PRICE */}
      <input
        type="number"
        placeholder="Price"
        className="w-full border p-2 rounded text-black placeholder-gray-500"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Description"
        className="w-full border p-2 rounded text-black placeholder-gray-500"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* IMAGE */}
      <input
        placeholder="Image URL"
        className="w-full border p-2 rounded text-black placeholder-gray-500"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      {/* BUTTON */}
      <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:scale-[1.02] transition">
        {editingProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}