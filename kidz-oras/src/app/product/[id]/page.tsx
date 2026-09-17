"use client";

import { useState } from "react";
import { Package, Plus, Search, Edit, Trash2, Tag, Filter, X, Percent, Image as ImageIcon, Layers } from "lucide-react";

export default function ProductsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // ডায়নামিক ক্যাটাগরি স্টেট (ভবিষ্যতে এটি Supabase থেকে আসবে)
  const [categories, setCategories] = useState([
    { id: "1", name: "Babies Clothes" },
    { id: "2", name: "Educational Toys" },
    { id: "3", name: "Feeding Items" }
  ]);
  const [newCategoryName, setNewCategoryName] = useState("");

  // নতুন ক্যাটাগরি যোগ করার ফাংশন
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      setCategories([...categories, { id: Date.now().toString(), name: newCategoryName }]);
      setNewCategoryName("");
    }
  };

  // ক্যাটাগরি ডিলিট করার ফাংশন
  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  // ডেমো প্রোডাক্ট লিস্ট
  const [products] = useState([
    {
      id: "PRD-001",
      name: "কিউট বেবি সুতি রমপার (০-৬ মাস)",
      category: "Babies Clothes",
      price: 800,
      discountPrice: 600,
      stock: 45,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALG52l4H597Zus4CpnjmcgrWB9leinNtFPsCznTWr7puoP653tLm4mLY8ocqBA5kLsoHp97bYlnMLx1NDdeQxeuvp-paVAAh7QijRbSDO_LSf6nLa8j8lkRHBP67ghM13lQRHZ3203sba1Q8T1zqH7Ij1gZSyMEucuq2ZsL9WjvRbVtov32GG_HRrPoy5WBIZKk_L2zB8fmsD4u4vSvn4Dxi9MO-O6nTWqYnQP5-UitwjibcTjOB_v_KZktagBcaqypQ"
    },
    {
      id: "PRD-002",
      name: "জিওমেট্রিক ব্লক সেট ব্রেইন টিজার",
      category: "Educational Toys",
      price: 850,
      discountPrice: null,
      stock: 12,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiNVvtEG3oFqFg05B8OdeQL4kSQdpTXw1ZE3QSusVFz93Q5B2TGxYf-QVDsJDD2h2Q6qVy-Zu37DxTlFyRXMmQdM-yP-CQl4YtGbfh9jt7Xn9SlXIin0eOE3ZC0MaxxUSr1iidBpYP7hwKHFyMv7yWBG7rnM4l-m1SGdsCfpun3f_d2a3-Bx6mpVStn99mBeQqJPbYdxOfYygtY4lq26cLflC8X58WmBwRUoJYO_sfQlDNSGb2XQCG"
    }
  ]);

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="text-[#E52565]" /> প্রোডাক্ট ম্যানেজমেন্ট
          </h1>
          <p className="text-gray-500 text-sm mt-1">আপনার স্টোরের সব প্রোডাক্ট এবং ডিসকাউন্ট কন্ট্রোল করুন</p>
        </div>
        
        {/* Header Buttons */}
        <div className="flex flex-col md:flex-row gap-3">
          <button 
            onClick={() => setShowCategoryModal(true)}
            className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors shadow-sm justify-center"
          >
            <Layers size={20} /> ক্যাটাগরি
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#E52565] hover:bg-[#E52565]/90 text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors shadow-sm justify-center"
          >
            <Plus size={20} /> নতুন প্রোডাক্ট
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="প্রোডাক্টের নাম দিয়ে খুঁজুন..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#E52565] outline-none transition-colors"
          />
        </div>
        <div className="flex gap-4">
          <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-[#E52565] text-gray-700 font-medium">
            <option>সব ক্যাটাগরি</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors">
            <Filter size={18} /> ফিল্টার
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
                <th className="p-4 font-semibold">প্রোডাক্টের ছবি ও নাম</th>
                <th className="p-4 font-semibold">ক্যাটাগরি</th>
                <th className="p-4 font-semibold">মূল্য ও ডিসকাউন্ট</th>
                <th className="p-4 font-semibold text-center">স্টক</th>
                <th className="p-4 font-semibold text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply p-1" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 line-clamp-1">{product.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max">
                      <Tag size={12} /> {product.category}
                    </span>
                  </td>
                  <td className="p-4">
                    {product.discountPrice ? (
                      <div>
                        <span className="font-bold text-[#E52565] text-lg">৳{product.discountPrice}</span>
                        <span className="text-gray-400 line-through text-sm ml-2">৳{product.price}</span>
                        <div className="text-[10px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded w-max mt-1">DISCOUNTED</div>
                      </div>
                    ) : (
                      <span className="font-bold text-gray-800 text-lg">৳{product.price}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`font-bold px-3 py-1 rounded-full text-sm ${product.stock > 20 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {product.stock} পিস
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={18} /></button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🟢 CATEGORY MANAGEMENT MODAL 🟢 */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="border-b border-gray-100 p-5 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Layers className="text-[#E52565]" /> ক্যাটাগরি ম্যানেজমেন্ট
              </h2>
              <button onClick={() => setShowCategoryModal(false)} className="p-2 bg-gray-200 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-5">
              {/* Add New Category */}
              <div className="flex gap-2 mb-6">
                <input 
                  type="text" 
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="নতুন ক্যাটাগরির নাম লিখুন..." 
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-[#E52565] outline-none"
                />
                <button 
                  onClick={handleAddCategory}
                  className="bg-gray-900 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-black transition-colors flex items-center gap-1"
                >
                  <Plus size={18}/> অ্যাড
                </button>
              </div>

              {/* Category List */}
              <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1 custom-scrollbar">
                {categories.length === 0 && <p className="text-center text-gray-500 py-4 text-sm">কোনো ক্যাটাগরি নেই</p>}
                {categories.map(cat => (
                  <div key={cat.id} className="flex justify-between items-center bg-white border border-gray-100 p-3 rounded-xl shadow-sm hover:border-[#E52565]/30 transition-colors">
                    <span className="font-bold text-gray-700 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#E52565]"></div> {cat.name}
                    </span>
                    <button 
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-red-400 p-1.5 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
                    >
                      <Trash2 size={16}/>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🟢 ADD PRODUCT MODAL 🟢 */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-5 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Package className="text-[#E52565]" /> নতুন প্রোডাক্ট যোগ করুন
              </h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">প্রোডাক্টের নাম *</label>
                  <input type="text" placeholder="যেমন: কিউট বেবি সুতি রমপার" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-[#E52565] outline-none" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">ক্যাটাগরি সিলেক্ট করুন *</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-[#E52565] outline-none text-gray-700 font-medium">
                      {/* ডায়নামিক ক্যাটাগরি লিস্ট */}
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">স্টক (কয় পিস আছে?) *</label>
                    <input type="number" placeholder="যেমন: 50" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-[#E52565] outline-none" />
                  </div>
                </div>
              </div>

              <div className="bg-red-50/50 border border-red-100 rounded-xl p-5">
                <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2"><Percent size={18} /> মূল্য এবং ডিসকাউন্ট</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">রেগুলার প্রাইস (৳) *</label>
                    <input type="number" placeholder="যেমন: 800" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 focus:border-[#E52565] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#E52565] mb-1.5">ডিসকাউন্ট প্রাইস (অপশনাল)</label>
                    <input type="number" placeholder="ছাড় দেওয়ার পর দাম (যেমন: 600)" className="w-full bg-white border border-[#E52565]/30 rounded-lg px-4 py-2.5 focus:border-[#E52565] outline-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">প্রোডাক্টের ছবি (URL)</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="https://..." className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:bg-white focus:border-[#E52565] outline-none" />
                  <button className="bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-bold hover:bg-gray-300 transition-colors flex items-center gap-2">
                    <ImageIcon size={18}/> আপলোড
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 p-5 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
              <button onClick={() => setShowAddModal(false)} className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors">বাতিল করুন</button>
              <button className="bg-[#E52565] text-white px-8 py-2.5 rounded-xl font-bold hover:bg-[#E52565]/90 transition-colors shadow-md">পাবলিশ করুন</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}