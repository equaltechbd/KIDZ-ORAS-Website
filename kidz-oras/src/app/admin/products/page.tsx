"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { 
  Menu, Bell, Search, Filter, Plus, Edit, Trash2, MoreVertical, 
  Image as ImageIcon, Copy, CheckCircle2, ChevronDown, Power, X, Upload, Save
} from "lucide-react";

// --- Mock Data ---
const mockProducts = [
  { id: "PRD-001", name: "কিউট বেবি সুতি রমপার - প্রিমিয়াম", category: "পোশাক", price: "৳৬০০", stock: 45, status: "In Stock", warehouse: "মিরপুর ওয়্যারহাউজ", performance: 92, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALG52l4H597Zus4CpnjmcgrWB9leinNtFPsCznTWr7puoP653tLm4mLY8ocqBA5kLsoHp97bYlnMLx1NDdeQxeuvp-paVAAh7QijRbSDO_LSf6nLa8j8lkRHBP67ghM13lQRHZ3203sba1Q8T1zqH7Ij1gZSyMEucuq2ZsL9WjvRbVtov32GG_HRrPoy5WBIZKk_L2zB8fmsD4u4vSvn4Dxi9MO-O6nTWqYnQP5-UitwjibcTjOB_v_KZktagBcaqypQ" },
  { id: "PRD-002", name: "জিওমেট্রিক ব্লক সেট", category: "খেলনা", price: "৳৮৫০", stock: 12, status: "Low Stock", warehouse: "উত্তরা হাব", performance: 65, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiNVvtEG3oFqFg05B8OdeQL4kSQdpTXw1ZE3QSusVFz93Q5B2TGxYf-QVDsJDD2h2Q6qVy-Zu37DxTlFyRXMmQdM-yP-CQl4YtGbfh9jt7Xn9SlXIin0eOE3ZC0MaxxUSr1iidBpYP7hwKHFyMv7yWBG7rnM4l-m1SGdsCfpun3f_d2a3-Bx6mpVStn99mBeQqJPbYdxOfYygtY4lq26cLflC8X58WmBwRUoJYO_sfQlDNSGb2XQCG" },
  { id: "PRD-003", name: "শেপ সর্টার বক্স লার্নিং টয়", category: "খেলনা", price: "৳৯৯০", stock: 0, status: "Out of Stock", warehouse: "মিরপুর ওয়্যারহাউজ", performance: 35, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbypmutJAUoTsfZiwVaqynUq38i2PH7x9Oxl2K1M3kd9u69KwQK7c5xQnPUHjgGqrZ7vmCr0Lhp0jLKh8FekiuRRFFufabjPCVE2_cxefLObbMjrxebD7zZRIzIJrLyPraqPrUnF7F_mArtcTb4I2--R7rq_LvAQGcc4Hh1f536EXaxpmYV2IG9wOZNXkedK_7sq8dMRsvuaQL6b5Ph36DYZZw-KWNDB_yJJ9A130x0Zj0kiEdA8IL" },
  { id: "PRD-004", name: "উডেন মন্টিসরি ফিশিং টয়", category: "খেলনা", price: "৳৬৫০", stock: 120, status: "In Stock", warehouse: "সাভার গোডাউন", performance: 88, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDN7P6f248ZyWilkiqmtHN332jWtuKfRNW5Pb02o5y9FmSlXEUqaNHCDMMqoUADbrXEFxcE2nS9iQWu2MSO77j7IWBt30Z_0xkEnOThOFXS3AwPLh-Mqji-lDYgfkOdZ2mlWjRT4meVrLnUzzFtwsPilFHMhoWUX4LSExj7tj4fjd0-8mMRy5B038_dvRIcbg2o9jqFuAV7lQnoZq-6uvvOKBeqE1m45Moj8XYZHr7A4H2QZkqmHSG3" },
  { id: "PRD-005", name: "সিলিকন বেবি টিদার", category: "এসেনশিয়ালস", price: "৳৩৫০", stock: 5, status: "Low Stock", warehouse: "মিরপুর ওয়্যারহাউজ", performance: 75, img: null }
];

export default function AdminProductsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Popups & Modals State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<typeof mockProducts[0] | null>(null);
  
  // Copy State
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getStockBadge = (status: string) => {
    switch(status) {
      case "In Stock": return <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[11px] font-bold border border-emerald-500/20">In Stock</span>;
      case "Low Stock": return <span className="inline-block px-2.5 py-1 rounded-md bg-yellow-500/10 text-yellow-500 text-[11px] font-bold border border-yellow-500/20">Low Stock</span>;
      case "Out of Stock": return <span className="inline-block px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 text-[11px] font-bold border border-red-500/20">Out of Stock</span>;
      default: return <span className="px-2.5 py-1 rounded-md bg-gray-500/10 text-gray-400 text-[11px] font-bold border border-gray-500/20">{status}</span>;
    }
  };

  const getPerformanceColor = (perf: number) => {
    if (perf >= 70) return "bg-emerald-500 shadow-emerald-500/50";
    if (perf >= 40) return "bg-yellow-500 shadow-yellow-500/50";
    return "bg-red-500 shadow-red-500/50";
  };

  const handleCopy = (product: typeof mockProducts[0]) => {
    const text = `📦 Product: ${product.name}\n🔖 Code: ${product.id}\n📁 Category: ${product.category}\n💰 Price: ${product.price}\n📊 Status: ${product.status}`;
    navigator.clipboard.writeText(text);
    setCopiedId(product.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openAddProduct = () => {
    setEditingProduct(null);
    setIsDrawerOpen(true);
  };

  const openEditProduct = (product: typeof mockProducts[0]) => {
    setEditingProduct(product);
    setIsDrawerOpen(true);
  };

  return (
    <div className="bg-[#050505] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#F49547]/30 flex">
      
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
                    <th className="py-4 px-6 font-semibold">Warehouse</th>
                    <th className="py-4 px-6 font-semibold">Performance</th>
                    <th className="py-4 px-6 font-semibold">Stock & Status</th>
                    <th className="py-4 px-6 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {mockProducts.map((product) => (
                    <tr key={product.id} className="border-b border-[#1f1f1f] hover:bg-[#161616] transition-colors group">
                      
                      {/* Product Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-[#0a0a0a] border border-[#1f1f1f] p-1 flex shrink-0 items-center justify-center overflow-hidden">
                            {product.img ? 
                              <img src={product.img} alt={product.name} className="w-full h-full object-cover rounded-lg opacity-90 group-hover:opacity-100 transition-opacity" /> 
                              : <ImageIcon size={20} className="text-gray-600" />
                            }
                          </div>
                          <div>
                            <div className="text-gray-200 font-semibold group-hover:text-[#F49547] transition-colors line-clamp-1">{product.name}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-500 font-mono bg-[#1a1a1a] px-1.5 py-0.5 rounded border border-[#2a2a2a]">{product.id}</span>
                              <span className="text-sm font-bold text-white">{product.price}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 text-gray-400 font-medium">{product.category}</td>

                      {/* Warehouse (Off-white Mark) */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                          {product.warehouse}
                        </div>
                      </td>

                      {/* Performance (Purple Mark) */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-2.5 h-2.5 rounded-full shadow-sm ${getPerformanceColor(product.performance)}`}></span>
                          <span className="text-white font-bold">{product.performance}%</span>
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

                      {/* Actions (Green Mark) */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2 relative">
                          
                          {/* Copy Button */}
                          <button onClick={() => handleCopy(product)} className="text-gray-400 hover:text-[#F49547] transition-colors p-1.5 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] hover:border-[#F49547]/30" title="Copy Product Details">
                            {copiedId === product.id ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                          </button>
                          
                          {/* Edit Button */}
                          <button onClick={() => openEditProduct(product)} className="text-gray-400 hover:text-blue-400 transition-colors p-1.5 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] hover:border-blue-400/30" title="Edit">
                            <Edit size={16} />
                          </button>
                          
                          {/* Three Dots Menu */}
                          <button 
                            onClick={() => setActiveDropdown(activeDropdown === product.id ? null : product.id)}
                            className="text-gray-400 hover:text-white transition-colors p-1.5 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]"
                          >
                            <MoreVertical size={16} />
                          </button>

                          {/* Dropdown Options */}
                          {activeDropdown === product.id && (
                            <div className="absolute right-8 top-10 w-40 bg-[#121212] border border-[#1f1f1f] rounded-xl shadow-2xl py-2 z-20 text-left">
                              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white transition-colors">
                                <Power size={14} className="text-emerald-400" /> Active
                              </button>
                              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-red-400 transition-colors border-t border-[#1f1f1f] mt-1 pt-2">
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="p-4 border-t border-[#1f1f1f] flex items-center justify-between text-sm text-gray-500">
              <div>Showing 1 to 5 of 45 products</div>
              <div className="flex gap-1">
                <button className="px-3 py-1.5 bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg hover:text-white hover:bg-[#1a1a1a] transition-colors">Prev</button>
                <button className="px-3 py-1.5 bg-[#F49547] text-white rounded-lg font-bold">1</button>
                <button className="px-3 py-1.5 bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg hover:text-white hover:bg-[#1a1a1a] transition-colors">2</button>
                <button className="px-3 py-1.5 bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg hover:text-white hover:bg-[#1a1a1a] transition-colors">Next</button>
              </div>
            </div>
          </div>
        </main>

        {/* ---------------- Add/Edit Product Drawer ---------------- */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
            
            <div className="relative w-full max-w-lg bg-[#121212] h-full shadow-2xl border-l border-[#1f1f1f] flex flex-col animate-in slide-in-from-right duration-300">
              
              {/* Drawer Header */}
              <div className="flex justify-between items-center p-6 border-b border-[#1f1f1f] bg-[#0a0a0a]">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {editingProduct ? `Editing ID: ${editingProduct.id}` : "Fill in the details for the new product"}
                  </p>
                </div>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-gray-400 hover:text-white bg-[#1a1a1a] rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                
                {/* Image Upload Area */}
                <div className="border-2 border-dashed border-[#2a2a2a] rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-[#1a1a1a]/50 hover:bg-[#1a1a1a] transition-colors cursor-pointer group">
                  {editingProduct?.img ? (
                    <img src={editingProduct.img} alt="Product" className="h-32 object-contain rounded-lg mb-4" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-[#F49547]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Upload size={24} className="text-[#F49547]" />
                    </div>
                  )}
                  <p className="text-sm font-semibold text-white">Click to upload product image</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Product Name</label>
                    <input type="text" defaultValue={editingProduct?.name || ""} placeholder="e.g. Baby Summer Romper" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F49547]/50 focus:ring-1 focus:ring-[#F49547]/50" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Price (৳)</label>
                      <input type="text" defaultValue={editingProduct ? editingProduct.price.replace('৳', '') : ""} placeholder="0.00" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F49547]/50" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Stock Qty</label>
                      <input type="number" defaultValue={editingProduct?.stock || ""} placeholder="0" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F49547]/50" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                      <select className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F49547]/50 appearance-none">
                        <option>পোশাক (Clothing)</option>
                        <option>খেলনা (Toys)</option>
                        <option>এসেনশিয়ালস (Essentials)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Warehouse</label>
                      <select className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F49547]/50 appearance-none">
                        <option>মিরপুর ওয়্যারহাউজ</option>
                        <option>উত্তরা হাব</option>
                        <option>সাভার গোডাউন</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Product Description</label>
                    <textarea rows={4} placeholder="Write a short description..." className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F49547]/50 resize-none"></textarea>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-[#1f1f1f] bg-[#0a0a0a] flex gap-3">
                <button onClick={() => setIsDrawerOpen(false)} className="flex-1 py-3 bg-[#1a1a1a] hover:bg-[#252525] border border-[#2a2a2a] rounded-xl text-sm font-semibold text-white transition-colors">
                  Cancel
                </button>
                <button className="flex-1 py-3 bg-[#F49547] hover:bg-[#d87c33] rounded-xl text-sm font-semibold text-white transition-colors shadow-lg shadow-[#F49547]/20 flex items-center justify-center gap-2">
                  <Save size={16} /> Save Product
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}