"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { 
  Menu, Bell, Search, Copy, CheckCircle2, MoreVertical, 
  MapPin, Phone, Mail, Edit, Trash2, X, Star, ShieldCheck, 
  AlertTriangle, Save, UserCheck
} from "lucide-react";

// --- Mock Data ---
const initialCustomers = [
  {
    id: "CUST-001",
    name: "রাকিব হাসান",
    phone: "01711223344",
    email: "rakib@email.com",
    address: "ধানমন্ডি ২৭, ঢাকা",
    totalOrders: 5,
    totalSpent: "৳4500",
    isVip: true,
    stats: {
      successRate: 100,
      canceled: 0,
      behavior: "ভদ্র ও নিয়মিত (Polite & Regular)",
      type: "Premium VIP"
    },
    notes: "খুবই ভালো কাস্টমার। সবসময় ডেলিভারি চার্জ আগে পে করে।"
  },
  {
    id: "CUST-002",
    name: "তাসনিম আক্তার",
    phone: "01822334455",
    email: "tasnim@email.com",
    address: "মিরপুর ১০, ঢাকা",
    totalOrders: 1,
    totalSpent: "৳850",
    isVip: false,
    stats: {
      successRate: 50,
      canceled: 1,
      behavior: "তেড়া / সন্দিহান (Suspicious)",
      type: "New Customer"
    },
    notes: "প্রোডাক্ট খুলে চেক করতে চায়। ডেলিভারিম্যানকে একটু সাবধান থাকতে বলতে হবে।"
  },
  {
    id: "CUST-003",
    name: "মাহমুদুল করিম",
    phone: "01933445566",
    email: "mahmudul@email.com",
    address: "গুলশান ২, ঢাকা",
    totalOrders: 12,
    totalSpent: "৳15200",
    isVip: true,
    stats: {
      successRate: 98,
      canceled: 0,
      behavior: "চমৎকার (Excellent)",
      type: "Loyal Customer"
    },
    notes: "আমাদের সবচাইতে পুরোনো কাস্টমারদের একজন। গিফট পাঠানো যেতে পারে।"
  }
];

