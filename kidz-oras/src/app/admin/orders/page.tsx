"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { 
  Menu, Bell, Search, Filter, Copy, CheckCircle2, MapPin, 
  Eye, Edit, X, Star, ShieldCheck, AlertTriangle, Truck, Save
} from "lucide-react";

// --- Mock Data ---
const mockOrders = [
  {
    id: "#KO-1005",
    customerName: "হাসিব আল হাসান",
    phone: "01712345678",
    address: "মিরপুর ১০, ঢাকা",
    paymentMethod: "COD",
    date: "Sep 05, 2026",
    time: "02:30 PM",
    itemDesc: "Baby Romper Set (Blue, 12M)",
    productCode: "BRS-902",
    itemsCount: 2,
    totalAmount: "৳ ১,২৬০",
    status: "Pending",
    merchant: "Steadfast",
    parcelId: "SF-8839201",
    customerStats: {
      successRate: 98,
      totalOrders: 12,
      canceled: 0,
      behavior: "খুবই ভদ্র (Polite)",
      type: "Premium Customer"
    },
    notes: "প্যাকিং করার সময় সাইজ ডাবল চেক করতে হবে।"
  },
  {
    id: "#KO-1004",
    customerName: "সাদিয়া ইসলাম",
    phone: "01987654321",
    address: "ধানমন্ডি ২৭, ঢাকা",
    paymentMethod: "bKash",
    date: "Sep 04, 2026",
    time: "11:15 AM",
    itemDesc: "Kids Winter Jacket",
    productCode: "KWJ-105",
    itemsCount: 1,
    totalAmount: "৳ ৬৫০",
    status: "Processing",
    merchant: "RedX",
    parcelId: "RX-992100",
    customerStats: {
      successRate: 85,
      totalOrders: 4,
      canceled: 1,
      behavior: "স্বাভাবিক (Normal)",
      type: "Regular Customer"
    },
    notes: "কাস্টমার সকালে ডেলিভারি চায়।"
  }
];

