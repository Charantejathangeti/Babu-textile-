
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, ShieldCheck, PhoneCall } from 'lucide-react';
import { StorageService } from '../services/storage';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const products = StorageService.getProducts().slice(0, 4);

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-store-green">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-60 mix-blend-multiply" 
            alt="Lord Venkateswara - Tirumala Heritage"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-store-cream">
          <div className="max-w-2xl space-y-6">
            <h2 className="text-store-gold font-serif text-xl tracking-[0.3em] animate-pulse">DIVINE TRADITIONS</h2>
            <h1 className="text-5xl md:text-7xl font-serif leading-tight">Authentic Handlooms from <span className="text-store-gold italic">Tirupati</span></h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed font-light">
              Blessed by the sacred hills of Tirumala. Experience the finest Kanchipuram Silks and traditional weaves that carry the legacy of our temple town.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/shop" className="bg-store-gold text-white px-8 py-4 rounded-md font-bold text-center hover:bg-amber-800 transition flex items-center justify-center gap-2 shadow-lg shadow-black/30">
                BROWSE COLLECTION <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/contact" className="backdrop-blur-md border-2 border-store-gold/50 text-white px-8 py-4 rounded-md font-bold text-center hover:bg-store-gold hover:text-white transition">
                VISIT STORE
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-store-cream to-transparent z-10"></div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 bg-white rounded-3xl shadow-xl border border-amber-50">
          <div className="flex flex-col items-center text-center space-y-2 border-r border-amber-50 last:border-0">
            <div className="p-3 bg-amber-50 rounded-full text-store-gold">
              <Star className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-store-green text-sm">Divine Quality</h4>
            <p className="text-xs text-gray-500">Pure Pattu & Handloom</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2 border-r border-amber-50 last:border-0">
            <div className="p-3 bg-amber-50 rounded-full text-store-gold">
              <Truck className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-store-green text-sm">Express Shipping</h4>
            <p className="text-xs text-gray-500">Fast AP & TG Delivery</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2 border-r border-amber-50 last:border-0">
            <div className="p-3 bg-amber-50 rounded-full text-store-gold">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-store-green text-sm">Trusted Legacy</h4>
            <p className="text-xs text-gray-500">Retail & Wholesale</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2 border-r border-amber-50 last:border-0">
            <div className="p-3 bg-amber-50 rounded-full text-store-gold">
              <PhoneCall className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-store-green text-sm">WhatsApp Order</h4>
            <p className="text-xs text-gray-500">Direct Personal Support</p>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-store-gold pb-6">
          <div>
            <span className="text-store-gold font-bold text-xs uppercase tracking-widest">Hand-Picked Selection</span>
            <h2 className="text-4xl font-serif text-store-maroon mt-1">Festive New Arrivals</h2>
          </div>
          <Link to="/shop" className="text-store-gold font-bold flex items-center gap-1 hover:text-store-maroon transition mt-4 md:mt-0">
            EXPLORE THE FULL CATALOG <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={() => alert('Added to cart!')} />
          ))}
        </div>
      </section>

      {/* State Callout */}
      <section className="relative bg-store-maroon text-store-cream py-24 overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=2070&auto=format&fit=crop" 
            className="w-[800px] grayscale invert" 
            alt="Temple Silhouette" 
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-5xl font-serif tracking-wide">Serving Andhra Pradesh & Telangana</h2>
          <p className="text-2xl max-w-3xl mx-auto font-light opacity-90 italic">
            "Carrying the spiritual essence of Tirupati to every home in the Telugu states."
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 pt-6">
             <div className="border-2 border-store-gold px-10 py-4 rounded-full bg-white/5 backdrop-blur-sm font-bold tracking-widest">ANDHRA PRADESH</div>
             <div className="border-2 border-store-gold px-10 py-4 rounded-full bg-white/5 backdrop-blur-sm font-bold tracking-widest">TELANGANA</div>
          </div>
          <p className="text-xs text-store-gold font-bold uppercase tracking-widest pt-4 underline cursor-pointer">View Delivery Zones</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
