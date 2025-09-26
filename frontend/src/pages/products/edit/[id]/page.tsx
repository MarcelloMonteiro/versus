"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../../../../services/api';
import { Product } from '../../../../types/product';

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-500 border-r-blue-500 border-b-blue-500 border-l-transparent"></div>
  </div>
);

const EditProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          setLoading(true); // Inicia o carregamento
          const response = await api.get(`/products/${id}`);
          const productData = response.data.data;
          setProduct(productData);
          setName(productData.name);
          setPrice(parseFloat(productData.price));
          setCategory(productData.category);
        } catch (error) {
          console.error('Erro ao buscar produto:', error);
          alert('Não foi possível carregar os dados do produto.');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    try {
      const updatedProduct = { name, price, category };
      await api.patch(`/products/${id}`, updatedProduct);
      alert('Produto atualizado com sucesso!');
      router.push('/'); 
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      alert('Erro ao atualizar produto.');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Spinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        <h1 className="text-2xl font-bold">Produto não encontrado.</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Editar Produto: {product.name}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm font-medium">Nome:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="mb-1 text-sm font-medium">Preço:</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            step="0.01"
            required
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="mb-1 text-sm font-medium">Categoria:</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors font-semibold"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;