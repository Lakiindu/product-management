"use client";

import { useState } from "react";
import { Product } from "../types/product";

type Props = {
  onAdd: (product: Product) => void;
};

export default function ProductForm({ onAdd }: Props) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: Product = {
      id: Date.now().toString(),
      name: form.name,
      price: Number(form.price),
      description: form.description,
      image: form.image,
    };

    onAdd(newProduct);

    setForm({ name: "", price: "", description: "", image: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-3"
    >
      <input
        placeholder="Product Name"
        className="w-full border p-2 rounded"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Price"
        type="number"
        className="w-full border p-2 rounded"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <textarea
        placeholder="Description"
        className="w-full border p-2 rounded"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        placeholder="Image URL"
        className="w-full border p-2 rounded"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Add Product
      </button>
    </form>
  );
}