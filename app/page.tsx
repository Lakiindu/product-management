"use client";

import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { Product } from "./types/product";
import { getProducts, saveProducts } from "./lib/storage";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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
    } else {
      setProducts([...products, product]);
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 text-white">
      
      {/* 🔥 HEADER */}
      <h1 className="text-4xl font-extrabold text-center mb-10 tracking-wide">
        Product Dashboard 🚀
      </h1>

      {/* 🔥 FORM CARD (GLASS) */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
          <ProductForm 
            onSave={saveProduct} 
            editingProduct={editingProduct} 
          />
        </div>
      </div>

      {/* 🔥 LIST CARD (GLASS WRAPPER) */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg">
          <ProductList
            products={products}
            onDelete={deleteProduct}
            onEdit={setEditingProduct}
          />
        </div>
      </div>

    </main>
  );
}