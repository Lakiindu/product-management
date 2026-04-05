import { Product } from "../types/product";

type Props = {
  product: Product;
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
};

export default function ProductCard({ product, onDelete, onEdit }: Props) {
  return (
    <div className="bg-white text-black rounded-2xl shadow-md p-4 hover:scale-105 hover:shadow-xl transition duration-300">
      
      {/* ✅ IMAGE WITH FALLBACK */}
      <img
        src={product.image || "https://via.placeholder.com/300"}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://via.placeholder.com/300";
        }}
        className="h-40 w-full object-cover rounded-lg"
        alt={product.name}
      />

      {/* ✅ TITLE */}
      <h2 className="font-bold mt-3 text-lg">{product.name}</h2>

      {/* ✅ PRICE */}
      <p className="text-blue-600 font-semibold">${product.price}</p>

      {/* ✅ DESCRIPTION */}
      <p className="text-sm text-gray-500 line-clamp-2">
        {product.description}
      </p>

      {/* ✅ ACTION BUTTONS */}
      <div className="flex gap-2 mt-4">
        
        <button
          onClick={() => onEdit(product)}
          className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-lg transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(product.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
        >
          Delete
        </button>

      </div>
    </div>
  );
}