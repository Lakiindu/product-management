import { Product } from "../types/product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
};

export default function ProductList({ products, onDelete, onEdit }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onDelete={onDelete}
          onEdit={onEdit}   // ✅ pass real function
        />
      ))}
    </div>
  );
}