export default function OrdersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Copy Function
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Copy All Details Function
  const handleCopyAll = (order: typeof mockOrders[0]) => {
    const allDetails = `Order ID: ${order.id}\nCustomer: ${order.customerName}\nPhone: ${order.phone}\nAddress: ${order.address}\nItems: ${order.itemDesc} (${order.productCode})\nTotal: ${order.totalAmount}\nMerchant: ${order.merchant} (${order.parcelId})`;
    handleCopy(allDetails, `${order.id}-all`);
  };

  return (
    <div className="bg-[#050505] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#F49547]/30 flex">
      
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-[260px] flex flex-col min-h-screen w-full relative">
        
        {/* Header */}
        <header className="bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-30 border-b border-[#1f1f1f] flex justify-between items-center h-16 px-4 md:px-8">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-400 hover:text-[#F49547] p-2 rounded-lg">
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-[#121212] border border-[#1f1f1f] rounded-full px-4 py-2 w-full max-w-xl focus-within:border-[#F49547]/50 transition-all">
              <Search size={18} className="text-gray-500" />
              <input 
                type="text" 
                placeholder="Search by Order ID, Customer, or Phone..." 
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-600 focus:ring-0"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#1a1a1a] transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F49547] rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Orders Content */}
        <main className="p-4 md:p-8 space-y-6 w-full">
          
          {/* Top Section: Title & Filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">All Orders</h2>
              <p className="text-gray-400 mt-1 text-sm">Manage, track, and analyze customer orders.</p>
            </div>
            
            {/* 🔴 Updated Filter Button (White Mark) */}
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#121212] hover:bg-[#1a1a1a] border border-[#1f1f1f] rounded-xl text-sm font-medium transition-colors"
              >
                <Filter size={16} className={isFilterOpen ? "text-[#F49547]" : "text-gray-400"} />
                <span>Filter</span>
              </button>

              {/* Filter Dropdown Dummy */}
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#121212] border border-[#1f1f1f] rounded-xl shadow-2xl p-4 z-20">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Filter By</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between p-2 hover:bg-[#1a1a1a] rounded-lg cursor-pointer">
                      <span>Date & Time</span> <div className="w-4 h-4 border border-gray-600 rounded"></div>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-[#1a1a1a] rounded-lg cursor-pointer">
                      <span>Amount</span> <div className="w-4 h-4 border border-gray-600 rounded"></div>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-[#1a1a1a] rounded-lg cursor-pointer">
                      <span>Payment Method</span> <div className="w-4 h-4 border border-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Orders Table Area */}
          <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-[#0a0a0a]/50 text-gray-400 text-[11px] uppercase tracking-widest border-b border-[#1f1f1f]">
                    <th className="py-4 px-6 font-semibold">ORDER ID & DATE</th>
                    <th className="py-4 px-6 font-semibold">CUSTOMER INFO</th>
                    <th className="py-4 px-6 font-semibold">ITEM DETAILS</th>
                    <th className="py-4 px-6 font-semibold">LOGISTICS & TRACKING</th>
                    <th className="py-4 px-6 font-semibold">STATUS</th>
                    <th className="py-4 px-6 font-semibold text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="border-b border-[#1f1f1f] hover:bg-[#161616] transition-colors group">
                      
                      {/* Column 1: Order ID & Date */}
                      <td className="py-4 px-6 align-top">
                        <p className="font-mono text-white font-semibold">{order.id}</p>
                        <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                        <p className="text-xs text-gray-600">{order.time}</p>
                        <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-[10px] text-gray-400 font-medium">
                          {order.paymentMethod === 'COD' ? '💵' : '📱'} {order.paymentMethod}
                        </div>
                      </td>

                      {/* Column 2: Customer (Green & Purple Mark) */}
                      <td className="py-4 px-6 align-top">
                        <p className="text-gray-200 font-semibold mb-1">{order.customerName}</p>
                        
                        <div className="flex items-center gap-2 mb-1.5 group/copy">
                          <p className="text-xs text-gray-400 font-mono bg-[#1a1a1a] px-1.5 py-0.5 rounded">{order.phone}</p>
                          <button onClick={() => handleCopy(order.phone, `${order.id}-phone`)} className="text-gray-500 hover:text-[#F49547] transition-colors">
                            {copiedId === `${order.id}-phone` ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                          </button>
                        </div>

                        {/* Purple Mark: Address Highlight */}
                        <div className="flex items-start gap-1.5 text-xs text-gray-500 mt-2">
                          <MapPin size={12} className="text-gray-600 mt-0.5 flex-shrink-0" />
                          <p className="line-clamp-2 leading-relaxed">{order.address}</p>
                        </div>
                      </td>

                      {/* Column 3: Items (Yellow Mark) */}
                      <td className="py-4 px-6 align-top max-w-[200px]">
                        <p className="text-gray-300 text-sm mb-1.5 line-clamp-2">{order.itemDesc}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-[#F49547] bg-[#F49547]/10 px-2 py-0.5 rounded border border-[#F49547]/20">
                            {order.productCode}
                          </span>
                          <button onClick={() => handleCopy(order.productCode, `${order.id}-code`)} className="text-gray-500 hover:text-[#F49547] transition-colors">
                            {copiedId === `${order.id}-code` ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 font-medium">Qty: {order.itemsCount} <span className="mx-1">•</span> <span className="text-white">{order.totalAmount}</span></p>
                      </td>

                      {/* Column 4: Logistics (Red Mark) */}
                      <td className="py-4 px-6 align-top">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Truck size={14} className={order.merchant === 'Steadfast' ? "text-blue-400" : "text-red-400"} />
                          <span className="text-xs font-semibold text-gray-300">{order.merchant}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-xs text-gray-400 font-mono bg-[#1a1a1a] px-1.5 py-0.5 rounded border border-[#2a2a2a]">{order.parcelId}</p>
                          <button onClick={() => handleCopy(order.parcelId, `${order.id}-parcel`)} className="text-gray-500 hover:text-[#F49547] transition-colors">
                            {copiedId === `${order.id}-parcel` ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                          </button>
                        </div>
                        <button className="flex items-center gap-1 text-[11px] text-[#F49547] hover:text-white font-medium transition-colors">
                          <MapPin size={12} /> Track Parcel
                        </button>
                      </td>

                      {/* Column 5: Status */}
                      <td className="py-4 px-6 align-top">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
                          order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                          'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'Pending' ? 'bg-yellow-500' : 'bg-blue-400'}`}></span> 
                          {order.status}
                        </span>
                      </td>

                      {/* Column 6: Action (Blue Mark) */}
                      <td className="py-4 px-6 align-top text-center">
                        <div className="flex items-center justify-center gap-3">
                          {/* Eye Icon (Opens Modal) */}
                          <button onClick={() => setSelectedOrder(order)} className="text-gray-400 hover:text-blue-400 transition-colors p-1.5 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] hover:border-blue-400/30">
                            <Eye size={16} />
                          </button>
                          
                          {/* Edit Icon */}
                          <button className="text-gray-400 hover:text-emerald-400 transition-colors p-1.5 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] hover:border-emerald-400/30">
                            <Edit size={16} />
                          </button>
                          
                          {/* Copy All Details (Replaced Delete) */}
                          <button onClick={() => handleCopyAll(order)} className="text-gray-400 hover:text-[#F49547] transition-colors p-1.5 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] hover:border-[#F49547]/30" title="Copy All Details">
                            {copiedId === `${order.id}-all` ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Placeholder */}
            <div className="p-4 border-t border-[#1f1f1f] flex justify-between items-center text-sm text-gray-500">
              <span>Showing 1 to 2 of 24 orders</span>
              <div className="flex gap-1">
                <button className="px-3 py-1 bg-[#1a1a1a] rounded border border-[#2a2a2a] hover:bg-[#252525]">Prev</button>
                <button className="px-3 py-1 bg-[#F49547] text-white rounded font-medium">1</button>
                <button className="px-3 py-1 bg-[#1a1a1a] rounded border border-[#2a2a2a] hover:bg-[#252525]">2</button>
                <button className="px-3 py-1 bg-[#1a1a1a] rounded border border-[#2a2a2a] hover:bg-[#252525]">Next</button>
              </div>
            </div>
          </div>
        </main>

        {/* ---------------- Customer Details Slide-over Modal (Eye Icon Click) ---------------- */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedOrder(null)}
            />
            
            {/* Slide-over Panel */}
            <div className="relative w-full max-w-md bg-[#121212] h-full shadow-2xl border-l border-[#1f1f1f] flex flex-col animate-in slide-in-from-right duration-300">
              
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-[#1f1f1f] bg-[#0a0a0a]">
                <div>
                  <h3 className="text-lg font-bold text-white">Customer Insights</h3>
                  <p className="text-xs text-gray-500 font-mono mt-1">Order: {selectedOrder.id}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 text-gray-400 hover:text-white bg-[#1a1a1a] rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {/* Profile Section */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#F49547]/10 border border-[#F49547]/20 flex items-center justify-center text-xl font-bold text-[#F49547]">
                    {selectedOrder.customerName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white leading-tight">{selectedOrder.customerName}</h2>
                    <p className="text-sm text-gray-400 font-mono mt-1">{selectedOrder.phone}</p>
                  </div>
                </div>

                {/* Badges (Premium, Polite) */}
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-bold text-purple-400">
                    <Star size={14} /> {selectedOrder.customerStats.type}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400">
                    <ShieldCheck size={14} /> {selectedOrder.customerStats.behavior}
                  </div>
                </div>

                {/* Delivery Success Rate Progress */}
                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a]">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm text-gray-400 font-medium">Delivery Success Rate</span>
                    <span className="text-xl font-bold text-white">{selectedOrder.customerStats.successRate}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#121212] rounded-full overflow-hidden border border-[#2a2a2a]">
                    <div 
                      className={`h-full rounded-full ${selectedOrder.customerStats.successRate > 80 ? 'bg-emerald-500' : 'bg-yellow-500'}`} 
                      style={{ width: `${selectedOrder.customerStats.successRate}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-3 font-medium">
                    <span>Total Orders: <strong className="text-white">{selectedOrder.customerStats.totalOrders}</strong></span>
                    <span className="flex items-center gap-1"><AlertTriangle size={12} className="text-red-400"/> Canceled: <strong className="text-red-400">{selectedOrder.customerStats.canceled}</strong></span>
                  </div>
                </div>

                {/* Logistics Info */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Assigned Logistics</h4>
                  <div className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#121212] rounded-lg">
                        <Truck size={18} className={selectedOrder.merchant === 'Steadfast' ? "text-blue-400" : "text-red-400"} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{selectedOrder.merchant}</p>
                        <p className="text-xs text-gray-500 font-mono">{selectedOrder.parcelId}</p>
                      </div>
                    </div>
                    <button className="text-xs font-medium bg-[#121212] border border-[#2a2a2a] px-3 py-1.5 rounded-lg hover:text-[#F49547] hover:border-[#F49547]/50 transition-colors">
                      Track
                    </button>
                  </div>
                </div>

                {/* Notes Section */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Admin Notes</h4>
                  <div className="relative">
                    <textarea 
                      defaultValue={selectedOrder.notes}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 text-sm text-gray-300 focus:outline-none focus:border-[#F49547]/50 min-h-[120px] resize-none"
                      placeholder="Add specific notes about this customer or order..."
                    ></textarea>
                    <button className="absolute bottom-3 right-3 p-2 bg-[#F49547] text-white rounded-lg hover:bg-[#d87c33] transition-colors shadow-lg">
                      <Save size={16} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}