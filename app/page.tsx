"use client";

import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { Product } from "./types/product";
import { getProducts, saveProducts } from "./lib/storage";
import { Toaster, toast } from "react-hot-toast";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(true); // 🌙 DARK MODE

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const saveProduct = (product: Product) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
      setEditingProduct(null);
      toast.success("Product updated!");
    } else {
      setProducts([...products, product]);
      toast.success("Product added!");
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Product deleted!");
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main
      className={`relative min-h-screen p-6 transition-all duration-300 ${
        dark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      {/* ✅ TOASTER */}
      <Toaster />

      {/* 🌙 TOGGLE BUTTON */}
      <button
        onClick={() => setDark(!dark)}
        className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-lg shadow-md hover:scale-105 transition"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* 🔥 HEADER */}
      <h1 className="text-4xl font-extrabold text-center mb-10 tracking-wide">
        Product Management Dashboard 🚀
      </h1>

      {/* 🔥 FORM CARD */}
      <div className="max-w-4xl mx-auto mb-10">
        <div
          className={`rounded-2xl p-6 shadow-xl ${
            dark
              ? "bg-white/10 backdrop-blur-lg border border-white/20"
              : "bg-white border border-gray-200"
          }`}
        >
          <ProductForm
            onSave={saveProduct}
            editingProduct={editingProduct}
          />
        </div>
      </div>

      {/* 🔍 SEARCH */}
      <div className="max-w-6xl mx-auto mb-4">
        <input
  type="text"
  placeholder="🔍 Search products..."
  className={`w-full p-3 rounded-xl outline-none border transition
    ${
      dark
        ? "bg-white/10 text-white placeholder-gray-300 border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        : "bg-white text-black placeholder-gray-500 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    }
  `}
  value={search ?? ""}
  onChange={(e) => setSearch(e.target.value)}
/>
      </div>

      {/* 🔥 LIST */}
      <div className="max-w-6xl mx-auto">
        <div
          className={`rounded-2xl p-6 shadow-lg ${
            dark
              ? "bg-white/5 backdrop-blur-lg border border-white/10"
              : "bg-white border border-gray-200"
          }`}
        >
          <ProductList
            products={filteredProducts}
            onDelete={deleteProduct}
            onEdit={setEditingProduct}
          />
        </div>
      </div>
    </main>
  );
}