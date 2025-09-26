import Link from 'next/link';
import { Product } from '../types/product';
import api from '../services/api';

interface ProductListProps {
  products: Product[];
  onProductAction: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onProductAction }) => {
  const handleDelete = async (productId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await api.delete(`/products/${productId}`);
        alert('Produto excluído com sucesso!');
        onProductAction();
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto.');
      }
    }
  };

  return (
    <ul className="divide-y divide-gray-200">
      {products.length === 0 ? (
        <li className="py-4 text-center text-gray-500">Nenhum produto cadastrado.</li>
      ) : (
        products.map((product) => (
          <li key={product.id} className="flex justify-between items-center py-4">
            <span className="text-lg">
              {product.name} - R$ {product.price}
            </span>
            <div className="space-x-2">
              <Link href={`/products/edit/${product.id}/page`}>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors text-sm">
                  Editar
                </button>
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors text-sm"
              >
                Excluir
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default ProductList;