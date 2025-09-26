"use client";

import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';
import { Product } from '../types/product';
import { NewOrder, OrderProduct } from '../types/order';

const ButtonSpinner: React.FC = () => (
  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
);

interface OrderFormProps {
  products: Product[];
}

const OrderForm: React.FC<OrderFormProps> = ({ products }) => {
  const [client, setClient] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<OrderProduct[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleProductSelection = (product: Product, amount: number) => {
    const existingIndex = selectedProducts.findIndex((p) => p.id === product.id);
    const orderProduct: OrderProduct = { id: product.id, amount, price: parseFloat(product.price) };

    if (existingIndex > -1) {
      const updatedProducts = [...selectedProducts];
      updatedProducts[existingIndex] = orderProduct;
      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts([...selectedProducts, orderProduct]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const orderData: NewOrder = {
      client,
      products: selectedProducts.filter(p => p.amount > 0),
    };

    if (orderData.products.length === 0) {
      alert('Selecione pelo menos um produto para criar o pedido.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await api.post('/orders', orderData);
      const newOrder = response.data.data;
      alert(`Pedido criado com sucesso! ID: ${newOrder.id}`);
      router.push(`/orders`);
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      alert('Erro ao criar pedido. Verifique os dados e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col">
        <label htmlFor="client" className="mb-1 text-sm font-medium">Cliente:</label>
        <input
          id="client"
          type="text"
          placeholder="Nome do cliente"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Produtos</h2>
        <ul className="divide-y divide-gray-200">
          {products.length === 0 ? (
            <li className="py-2 text-gray-500">Nenhum produto disponível.</li>
          ) : (
            products.map((product) => (
              <li key={product.id} className="flex justify-between items-center py-2">
                <span className="text-md">
                  {product.name} - R$ {product.price}
                </span>
                <input
                  type="number"
                  min="0"
                  defaultValue="0"
                  onChange={(e) => handleProductSelection(product, parseInt(e.target.value, 10))}
                  className="w-20 p-2 border border-gray-300 rounded-md text-center"
                />
              </li>
            ))
          )}
        </ul>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full text-white px-4 py-2 rounded-md transition-colors font-semibold flex items-center justify-center space-x-2 ${
          isSubmitting ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isSubmitting ? (
          <>
            <ButtonSpinner />
            <span>Criando...</span>
          </>
        ) : (
          <span>Finalizar Pedido</span>
        )}
      </button>
    </form>
  );
};

export default OrderForm;