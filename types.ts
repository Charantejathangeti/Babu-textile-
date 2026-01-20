
export enum Category {
  SAREES = 'Sarees',
  HANDLOOM = 'Handloom',
  INNERWEAR = 'Innerwear',
  DRESS_MATERIALS = 'Dress Materials'
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  fabric: string;
  mrp: number;
  offerPrice?: number;
  stock: number;
  images: string[];
  description: string;
  isOffer?: boolean;
}

export interface User {
  id: string;
  name: string;
  mobile: string;
  address: string;
  state: 'Andhra Pradesh' | 'Telangana';
  isAdmin: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: (CartItem & { productName: string; price: number })[];
  total: number;
  status: 'Pending' | 'Confirmed' | 'Delivered';
  createdAt: number;
  whatsappSent: boolean;
}
