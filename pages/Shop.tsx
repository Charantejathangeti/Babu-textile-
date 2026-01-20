
import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { StorageService } from '../services/storage';
import { Category, Product, CartItem } from '../types';
import ProductCard from '../components/ProductCard';

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>(StorageService.getProducts());
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.fabric.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    const cart = StorageService.getCart();
    const existing = cart.find(item => item.productId === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ productId: product.id, quantity: 1 });
    }
    StorageService.saveCart(cart);
    window.dispatchEvent(new Event('storage')); // Trigger navbar update
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-serif text-store-green uppercase tracking-wider">The Babu’s Collection</h1>
        <div className="w-24 h-1 bg-store-gold mx-auto"></div>
        <p className="text-gray-500 max-w-lg mx-auto italic">Explore a range of exquisite handlooms and quality innerwear curated for the modern South Indian family.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between sticky top-24 z-30 bg-store-cream/90 backdrop-blur-md py-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input 
            type="text"
            placeholder="Search sarees, fabrics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-store-gold focus:border-transparent shadow-sm"
          />
        </div>
        
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
          <button 
            onClick={() => setSelectedCategory('All')}
            className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${selectedCategory === 'All' ? 'bg-store-green text-white' : 'bg-white text-store-green border border-amber-200 hover:border-store-gold'}`}
          >
            All Items
          </button>
          {Object.values(Category).map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${selectedCategory === cat ? 'bg-store-green text-white' : 'bg-white text-store-green border border-amber-200 hover:border-store-gold'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={() => addToCart(p)} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-4">
            <Filter className="h-16 w-16 text-gray-300 mx-auto" />
            <h3 className="text-xl text-gray-500 font-serif">No products found matching your search.</h3>
            <button onClick={() => {setSearchQuery(''); setSelectedCategory('All')}} className="text-store-gold font-bold underline">Clear All Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
