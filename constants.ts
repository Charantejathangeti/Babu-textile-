
import { Category, Product } from './types';

export const STORE_NAME = "Babu’s Textiles";
export const STORE_WHATSAPP = "6302382280";
export const STORE_LOCATION = "Tirupati, Andhra Pradesh";
export const GSTIN = "37KIIPS3966M1Z3";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Kanchipuram Silk Saree - Emerald Gold',
    category: Category.SAREES,
    fabric: 'Pure Silk',
    mrp: 12500,
    offerPrice: 8999,
    stock: 5,
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format&fit=crop'],
    description: 'Authentic Kanchipuram silk saree with rich zari border and intricate floral motifs. Perfect for weddings and grand festive occasions.',
    isOffer: true
  },
  {
    id: '2',
    name: 'Gadwal Handloom Cotton Saree',
    category: Category.HANDLOOM,
    fabric: 'Cotton Silk Blend',
    mrp: 4500,
    offerPrice: 3200,
    stock: 12,
    images: ['https://images.unsplash.com/photo-1610030469668-935142b96fe4?q=80&w=1974&auto=format&fit=crop'],
    description: 'Traditional Gadwal handloom saree with contrasting silk border and elegant pallu. Lightweight and easy to drape.',
    isOffer: false
  },
  {
    id: '3',
    name: 'Premium Cotton Innerwear Set',
    category: Category.INNERWEAR,
    fabric: 'Combed Cotton',
    mrp: 999,
    offerPrice: 799,
    stock: 50,
    images: ['https://images.unsplash.com/photo-1594932224828-b4b059b6f6f1?q=80&w=2080&auto=format&fit=crop'],
    description: 'High-quality breathable cotton innerwear for everyday comfort. Made from 100% organic cotton.',
    isOffer: false
  },
  {
    id: '4',
    name: 'Pochampally Ikkat Dress Material',
    category: Category.DRESS_MATERIALS,
    fabric: 'Handloom Cotton',
    mrp: 2200,
    stock: 8,
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=2080&auto=format&fit=crop'],
    description: 'Classic Pochampally Ikkat pattern hand-woven dress material from Telangana weavers. Unstitched fabric with dupatta.',
    isOffer: false
  }
];
