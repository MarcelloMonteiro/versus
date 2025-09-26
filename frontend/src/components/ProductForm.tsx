"use client";

import { useState } from 'react';
import api from '../services/api';
import { NewProduct } from '../types/product';

const ButtonSpinner: React.FC = () => (
  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
);

interface ProductFormProps {
  onProductAdded: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newProduct: NewProduct = { name, price, category };
      await api.post('/products', newProduct);
      onProductAdded();
      setName('');
      setPrice(0);
      setCategory('');
      alert('Produto adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      alert('Erro ao adicionar produto.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 text-sm font-medium">Nome:</label>
        <input
          id="name"
          type="text"
          placeholder="Nome do produto"
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
          placeholder="Preço (ex: 99.99)"
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
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full text-white px-4 py-2 rounded-md transition-colors font-semibold flex items-center justify-center space-x-2 ${
          isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isSubmitting ? (
          <>
            <ButtonSpinner />
            <span>Adicionando...</span>
          </>
        ) : (
          <span>Adicionar Produto</span>
        )}
      </button>
    </form>
  );
};

export default ProductForm;