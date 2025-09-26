import { useState, useEffect } from 'react';
import api from '../services/api';
import { Order } from '../types/order';

interface UseOrderPollingResult {
  order: Order | null;
  loading: boolean;
  error: string | null;
  fetchOrder: (orderId: string) => void;
}

const useOrderPolling = (orderId: string | string[] | undefined): UseOrderPollingResult => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async (id: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar detalhes do pedido:', err);
      setError('Não foi possível carregar os detalhes do pedido.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!orderId || Array.isArray(orderId)) {
      setLoading(false);
      return;
    }
    const id = orderId as string;
    fetchOrder(id);
    const interval = setInterval(() => {
      fetchOrder(id);
    }, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  return { order, loading, error, fetchOrder };
};

export default useOrderPolling;