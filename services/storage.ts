
import { Product, User, CartItem, Order } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

const KEYS = {
  PRODUCTS: 'babu_textiles_products',
  USER: 'babu_textiles_user',
  CART: 'babu_textiles_cart',
  ORDERS: 'babu_textiles_orders'
};

export const StorageService = {
  getProducts: (): Product[] => {
    const data = localStorage.getItem(KEYS.PRODUCTS);
    return data ? JSON.parse(data) : INITIAL_PRODUCTS;
  },
  saveProducts: (products: Product[]) => {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },
  getUser: (): User | null => {
    const data = localStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : null;
  },
  saveUser: (user: User | null) => {
    if (user) localStorage.setItem(KEYS.USER, JSON.stringify(user));
    else localStorage.removeItem(KEYS.USER);
  },
  getCart: (): CartItem[] => {
    const data = localStorage.getItem(KEYS.CART);
    return data ? JSON.parse(data) : [];
  },
  saveCart: (cart: CartItem[]) => {
    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
  },
  getOrders: (): Order[] => {
    const data = localStorage.getItem(KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },
  saveOrders: (orders: Order[]) => {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  }
};