export default function CustomersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  
  // Copy & Dropdown States
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<typeof initialCustomers[0] | null>(null);

  // Copy Function
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Copy All Function
  const handleCopyAll = (c: typeof initialCustomers[0]) => {
    const allDetails = `Name: ${c.name}\nPhone: ${c.phone}\nEmail: ${c.email}\nAddress: ${c.address}\nTotal Spent: ${c.totalSpent}`;
    handleCopy(allDetails, `${c.id}-all`);
  };

  const openEditDrawer = (customer: typeof initialCustomers[0]) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
    setActiveDropdown(null);
  };

  // 🔴 Live Search Filter Logic 🔴
  const filteredCustomers = initialCustomers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {/* Content */}
        <main className="p-4 md:p-8 space-y-6 w-full pb-20">
          
          {/* Top Section & Live Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#F49547]/10 text-[#F49547] rounded-xl border border-[#F49547]/20">
                <UserCheck size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">কাস্টমার লিস্ট</h2>
                <p className="text-gray-400 mt-0.5 text-sm">Manage and track your customer details.</p>
              </div>
            </div>

            {/* Functional Search Bar */}
            <div className="relative w-full md:max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#F49547] transition-colors" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="নাম, নাম্বার, ইমেইল বা ঠিকানা দিয়ে খুঁজুন..." 
                className="w-full bg-[#121212] border border-[#1f1f1f] rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:border-[#F49547]/50 focus:ring-1 focus:ring-[#F49547]/50 transition-all outline-none placeholder-gray-600 shadow-sm" 
              />
            </div>
          </div>

          {/* Customers Table (Dark Theme) */}
          <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-[#0a0a0a]/50 text-gray-400 text-xs tracking-wider border-b border-[#1f1f1f]">
                    <th className="py-4 px-6 font-semibold">কাস্টমার</th>
                    <th className="py-4 px-6 font-semibold">কন্টাক্ট ইনফো</th>
                    <th className="py-4 px-6 font-semibold">ঠিকানা</th>
                    <th className="py-4 px-6 font-semibold text-center">মোট অর্ডার</th>
                    <th className="py-4 px-6 font-semibold text-right">মোট খরচ</th>
                    <th className="py-4 px-6 font-semibold text-center">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="border-b border-[#1f1f1f] hover:bg-[#161616] transition-colors group">
                        
                        {/* Customer Info */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#2a2a2a] border border-[#333] flex items-center justify-center font-bold text-gray-300">
                              {customer.name.charAt(0)}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-200 group-hover:text-white transition-colors">{customer.name}</span>
                              {customer.isVip && (
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-500 text-[10px] font-bold border border-yellow-500/20">
                                  <Star size={10} className="fill-yellow-500" /> VIP
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Contact Info with Individual Copy Buttons */}
                        <td className="py-4 px-6">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Phone size={14} className="text-gray-500" />
                              <span className="text-gray-300 font-mono">{customer.phone}</span>
                              <button onClick={() => handleCopy(customer.phone, `${customer.id}-phone`)} className="text-gray-500 hover:text-[#F49547] transition-colors ml-1">
                                {copiedId === `${customer.id}-phone` ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                              </button>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail size={14} className="text-gray-500" />
                              <span className="text-gray-400 text-xs">{customer.email}</span>
                              <button onClick={() => handleCopy(customer.email, `${customer.id}-email`)} className="text-gray-500 hover:text-[#F49547] transition-colors ml-1">
                                {copiedId === `${customer.id}-email` ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Address with Copy Button */}
                        <td className="py-4 px-6">
                          <div className="flex items-start gap-2 max-w-[200px]">
                            <MapPin size={14} className="text-gray-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-400 text-sm line-clamp-2">{customer.address}</span>
                            <button onClick={() => handleCopy(customer.address, `${customer.id}-address`)} className="text-gray-500 hover:text-[#F49547] transition-colors ml-1 mt-0.5 flex-shrink-0">
                              {copiedId === `${customer.id}-address` ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                            </button>
                          </div>
                        </td>

                        {/* Stats */}
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
                            {customer.totalOrders} টি
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-[#F49547]">
                          {customer.totalSpent}
                        </td>

                        {/* Actions (Copy All + Dropdown) */}
                        <td className="py-4 px-6 text-center relative">
                          <div className="flex items-center justify-center gap-2">
                            
                            {/* 🔴 Copy All Details Button */}
                            <button 
                              onClick={() => handleCopyAll(customer)} 
                              className="text-gray-400 hover:text-emerald-400 transition-colors p-1.5 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] hover:border-emerald-400/30" 
                              title="Copy All Info"
                            >
                              {copiedId === `${customer.id}-all` ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                            </button>

                            {/* 🔴 Three Dots Menu */}
                            <button 
                              onClick={() => setActiveDropdown(activeDropdown === customer.id ? null : customer.id)}
                              className="text-gray-400 hover:text-white transition-colors p-1.5 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]"
                            >
                              <MoreVertical size={16} />
                            </button>

                            {/* Dropdown Options */}
                            {activeDropdown === customer.id && (
                              <div className="absolute right-10 top-10 w-48 bg-[#121212] border border-[#1f1f1f] rounded-xl shadow-2xl py-2 z-20 text-left">
                                <button 
                                  onClick={() => openEditDrawer(customer)}
                                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-[#F49547] transition-colors"
                                >
                                  <Edit size={14} /> Edit Customer
                                </button>
                                <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-red-400 transition-colors border-t border-[#1f1f1f]">
                                  <Trash2 size={14} /> Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-500">
                        কোনো কাস্টমার পাওয়া যায়নি।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* ---------------- Customer Edit & Insights Drawer ---------------- */}
        {isDrawerOpen && selectedCustomer && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
            
            <div className="relative w-full max-w-md bg-[#121212] h-full shadow-2xl border-l border-[#1f1f1f] flex flex-col animate-in slide-in-from-right duration-300">
              
              {/* Drawer Header */}
              <div className="flex justify-between items-center p-6 border-b border-[#1f1f1f] bg-[#0a0a0a]">
                <div>
                  <h3 className="text-lg font-bold text-white">Edit Customer Profile</h3>
                  <p className="text-xs text-gray-500 font-mono mt-1">Admin Only Access</p>
                </div>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-gray-400 hover:text-white bg-[#1a1a1a] rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                
                {/* Visual Insights Section */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Behavior & Stats (Auto-generated)</h4>
                  
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-bold text-purple-400">
                      <Star size={14} /> {selectedCustomer.stats.type}
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400">
                      <ShieldCheck size={14} /> Behavior: {selectedCustomer.stats.behavior}
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a] mt-2">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm text-gray-400 font-medium">Delivery Success Rate</span>
                      <span className="text-xl font-bold text-white">{selectedCustomer.stats.successRate}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#121212] rounded-full overflow-hidden border border-[#2a2a2a]">
                      <div 
                        className={`h-full rounded-full ${selectedCustomer.stats.successRate > 80 ? 'bg-emerald-500' : selectedCustomer.stats.successRate > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                        style={{ width: `${selectedCustomer.stats.successRate}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-3 font-medium">
                      <span>Total Orders: <strong className="text-white">{selectedCustomer.totalOrders}</strong></span>
                      <span className="flex items-center gap-1"><AlertTriangle size={12} className={selectedCustomer.stats.canceled > 0 ? "text-red-400" : "text-gray-500"}/> Canceled: <strong className={selectedCustomer.stats.canceled > 0 ? "text-red-400" : "text-white"}>{selectedCustomer.stats.canceled}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Editable Form Fields */}
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 border-b border-[#1f1f1f] pb-2">Edit Contact Details</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Full Name</label>
                    <input type="text" defaultValue={selectedCustomer.name} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F49547]/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Phone Number</label>
                    <input type="text" defaultValue={selectedCustomer.phone} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-[#F49547]/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Email Address</label>
                    <input type="email" defaultValue={selectedCustomer.email} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F49547]/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Delivery Address</label>
                    <textarea rows={2} defaultValue={selectedCustomer.address} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F49547]/50 resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Admin Notes (Hidden from customer)</label>
                    <textarea rows={3} defaultValue={selectedCustomer.notes} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-[#F49547]/50 resize-none"></textarea>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-[#1f1f1f] bg-[#0a0a0a] flex gap-3">
                <button onClick={() => setIsDrawerOpen(false)} className="flex-1 py-3 bg-[#1a1a1a] hover:bg-[#252525] border border-[#2a2a2a] rounded-xl text-sm font-semibold text-white transition-colors">
                  Cancel
                </button>
                <button className="flex-1 py-3 bg-[#F49547] hover:bg-[#d87c33] rounded-xl text-sm font-semibold text-white transition-colors shadow-lg shadow-[#F49547]/20 flex items-center justify-center gap-2">
                  <Save size={16} /> Save Changes
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}