
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, Send, MapPin, Truck } from 'lucide-react';
import { StorageService } from '../services/storage';
import { Product, User, CartItem, Order } from '../types';
import { STORE_WHATSAPP, STORE_NAME } from '../constants';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(StorageService.getCart());
  const [products, setProducts] = useState<Product[]>(StorageService.getProducts());
  const user = StorageService.getUser();
  const navigate = useNavigate();

  const cartData = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product !== undefined);

  const subtotal = cartData.reduce((acc, item) => {
    const price = item.product!.offerPrice || item.product!.mrp;
    return acc + (price * item.quantity);
  }, 0);

  const updateQuantity = (id: string, delta: number) => {
    const updated = cartItems.map(item => {
      if (item.productId === id) {
        const newQty = Math.max(1, item.quantity + delta);
        // Check stock
        const p = products.find(prod => prod.id === id);
        if (delta > 0 && p && newQty > p.stock) return item;
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(updated);
    StorageService.saveCart(updated);
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter(item => item.productId !== id);
    setCartItems(updated);
    StorageService.saveCart(updated);
    window.dispatchEvent(new Event('storage'));
  };

  const handleCheckout = () => {
    if (!user) {
      alert('Please login to place an order.');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) return;

    // Create Order Object for History
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      items: cartData.map(item => ({
        productId: item.productId,
        productName: item.product!.name,
        quantity: item.quantity,
        price: item.product!.offerPrice || item.product!.mrp
      })),
      total: subtotal,
      status: 'Pending',
      createdAt: Date.now(),
      whatsappSent: true
    };

    const orders = StorageService.getOrders();
    StorageService.saveOrders([newOrder, ...orders]);

    // Prepare WhatsApp Message
    const orderDetails = cartData.map((item, idx) => 
      `${idx + 1}. ${item.product!.name} - Qty: ${item.quantity} - Price: ₹${(item.product!.offerPrice || item.product!.mrp).toLocaleString('en-IN')}`
    ).join('\n');

    const message = `*New Order – ${STORE_NAME}*\n\n` +
      `*Customer:* ${user.name}\n` +
      `*Mobile:* ${user.mobile}\n` +
      `*Delivery Address:* ${user.address}\n` +
      `*State:* ${user.state}\n\n` +
      `*Products Ordered:*\n${orderDetails}\n\n` +
      `*Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n\n` +
      `_Delivery charges to be added based on distance & quantity._\n\n` +
      `Please confirm my order.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/91${STORE_WHATSAPP}?text=${encodedMessage}`;

    // Clear Cart
    StorageService.saveCart([]);
    window.dispatchEvent(new Event('storage'));

    // Redirect
    window.open(whatsappUrl, '_blank');
    navigate('/profile');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="bg-amber-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-store-gold">
          <Trash2 className="h-12 w-12" />
        </div>
        <h2 className="text-3xl font-serif text-store-green">Your Cart is Empty</h2>
        <p className="text-gray-500 max-w-sm mx-auto italic">Looks like you haven't added any of our beautiful handlooms yet.</p>
        <Link to="/shop" className="inline-block bg-store-gold text-white px-10 py-4 rounded-md font-bold hover:bg-amber-800 transition">
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-serif text-store-green border-b-2 border-store-gold pb-4 mb-8">My Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {cartData.map(item => (
            <div key={item.productId} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-amber-50 group">
              <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                <img src={item.product?.images[0]} alt={item.product?.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-store-green group-hover:text-store-maroon transition">{item.product?.name}</h3>
                    <button onClick={() => removeItem(item.productId)} className="text-gray-300 hover:text-red-500 p-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{item.product?.fabric} • {item.product?.category}</p>
                  <p className="text-store-maroon font-bold mt-2">₹{(item.product?.offerPrice || item.product?.mrp || 0).toLocaleString('en-IN')}</p>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center border border-amber-200 rounded-lg overflow-hidden">
                    <button onClick={() => updateQuantity(item.productId, -1)} className="p-2 hover:bg-amber-50 transition"><Minus className="h-3 w-3" /></button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, 1)} className="p-2 hover:bg-amber-50 transition"><Plus className="h-3 w-3" /></button>
                  </div>
                  <p className="text-sm font-bold text-store-green ml-auto">
                    Total: ₹{((item.product?.offerPrice || item.product?.mrp || 0) * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-store-gold/20 sticky top-32">
            <h3 className="text-xl font-serif text-store-maroon border-b border-amber-100 pb-3 mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Items Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-400 italic text-sm">
                <span>Delivery Charges</span>
                <span className="text-xs">To be confirmed</span>
              </div>
              <div className="pt-4 border-t border-amber-100 flex justify-between font-bold text-xl text-store-green">
                <span>Estimated Total</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {user ? (
              <div className="mt-8 space-y-4">
                <div className="bg-amber-50 p-4 rounded-xl text-xs space-y-2 border border-amber-100">
                   <div className="flex items-center gap-2 text-store-gold font-bold">
                     <MapPin className="h-3 w-3" /> SHIPPING TO:
                   </div>
                   <p className="text-gray-700">{user.name}</p>
                   <p className="text-gray-500">{user.address}, {user.state}</p>
                   <Link to="/profile" className="text-store-maroon underline block pt-1">Change Address</Link>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-store-green text-white py-4 rounded-xl font-bold hover:bg-store-maroon transition shadow-xl flex items-center justify-center gap-3"
                >
                  <Send className="h-5 w-5" /> ORDER VIA WHATSAPP
                </button>
                <div className="flex items-start gap-2 text-[10px] text-gray-400 text-center px-2">
                  <Truck className="h-4 w-4 text-store-gold flex-shrink-0" />
                  <span>Delivery confirmed within 24hrs on WhatsApp by the store owner.</span>
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <Link to="/login" className="block w-full text-center bg-store-gold text-white py-4 rounded-xl font-bold hover:bg-amber-800 transition">
                  LOGIN TO CHECKOUT
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
