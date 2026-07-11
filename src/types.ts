export type PizzaSize = 'pequena' | 'media' | 'grande';

export type ProductCategory = 'pizza' | 'bebida';

export interface PizzaItem {
  id: string;
  name: string;
  description: string;
  image: string;
  prices: {
    pequena: number;
    media: number;
    grande: number;
  };
  isSweet?: boolean;
}

export interface DrinkItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

export interface CartItem {
  id: string; // for pizzas, 'productId-size'; for drinks, 'productId'
  productId: string;
  name: string;
  category: ProductCategory;
  size?: PizzaSize;
  price: number;
  quantity: number;
  image: string;
}

export type PaymentMethod = 'pix' | 'credito' | 'debito' | 'dinheiro';

export interface OrderDetails {
  nome: string;
  telefone: string;
  endereco: string;
  complemento: string;
  bairro: string;
  observacoes: string;
  formaPagamento: PaymentMethod;
  trocoPara?: string;
}
