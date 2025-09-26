"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../services/api';
import { Order } from '../types/order';

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-500 border-r-blue-500 border-b-blue-500 border-l-transparent"></div>
  </div>
);

const translateStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Pendente';
    case 'em_preparacao':
      return 'Em Preparação';
    case 'concluido':
      return 'Concluído';
    default:
      return status;
  }
};

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await api.get('/orders');
        setOrders(response.data.data);
      } catch (err) {
        console.error('Erro ao buscar pedidos:', err);
        setError('Não foi possível carregar a lista de pedidos.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Lista de Pedidos</h1>

      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-center text-red-500 font-medium">{error}</div>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum pedido encontrado.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ul className="divide-y divide-gray-200">
            {orders.map((order) => (
              <li key={order.id} className="py-4">
                <Link href={`/order/${order.id}`}>
                  <div className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-md transition-colors cursor-pointer">
                    <div>
                      <span className="font-semibold text-lg">Pedido #{order.id}</span>
                      <p className="text-gray-600">Cliente: {order.client}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'em_preparacao' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                      }`}>
                      {translateStatus(order.status)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-center mt-6">
        <Link href="/">
          <button className="text-blue-500 hover:underline">Voltar para a página inicial</button>
        </Link>
      </div>
    </div>
  );
};

export default OrdersPage;