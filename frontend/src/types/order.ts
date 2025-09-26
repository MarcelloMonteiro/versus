
export interface OrderProduct {
  id: number;
  name: string;
  amount: number;
  price: string;
}

export interface Order {
  id: number;
  client: string;
  status: 'pending' | 'em_preparacao' | 'concluido' | 'cancelado';
  created_at: string;
  updated_at: string;
  products: OrderProduct[];
  _links: {
    self: string;
    update_status: string;
    all_orders: string;
  };
}

export interface NewOrder {
  client: string;
  products: { id: number; amount: number; price: number }[];
}