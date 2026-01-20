
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, Settings } from 'lucide-react';
import { StorageService } from '../services/storage';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const user = StorageService.getUser();
  const cart = StorageService.getCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    StorageService.saveUser(null);
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="bg-store-green text-store-cream shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-widest text-store-gold">BABU’S</span>
              <span className="text-xs uppercase tracking-[0.3em] -mt-1 opacity-80">Textiles</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="hover:text-store-gold px-3 py-2 text-sm font-medium transition">Home</Link>
              <Link to="/shop" className="hover:text-store-gold px-3 py-2 text-sm font-medium transition">Shop</Link>
              <Link to="/about" className="hover:text-store-gold px-3 py-2 text-sm font-medium transition">About</Link>
              <Link to="/contact" className="hover:text-store-gold px-3 py-2 text-sm font-medium transition">Contact</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {user?.isAdmin && (
              <Link to="/admin" className="p-2 hover:bg-store-maroon rounded-full transition" title="Admin Dashboard">
                <Settings className="h-6 w-6" />
              </Link>
            )}
            <Link to="/cart" className="relative p-2 hover:bg-store-maroon rounded-full transition">
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-store-gold text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 hover:text-store-gold">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
                </Link>
                <button onClick={handleLogout} className="p-2 hover:bg-store-maroon rounded-full transition">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-store-gold text-white px-6 py-2 rounded-md text-sm font-bold hover:bg-amber-800 transition">
                LOGIN
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-store-cream p-2">
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-store-green border-t border-store-maroon px-4 pt-4 pb-8 space-y-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-lg font-medium">Home</Link>
          <Link to="/shop" onClick={() => setIsOpen(false)} className="block text-lg font-medium">Shop</Link>
          <Link to="/cart" onClick={() => setIsOpen(false)} className="block text-lg font-medium">Cart ({cart.length})</Link>
          {user ? (
            <>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="block text-lg font-medium">Profile</Link>
              {user.isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-store-gold">Admin Dashboard</Link>}
              <button onClick={handleLogout} className="block w-full text-left text-lg font-medium text-red-400">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-store-gold">Login / Signup</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
