"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { createClient } from "@/utils/supabase/client";
import { toast, Toaster } from "react-hot-toast";
import { Menu, Bell, Search, Filter, Plus, Edit, Trash2, MoreVertical, Image as ImageIcon, Copy, CheckCircle2, ChevronDown, Power, X, Upload, Save, Loader2 } from "lucide-react";

// Product Type matching your database schema
type Product = {
  description?: string;
  id: string;
  name: string;
  category: string;
  price: number;
  discount_price: number | null;
  stock: number;
  image_url: string;
  status: string;
};

export default function AdminProductsPage() { 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Popups & Modals State 
  const [isFilterOpen, setIsFilterOpen] = useState(false); 
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); 
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Drawer State 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "পোশাক (Clothing)",
    price: "",
    stock: "",
    image_url: "",
    description: ""
  });

  // Copy State 
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const supabase = createClient();

  // ১. ডেটাবেস থেকে প্রোডাক্ট লোড করা
  const fetchProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      toast.error("প্রোডাক্ট লোড করতে সমস্যা হয়েছে!");
    } else {
      setProducts(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ২. নতুন প্রোডাক্ট অ্যাড করা বা আপডেট করা
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const productData = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      image_url: formData.image_url,
      description: formData.description,
      status: parseInt(formData.stock) > 10 ? 'In Stock' : parseInt(formData.stock) > 0 ? 'Low Stock' : 'Out of Stock'
    };

    if (editingProduct) {
      // Update existing product
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingProduct.id);
        
      if (error) {
        toast.error("আপডেট করতে ব্যর্থ হয়েছে!");
      } else {
        toast.success("প্রোডাক্ট আপডেট হয়েছে!");
        setIsDrawerOpen(false);
        fetchProducts();
      }
    } else {
      // Insert new product
      const { error } = await supabase.from("products").insert([productData]);
      
      if (error) {
        toast.error("প্রোডাক্ট অ্যাড করতে ব্যর্থ হয়েছে!");
      } else {
        toast.success("নতুন প্রোডাক্ট যোগ করা হয়েছে!");
        setIsDrawerOpen(false);
        fetchProducts();
      }
    }
    setIsSubmitting(false);
  };

  // ৩. প্রোডাক্ট ডিলিট করা
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("আপনি কি নিশ্চিত যে এই প্রোডাক্টটি ডিলিট করতে চান?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast.error("ডিলিট করতে সমস্যা হয়েছে!");
    } else {
      toast.success("প্রোডাক্ট ডিলিট করা হয়েছে!");
      setProducts(products.filter(p => p.id !== id)); 
    }
    setActiveDropdown(null);
  };

  const getStockBadge = (status: string) => { 
    switch(status) { 
      case "In Stock": return <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[11px] font-bold border border-emerald-500/20">In Stock</span>; 
      case "Low Stock": return <span className="inline-block px-2.5 py-1 rounded-md bg-yellow-500/10 text-yellow-500 text-[11px] font-bold border border-yellow-500/20">Low Stock</span>; 
      case "Out of Stock": return <span className="inline-block px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 text-[11px] font-bold border border-red-500/20">Out of Stock</span>; 
      default: return <span className="px-2.5 py-1 rounded-md bg-gray-500/10 text-gray-400 text-[11px] font-bold border border-gray-500/20">{status}</span>; 
    } 
  };

  const getPerformanceColor = (stock: number) => { 
    if (stock >= 20) return "bg-emerald-500 shadow-emerald-500/50"; 
    if (stock >= 5) return "bg-yellow-500 shadow-yellow-500/50"; 
    return "bg-red-500 shadow-red-500/50"; 
  };

  const handleCopy = (product: Product) => { 
    const text = `📦 Product: ${product.name}\n🔖 Code: ${product.id}\n📁 Category: ${product.category}\n💰 Price: ${product.price}\n📊 Status: ${product.status}`; 
    navigator.clipboard.writeText(text); 
    setCopiedId(product.id); 
    setTimeout(() => setCopiedId(null), 2000); 
  };

  const openAddProduct = () => { 
    setEditingProduct(null); 
    setFormData({
      name: "",
      category: "পোশাক (Clothing)",
      price: "",
      stock: "",
      image_url: "",
      description: ""
    });
    setIsDrawerOpen(true); 
  };

  const openEditProduct = (product: Product) => { 
    setEditingProduct(product); 
    setFormData({
      name: product.name,
      category: product.category || "পোশাক (Clothing)",
      price: product.price.toString(),
      stock: product.stock.toString(),
      image_url: product.image_url || "",
      description: product.description || ""
    });
    setIsDrawerOpen(true); 
  };

  return ( 
    <div className="bg-[#050505] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#F49547]/30 flex">
      <Toaster position="top-center" />
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-[260px] flex flex-col min-h-screen w-full relative">
        
        {/* Header */}
        <header className="bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-30 border-b border-[#1f1f1f] flex justify-between items-center h-16 px-4 md:px-8">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-400 hover:text-[#F49547] p-2 rounded-lg">
              <Menu size={24} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#1a1a1a] transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F49547] rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Products View */}
        <main className="p-4 md:p-8 space-y-6 w-full pb-20">
          
          {/* Top Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Products</h2>
              <p className="text-gray-400 mt-1 text-sm">Manage your store catalog and inventory.</p>
            </div>
            <button 
              onClick={openAddProduct}
              className="flex items-center justify-center gap-2 bg-[#F49547] hover:bg-[#d87c33] text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-[#F49547]/20 active:scale-95"
            >
              <Plus size={18} /> Add New Product
            </button>
          </div>

          {/* Action Bar (Search, Category, Filter) */}
          <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
            
            {/* Search */}
            <div className="relative w-full md:max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#F49547] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search products by name or ID..." 
                className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl py-2.5 pl-11 pr-4 text-sm text-white focus:border-[#F49547]/50 focus:ring-1 focus:ring-[#F49547]/50 transition-all outline-none placeholder-gray-600" 
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Categories Dropdown */}
              <div className="relative flex-1 md:flex-none">
                <button 
                  onClick={() => { setIsCategoryOpen(!isCategoryOpen); setIsFilterOpen(false); }}
                  className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-[#0a0a0a] border border-[#1f1f1f] text-gray-300 rounded-xl text-sm hover:text-white hover:border-gray-700 transition-colors"
                >
                  <span>All Categories</span>
                  <ChevronDown size={16} className={`transition-transform ${isCategoryOpen ? 'rotate-180 text-[#F49547]' : ''}`} />
                </button>
                {isCategoryOpen && (
                  <div className="absolute right-0 mt-2 w-full min-w-[180px] bg-[#121212] border border-[#1f1f1f] rounded-xl shadow-2xl py-2 z-20">
                    <div className="px-4 py-2 hover:bg-[#1a1a1a] cursor-pointer text-sm text-[#F49547] font-medium">All Categories</div>
                    <div className="px-4 py-2 hover:bg-[#1a1a1a] cursor-pointer text-sm text-gray-300">পোশাক (Clothing)</div>
                    <div className="px-4 py-2 hover:bg-[#1a1a1a] cursor-pointer text-sm text-gray-300">খেলনা (Toys)</div>
                    <div className="px-4 py-2 hover:bg-[#1a1a1a] cursor-pointer text-sm text-gray-300">এসেনশিয়ালস (Essentials)</div>
                  </div>
                )}
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => { setIsFilterOpen(!isFilterOpen); setIsCategoryOpen(false); }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0a0a0a] border border-[#1f1f1f] text-gray-300 rounded-xl text-sm hover:text-white hover:border-gray-700 transition-colors"
                >
                  <Filter size={16} className={isFilterOpen ? "text-[#F49547]" : ""} /> 
                  <span className="hidden md:inline">Filter</span>
                </button>
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#121212] border border-[#1f1f1f] rounded-xl shadow-2xl p-4 z-20">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Filter By Status</h4>
                    <div className="space-y-2 text-sm">
                      <label className="flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-lg cursor-pointer">
                        <input type="checkbox" className="accent-[#F49547]" defaultChecked /> <span className="text-gray-300">In Stock</span>
                      </label>
                      <label className="flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-lg cursor-pointer">
                        <input type="checkbox" className="accent-[#F49547]" defaultChecked /> <span className="text-gray-300">Low Stock</span>
                      </label>
                      <label className="flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-lg cursor-pointer">
                        <input type="checkbox" className="accent-[#F49547]" defaultChecked /> <span className="text-gray-300">Out of Stock</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1100px]">
                <thead>
                  <tr className="bg-[#0a0a0a]/50 text-gray-400 text-[11px] uppercase tracking-widest border-b border-[#1f1f1f]">
                    <th className="py-4 px-6 font-semibold">Product Info</th>
                    <th className="py-4 px-6 font-semibold">Category</th>
                    <th className="py-4 px-6 font-semibold">Price</th>
                    <th className="py-4 px-6 font-semibold">Performance</th>
                    <th className="py-4 px-6 font-semibold">Stock & Status</th>
                    <th className="py-4 px-6 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-500">
                        <Loader2 className="animate-spin mx-auto mb-2" size={24} />
                        Loading products...
                      </td>
                    </tr>
                  ) : products.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-500">
                        No products found. Add a new product to get started!
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id} className="border-b border-[#1f1f1f] hover:bg-[#161616] transition-colors group">
                        
                        {/* Product Info */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-[#0a0a0a] border border-[#1f1f1f] p-1 flex shrink-0 items-center justify-center overflow-hidden">
                              {product.image_url ? 
                                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded-lg opacity-90 group-hover:opacity-100 transition-opacity" /> 
                                : <ImageIcon size={20} className="text-gray-600" />
                              }
                            </div>
                            <div>
                              <div className="text-gray-200 font-semibold group-hover:text-[#F49547] transition-colors line-clamp-1">{product.name}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500 font-mono bg-[#1a1a1a] px-1.5 py-0.5 rounded border border-[#2a2a2a]">{product.id.split('-')[0]}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-6 text-gray-400 font-medium">{product.category}</td>
                        
                        {/* Price */}
                        <td className="py-4 px-6 font-bold text-white">৳{product.price}</td>

                        {/* Performance */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2.5">
                            <span className={`w-2.5 h-2.5 rounded-full shadow-sm ${getPerformanceColor(product.stock)}`}></span>
                            <span className="text-white font-bold">{Math.min(product.stock * 2, 100)}%</span>
                          </div>
                          <p className="text-[10px] text-gray-500 mt-0.5">Sales Score</p>
                        </td>

                        {/* Stock & Status */}
                        <td className="py-4 px-6">
                          <div className="mb-1.5">
                            {product.stock > 0 ? <span className="font-bold text-white">{product.stock} <span className="text-xs text-gray-500 font-normal">pcs left</span></span> : <span className="text-gray-600">-</span>}
                          </div>
                          {getStockBadge(product.status)}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2 relative">
                            <button onClick={() => handleCopy(product)} className="text-gray-400 hover:text-[#F49547] transition-colors p-1.5 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] hover:border-[#F49547]/30" title="Copy Details">
                              {copiedId === product.id ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                            </button>
                            <button onClick={() => openEditProduct(product)} className="text-gray-400 hover:text-blue-400 transition-colors p-1.5 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] hover:border-blue-400/30" title="Edit">
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => setActiveDropdown(activeDropdown === product.id ? null : product.id)}
                              className="text-gray-400 hover:text-white transition-colors p-1.5 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]"
                            >
                              <MoreVertical size={16} />
                            </button>
                            {activeDropdown === product.id && (
                              <div className="absolute right-8 top-10 w-32 bg-[#121212] border border-[#1f1f1f] rounded-xl shadow-2xl py-2 z-20 text-left">
                                <button onClick={() => handleDelete(product.id)} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-red-400 transition-colors">
                                  <Trash2 size={14} /> Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* ---------------- Add/Edit Product Drawer ---------------- */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
            
            <div className="relative w-full max-w-lg bg-[#121212] h-full shadow-2xl border-l border-[#1f1f1f] flex flex-col animate-in slide-in-from-right duration-300">
              
              <div className="flex justify-between items-center p-6 border-b border-[#1f1f1f] bg-[#0a0a0a]">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h3>
                </div>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-gray-400 hover:text-white bg-[#1a1a1a] rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <form id="product-form" onSubmit={handleSaveProduct} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Product Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Baby Summer Romper" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F49547]/50" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Price (৳)</label>
                      <input required type="number" min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="0.00" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F49547]/50" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Stock Qty</label>
                      <input required type="number" min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} placeholder="0" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F49547]/50" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                    <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F49547]/50 appearance-none">
                      <option>পোশাক (Clothing)</option>
                      <option>খেলনা (Toys)</option>
                      <option>এসেনশিয়ালস (Essentials)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Image URL</label>
                    <input type="url" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="Paste direct image link" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F49547]/50" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Description</label>
                    <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F49547]/50 resize-none"></textarea>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-[#1f1f1f] bg-[#0a0a0a] flex gap-3">
                <button onClick={() => setIsDrawerOpen(false)} type="button" className="flex-1 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-sm font-semibold text-white">Cancel</button>
                <button type="submit" form="product-form" disabled={isSubmitting} className="flex-1 py-3 bg-[#F49547] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save Product
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}