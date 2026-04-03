import { Product } from "../types/product";

const KEY = "products";

export const getProducts = (): Product[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(KEY, JSON.stringify(products));
};