import { Product } from "../types/product";

type Props = {
  product: Product;
  onDelete: (id: string) => void;
};

export default function ProductCard({ product, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
      <img
        src={product.image}
        className="h-40 w-full object-cover rounded"
      />

      <h2 className="font-bold mt-2">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
      <p className="text-sm text-gray-500">{product.description}</p>

      <button
        onClick={() => onDelete(product.id)}
        className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
}