"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/services/api';
import { Product } from '@/types/product';
import OrderForm from '@/components/OrderForm';

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-500 border-r-blue-500 border-b-blue-500 border-l-transparent"></div>
  </div>
);

const CreateOrderPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Criar Novo Pedido</h1>

      {loading ? (
        <Spinner />
      ) : (
        <OrderForm products={products} />
      )}

      <div className="text-center mt-6">
        <Link href="/">
          <button className="text-blue-500 hover:underline">Voltar para a página inicial</button>
        </Link>
      </div>
    </div>
  );
};

export default CreateOrderPage;