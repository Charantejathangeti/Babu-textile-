
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { StorageService } from '../services/storage';

interface Props {
  product: Product;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<Props> = ({ product, onAddToCart }) => {
  const isOutOfStock = product.stock <= 0;
  const discount = product.offerPrice 
    ? Math.round(((product.mrp - product.offerPrice) / product.mrp) * 100) 
    : 0;

  return (
    <div className="group bg-white border border-amber-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-store-maroon text-white text-[10px] font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-store-maroon px-4 py-2 font-bold rounded-full shadow-lg">OUT OF STOCK</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent flex justify-center space-x-2">
           <Link 
            to={`/product/${product.id}`}
            className="p-2 bg-white text-store-green rounded-full hover:bg-store-gold hover:text-white transition shadow-md"
          >
            <Eye className="h-5 w-5" />
          </Link>
          <button 
            disabled={isOutOfStock}
            onClick={(e) => {
              e.preventDefault();
              onAddToCart?.();
            }}
            className={`p-2 bg-store-gold text-white rounded-full hover:bg-store-maroon transition shadow-md ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="p-4 space-y-1">
        <p className="text-[10px] text-store-gold font-bold uppercase tracking-widest">{product.category}</p>
        <h3 className="text-sm font-semibold text-store-green line-clamp-1 group-hover:text-store-maroon transition">{product.name}</h3>
        <div className="flex items-center space-x-2 mt-2">
          {product.offerPrice ? (
            <>
              <span className="text-lg font-bold text-store-maroon">₹{product.offerPrice.toLocaleString('en-IN')}</span>
              <span className="text-xs text-gray-400 line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-store-green">₹{product.mrp.toLocaleString('en-IN')}</span>
          )}
        </div>
        <div className="pt-2 flex justify-between items-center border-t border-amber-50">
          <span className={`text-[10px] font-medium ${product.stock < 5 ? 'text-red-500' : 'text-gray-500'}`}>
            {isOutOfStock ? 'No stock' : product.stock < 5 ? `Only ${product.stock} left!` : 'In Stock'}
          </span>
          <span className="text-[10px] text-gray-400 italic">{product.fabric}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
