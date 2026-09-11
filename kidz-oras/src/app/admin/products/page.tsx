/* eslint-disable @next/next/no-img-element */
"use client";

import { Search, Filter, Plus, Edit, Trash2, MoreVertical, Image as ImageIcon } from "lucide-react";

export default function AdminProductsPage() {
  const products = [
    { id: "PRD-001", name: "কিউট বেবি সুতি রমপার - প্রিমিয়াম", category: "পোশাক", price: "৳৬০০", stock: 45, status: "In Stock", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALG52l4H597Zus4CpnjmcgrWB9leinNtFPsCznTWr7puoP653tLm4mLY8ocqBA5kLsoHp97bYlnMLx1NDdeQxeuvp-paVAAh7QijRbSDO_LSf6nLa8j8lkRHBP67ghM13lQRHZ3203sba1Q8T1zqH7Ij1gZSyMEucuq2ZsL9WjvRbVtov32GG_HRrPoy5WBIZKk_L2zB8fmsD4u4vSvn4Dxi9MO-O6nTWqYnQP5-UitwjibcTjOB_v_KZktagBcaqypQ" },
    { id: "PRD-002", name: "জিওমেট্রিক ব্লক সেট", category: "খেলনা", price: "৳৮৫০", stock: 12, status: "Low Stock", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiNVvtEG3oFqFg05B8OdeQL4kSQdpTXw1ZE3QSusVFz93Q5B2TGxYf-QVDsJDD2h2Q6qVy-Zu37DxTlFyRXMmQdM-yP-CQl4YtGbfh9jt7Xn9SlXIin0eOE3ZC0MaxxUSr1iidBpYP7hwKHFyMv7yWBG7rnM4l-m1SGdsCfpun3f_d2a3-Bx6mpVStn99mBeQqJPbYdxOfYygtY4lq26cLflC8X58WmBwRUoJYO_sfQlDNSGb2XQCG" },
    { id: "PRD-003", name: "শেপ সর্টার বক্স লার্নিং টয়", category: "খেলনা", price: "৳৯৯০", stock: 0, status: "Out of Stock", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbypmutJAUoTsfZiwVaqynUq38i2PH7x9Oxl2K1M3kd9u69KwQK7c5xQnPUHjgGqrZ7vmCr0Lhp0jLKh8FekiuRRFFufabjPCVE2_cxefLObbMjrxebD7zZRIzIJrLyPraqPrUnF7F_mArtcTb4I2--R7rq_LvAQGcc4Hh1f536EXaxpmYV2IG9wOZNXkedK_7sq8dMRsvuaQL6b5Ph36DYZZw-KWNDB_yJJ9A130x0Zj0kiEdA8IL" },
    { id: "PRD-004", name: "উডেন মন্টিসরি ফিশিং টয়", category: "খেলনা", price: "৳৬৫০", stock: 120, status: "In Stock", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDN7P6f248ZyWilkiqmtHN332jWtuKfRNW5Pb02o5y9FmSlXEUqaNHCDMMqoUADbrXEFxcE2nS9iQWu2MSO77j7IWBt30Z_0xkEnOThOFXS3AwPLh-Mqji-lDYgfkOdZ2mlWjRT4meVrLnUzzFtwsPilFHMhoWUX4LSExj7tj4fjd0-8mMRy5B038_dvRIcbg2o9jqFuAV7lQnoZq-6uvvOKBeqE1m45Moj8XYZHr7A4H2QZkqmHSG3" },
    { id: "PRD-005", name: "সিলিকন বেবি টিদার", category: "এসেনশিয়ালস", price: "৳৩৫০", stock: 5, status: "Low Stock", img: null }
  ];

  const getStockBadge = (status: string) => {
    switch(status) {
      case "In Stock": return <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">In Stock</span>;
      case "Low Stock": return <span className="inline-block px-2.5 py-1 rounded-md bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/20">Low Stock</span>;
      case "Out of Stock": return <span className="inline-block px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">Out of Stock</span>;
      default: return <span className="px-2.5 py-1 rounded-md bg-gray-500/10 text-gray-400 text-xs font-bold border border-gray-500/20">{status}</span>;
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Products</h2>
          <p className="text-gray-400 mt-1 text-sm md:text-base">Manage your store catalog and inventory.</p>
        </div>
        <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#F49547] hover:bg-[#F49547]/90 text-white font-bold py-2.5 px-5 rounded-lg transition-colors shadow-lg shadow-[#F49547]/20">
          <Plus size={18} /> Add New Product
        </button>
      </div>

      <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-[400px] group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#F49547] transition-colors" size={18} />
          <input type="text" placeholder="Search products by name or ID..." className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:border-[#F49547]/50 focus:ring-1 focus:ring-[#F49547]/50 transition-all outline-none placeholder-gray-600" />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select className="flex-1 md:flex-none bg-[#0a0a0a] border border-[#1f1f1f] text-gray-300 rounded-lg text-sm py-2.5 px-4 outline-none focus:border-[#F49547]/50 appearance-none cursor-pointer">
            <option value="">All Categories</option>
            <option value="clothing">পোশাক</option>
            <option value="toys">খেলনা</option>
            <option value="essentials">এসেনশিয়ালস</option>
          </select>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0a0a0a] border border-[#1f1f1f] text-gray-300 rounded-lg text-sm hover:text-white hover:border-gray-700 transition-colors">
            <Filter size={16} /> <span className="hidden md:inline">Filter</span>
          </button>
        </div>
      </div>

      <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#0a0a0a] text-gray-500 uppercase text-xs tracking-wider border-b border-[#1f1f1f]">
                <th className="py-4 px-6 font-medium">Product</th>
                <th className="py-4 px-6 font-medium">Category</th>
                <th className="py-4 px-6 font-medium">Price</th>
                <th className="py-4 px-6 font-medium">Stock</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products.map((product, idx) => (
                <tr key={idx} className="border-b border-[#1f1f1f] hover:bg-[#161616] transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] p-1 flex shrink-0 items-center justify-center overflow-hidden">
                        {product.img ? <img src={product.img} alt={product.name} className="w-full h-full object-cover rounded-md opacity-90 group-hover:opacity-100 transition-opacity" /> : <ImageIcon size={20} className="text-gray-600" />}
                      </div>
                      <div>
                        <div className="text-gray-200 font-medium group-hover:text-[#F49547] transition-colors line-clamp-1">{product.name}</div>
                        <div className="text-xs text-gray-500 font-mono mt-0.5">{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-400">{product.category}</td>
                  <td className="py-4 px-6 text-white font-medium">{product.price}</td>
                  <td className="py-4 px-6 text-gray-300">{product.stock > 0 ? <span>{product.stock} <span className="text-xs text-gray-500">pcs</span></span> : <span className="text-gray-600">-</span>}</td>
                  <td className="py-4 px-6">{getStockBadge(product.status)}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-3 text-gray-500">
                      <button className="hover:text-white transition-colors" title="Edit Product"><Edit size={18} /></button>
                      <button className="hover:text-red-400 transition-colors" title="Delete"><Trash2 size={18} /></button>
                      <button className="hover:text-gray-300 transition-colors" title="More"><MoreVertical size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-[#1f1f1f] flex items-center justify-between text-sm text-gray-500">
          <div>Showing 1 to 5 of 45 products</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-[#0a0a0a] border border-[#1f1f1f] rounded hover:text-white hover:border-gray-700 transition-colors disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 bg-[#F49547]/10 text-[#F49547] border border-[#F49547]/20 rounded font-bold">1</button>
            <button className="px-3 py-1 bg-[#0a0a0a] border border-[#1f1f1f] rounded hover:text-white hover:border-gray-700 transition-colors">2</button>
            <button className="px-3 py-1 bg-[#0a0a0a] border border-[#1f1f1f] rounded hover:text-white hover:border-gray-700 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </>
  );
}