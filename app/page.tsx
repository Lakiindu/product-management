"use client";

import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { Product } from "./types/product";
import { getProducts, saveProducts } from "./lib/storage";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Product Management Dashboard 🚀
      </h1>

      <div className="max-w-xl mx-auto">
        <ProductForm onAdd={addProduct} />
      </div>

      <ProductList products={products} onDelete={deleteProduct} />
    </main>
  );
}