import { Product } from "../types/product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  onDelete: (id: string) => void;
};

export default function ProductList({ products, onDelete }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onDelete={onDelete} />
      ))}
    </div>
  );
}