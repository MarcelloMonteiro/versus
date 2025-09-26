export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  created_at: string;
  updated_at: string;
  _links: {
    self: string;
    update: string;
    delete: string;
    all_products: string;
  };
}

export interface NewProduct {
  name: string;
  price: number;
  category: string;
}