"use client";

import { useRouter } from 'next/router';
import api from '../../services/api';
import useOrderPolling from '../../hooks/useOrderPolling';
import { OrderProduct } from '../../types/order';
import Link from 'next/link';

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-500 border-r-blue-500 border-b-blue-500 border-l-transparent"></div>
  </div>
);

const OrderDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { order, loading, error, fetchOrder } = useOrderPolling(id);

  const handleUpdateStatus = async () => {
    if (!order) return;
    try {
      await api.patch(order._links.update_status, { status: 'concluido' });
      alert('Status do pedido atualizado para "concluido"!');
      if (id) {
        fetchOrder(id as string);
      }
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      alert('Não foi possível atualizar o status do pedido.');
    }
  };

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

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        <h1 className="text-2xl font-bold">{error}</h1>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        <h1 className="text-2xl font-bold">Pedido não encontrado.</h1>
      </div>
    );
  }

  const isButtonDisabled = order.status !== 'em_preparacao';

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Detalhes do Pedido #{order.id}</h1>
      <div className="space-y-4 p-6 bg-white rounded-lg shadow-lg">
        <p className="text-lg">
          <strong className="font-semibold">Cliente:</strong> {order.client}
        </p>
        <p className="text-lg flex items-center">
          <strong className="font-semibold">Status:</strong>
          <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              order.status === 'em_preparacao' ? 'bg-blue-100 text-blue-800' :
                order.status === 'concluido' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
            }`}>
            {translateStatus(order.status)}
          </span>
        </p>

        {order.status !== 'concluido' && (
          <button
            onClick={handleUpdateStatus}
            disabled={isButtonDisabled}
            className={`w-full text-white px-4 py-2 rounded-md font-semibold ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 transition-colors'
              }`}
          >
            Marcar como Concluído
          </button>
        )}

        <h3 className="text-xl font-semibold mt-6">Produtos:</h3>
        <ul className="divide-y divide-gray-200">
          {order.products.map((product: OrderProduct) => (
            <li key={product.id} className="py-2">
              <span className="font-medium">{product.name}</span>
              <p className="text-gray-600 text-sm">
                Quantidade: {product.amount} - Preço: R$ {product.price}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-center mt-6">
        <Link href="/orders">
          <button className="text-blue-500 hover:underline">Voltar para lista de pedidos</button>
        </Link>
      </div>
    </div>
  );
};

export default OrderDetailsPage;