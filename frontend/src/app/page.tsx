"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../services/api';
import { Product } from '../types/product';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-500 border-r-blue-500 border-b-blue-500 border-l-transparent"></div>
  </div>
);

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAction = () => {
    fetchProducts();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Lista de Produtos</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {showAddForm ? 'Cancelar' : 'Adicionar Novo Produto'}
          </button>
          <Link href="/order/page">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
              Criar Novo Pedido
            </button>
          </Link>
          <Link href="/orders">
            <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors">
              Ver Pedidos
            </button>
          </Link>
        </div>
      </div>

      {showAddForm && (
        <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <ProductForm onProductAdded={handleProductAction} />
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ProductList products={products} onProductAction={handleProductAction} />
        </div>
      )}
    </div>
  );
};

export default HomePage;