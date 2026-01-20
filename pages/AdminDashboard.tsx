
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingBag, Plus, Edit2, Trash2, TrendingUp, Filter, IndianRupee } from 'lucide-react';
import { StorageService } from '../services/storage';
import { Product, Category, Order } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>(StorageService.getProducts());
  const [orders, setOrders] = useState<Order[]>(StorageService.getOrders());
  const user = StorageService.getUser();
  const navigate = useNavigate();

  // Redirect if not admin
  React.useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: Category.SAREES,
    fabric: '',
    mrp: 0,
    offerPrice: 0,
    stock: 0,
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format&fit=crop'],
    description: ''
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name!,
      category: newProduct.category!,
      fabric: newProduct.fabric!,
      mrp: Number(newProduct.mrp),
      offerPrice: newProduct.offerPrice ? Number(newProduct.offerPrice) : undefined,
      stock: Number(newProduct.stock),
      images: newProduct.images!,
      description: newProduct.description!,
      isOffer: (newProduct.offerPrice || 0) < Number(newProduct.mrp)
    };

    const updated = [product, ...products];
    setProducts(updated);
    StorageService.saveProducts(updated);
    setIsAddingProduct(false);
    setNewProduct({
      name: '',
      category: Category.SAREES,
      fabric: '',
      mrp: 0,
      offerPrice: 0,
      stock: 0,
      images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format&fit=crop'],
      description: ''
    });
  };

  const deleteProduct = (id: string) => {
    if (confirm('Delete this product?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      StorageService.saveProducts(updated);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <div className="bg-store-green text-store-cream p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl zari-border border-b-4">
        <div>
          <h1 className="text-3xl font-serif">Store Management Dashboard</h1>
          <p className="opacity-70 text-sm italic">Managing Babu’s Textiles Inventory & Orders</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/10 px-6 py-3 rounded-xl backdrop-blur-md text-center">
            <p className="text-[10px] uppercase font-bold tracking-widest text-store-gold">Total Stock</p>
            <p className="text-2xl font-bold">{products.reduce((acc, p) => acc + p.stock, 0)}</p>
          </div>
          <div className="bg-white/10 px-6 py-3 rounded-xl backdrop-blur-md text-center">
            <p className="text-[10px] uppercase font-bold tracking-widest text-store-gold">Live Orders</p>
            <p className="text-2xl font-bold">{orders.length}</p>
          </div>
        </div>
      </div>

      <div className="flex border-b border-amber-100">
        <button 
          onClick={() => setActiveTab('products')}
          className={`px-8 py-4 flex items-center gap-2 font-bold transition border-b-2 ${activeTab === 'products' ? 'border-store-gold text-store-gold' : 'border-transparent text-gray-400'}`}
        >
          <Package className="h-5 w-5" /> PRODUCTS
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`px-8 py-4 flex items-center gap-2 font-bold transition border-b-2 ${activeTab === 'orders' ? 'border-store-gold text-store-gold' : 'border-transparent text-gray-400'}`}
        >
          <ShoppingBag className="h-5 w-5" /> ORDER HISTORY
        </button>
      </div>

      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif text-store-green">Current Inventory</h2>
            <button 
              onClick={() => setIsAddingProduct(true)}
              className="bg-store-maroon text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-store-green transition shadow-lg"
            >
              <Plus className="h-5 w-5" /> ADD NEW PRODUCT
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition">
                <div className="flex gap-4">
                  <img src={p.images[0]} className="w-20 h-24 object-cover rounded-lg shadow-sm" alt={p.name} />
                  <div className="flex-grow">
                    <h3 className="font-bold text-store-green leading-tight">{p.name}</h3>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{p.category} • {p.fabric}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm font-bold text-store-maroon">₹{p.offerPrice || p.mrp}</span>
                      {p.offerPrice && <span className="text-[10px] text-gray-300 line-through">₹{p.mrp}</span>}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-amber-50 flex justify-between items-center">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${p.stock < 5 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    STOCK: {p.stock}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-store-gold transition"><Edit2 className="h-4 w-4" /></button>
                    <button onClick={() => deleteProduct(p.id)} className="p-2 text-gray-400 hover:text-red-500 transition"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-amber-200 text-gray-400">
              No orders found in history.
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-store-green text-store-cream">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Date / Order ID</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Items</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-right">Total</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-50">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-amber-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-store-green">{new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="text-[10px] text-gray-400">#{order.id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold">{order.userName}</p>
                        <p className="text-[10px] text-gray-500">{StorageService.getOrders().find(o => o.id === order.id)?.userId}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.items.length} items
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-store-maroon">
                        ₹{order.total.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {isAddingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="bg-store-maroon text-white p-6 flex justify-between items-center">
              <h3 className="text-xl font-serif">Add New Product</h3>
              <button onClick={() => setIsAddingProduct(false)} className="text-white/80 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleAddProduct} className="p-8 grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Product Name</label>
                <input 
                  type="text" required
                  className="w-full border border-amber-200 rounded-lg p-3 outline-none focus:ring-1 focus:ring-store-gold"
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Category</label>
                <select 
                  className="w-full border border-amber-200 rounded-lg p-3 outline-none focus:ring-1 focus:ring-store-gold bg-white"
                  value={newProduct.category}
                  onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}
                >
                  {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Fabric Type</label>
                <input 
                  type="text" required placeholder="Pure Silk, Cotton..."
                  className="w-full border border-amber-200 rounded-lg p-3 outline-none focus:ring-1 focus:ring-store-gold"
                  value={newProduct.fabric}
                  onChange={e => setNewProduct({...newProduct, fabric: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1 flex items-center gap-1"><IndianRupee className="h-3 w-3" /> MRP</label>
                <input 
                  type="number" required
                  className="w-full border border-amber-200 rounded-lg p-3 outline-none focus:ring-1 focus:ring-store-gold"
                  value={newProduct.mrp}
                  onChange={e => setNewProduct({...newProduct, mrp: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1 flex items-center gap-1"><IndianRupee className="h-3 w-3" /> Offer Price (Optional)</label>
                <input 
                  type="number"
                  className="w-full border border-amber-200 rounded-lg p-3 outline-none focus:ring-1 focus:ring-store-gold"
                  value={newProduct.offerPrice}
                  onChange={e => setNewProduct({...newProduct, offerPrice: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Stock Quantity</label>
                <input 
                  type="number" required
                  className="w-full border border-amber-200 rounded-lg p-3 outline-none focus:ring-1 focus:ring-store-gold"
                  value={newProduct.stock}
                  onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Image URL</label>
                <input 
                  type="url" required
                  className="w-full border border-amber-200 rounded-lg p-3 outline-none focus:ring-1 focus:ring-store-gold text-xs"
                  value={newProduct.images?.[0]}
                  onChange={e => setNewProduct({...newProduct, images: [e.target.value]})}
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Product Description</label>
                <textarea 
                  required rows={3}
                  className="w-full border border-amber-200 rounded-lg p-3 outline-none focus:ring-1 focus:ring-store-gold"
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                />
              </div>
              <button 
                type="submit"
                className="col-span-2 bg-store-green text-white py-4 rounded-xl font-bold hover:bg-store-maroon transition shadow-xl mt-4"
              >
                SAVE TO INVENTORY
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
