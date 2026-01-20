
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { STORE_NAME, STORE_LOCATION, STORE_WHATSAPP, GSTIN } from './constants';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="bg-store-green text-store-cream pt-20 pb-10 border-t-8 border-store-gold">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Link to="/" className="flex flex-col">
            <span className="font-serif text-3xl font-bold text-store-gold">BABU’S</span>
            <span className="text-sm uppercase tracking-[0.4em] -mt-1 opacity-70">Textiles</span>
          </Link>
          <p className="text-sm opacity-80 leading-relaxed font-light">
            Bringing the authentic handloom heritage of Andhra Pradesh and Telangana to your wardrobe since 1995. Quality and trust in every thread.
          </p>
          <div className="flex space-x-4">
            <Instagram className="h-5 w-5 cursor-pointer hover:text-store-gold transition" />
            <Facebook className="h-5 w-5 cursor-pointer hover:text-store-gold transition" />
            <Mail className="h-5 w-5 cursor-pointer hover:text-store-gold transition" />
          </div>
        </div>
        <div>
          <h4 className="font-serif text-lg text-store-gold mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm font-light opacity-80">
            <li><Link to="/shop" className="hover:text-store-gold transition">Shop All Collections</Link></li>
            <li><Link to="/about" className="hover:text-store-gold transition">Our Weaver Story</Link></li>
            <li><Link to="/bulk" className="hover:text-store-gold transition">Wholesale Inquiries</Link></li>
            <li><Link to="/terms" className="hover:text-store-gold transition">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-lg text-store-gold mb-6">Support</h4>
          <ul className="space-y-3 text-sm font-light opacity-80">
            <li><Link to="/track" className="hover:text-store-gold transition">Track My Order</Link></li>
            <li><Link to="/faq" className="hover:text-store-gold transition">FAQs</Link></li>
            <li><Link to="/returns" className="hover:text-store-gold transition">Shipping Policy</Link></li>
            <li><Link to="/contact" className="hover:text-store-gold transition">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-lg text-store-gold mb-6">Visit Store</h4>
          <ul className="space-y-4 text-sm font-light opacity-80">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-store-gold flex-shrink-0" />
              <span>{STORE_LOCATION}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-store-gold flex-shrink-0" />
              <span>+91 {STORE_WHATSAPP}</span>
            </li>
            <li className="pt-2 text-xs opacity-60">
              GSTIN: {GSTIN}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest opacity-60">
        <p>© {new Date().getFullYear()} {STORE_NAME}. All Rights Reserved.</p>
        <p className="mt-4 md:mt-0">Designed with Tradition</p>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow saree-pattern">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Fallback to Home for simplicity in this demo */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
