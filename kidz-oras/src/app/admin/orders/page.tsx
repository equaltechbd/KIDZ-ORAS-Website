"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { createClient } from "@/utils/supabase/client";
import { toast, Toaster } from "react-hot-toast";
import { 
  Menu, Bell, Search, Filter, Copy, CheckCircle2, MapPin, 
  Eye, Edit, X, Star, ShieldCheck, AlertTriangle, Truck, Save, Loader2, RefreshCw
} from "lucide-react";

export default function OrdersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Real-time states
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const supabase = createClient();

  // ১. ডাটাবেস থেকে অর্ডার ফেচ করা
  const fetchOrders = async () => {
    setIsLoading(true);
    // orders টেবিল থেকে অর্ডার এবং কাস্টমার ডিটেইলস নিয়ে আসা
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        customers (
          total_orders,
          total_spent
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      toast.error("অর্ডার লোড করতে সমস্যা হয়েছে!");
    } else {
      setOrders(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();

    // Real-time listener for new orders
    const orderSubscription = supabase
      .channel('realtime-orders-admin')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, () => {
        fetchOrders();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(orderSubscription);
    };
  }, [supabase]);

  // ২. অর্ডারের স্ট্যাটাস আপডেট করা
  const updateOrderStatus = async (id: string, newStatus: string) => {
    setIsUpdating(true);
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast.error("স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে!");
    } else {
      toast.success(`অর্ডারের স্ট্যাটাস '${newStatus}' করা হয়েছে!`);
      // Update local state to reflect change instantly
      setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
    }
    setIsUpdating(false);
  };

  // Copy Function
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Format Date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  // Customer Type Logic
  const getCustomerType = (ordersCount: number) => {
    if (ordersCount >= 5) return "Premium Customer";
    if (ordersCount >= 2) return "Regular Customer";
    return "New Customer";
  };

  return (
    <div className="bg-[#050505] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#F49547]/30 flex">
      <Toaster position="top-center" />
      
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
            <button onClick={fetchOrders} className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#1a1a1a] transition-colors relative" title="Refresh Orders">
              <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
            </button>
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
            
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#121212] hover:bg-[#1a1a1a] border border-[#1f1f1f] rounded-xl text-sm font-medium transition-colors"
              >
                <Filter size={16} className={isFilterOpen ? "text-[#F49547]" : "text-gray-400"} />
                <span>Filter</span>
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#121212] border border-[#1f1f1f] rounded-xl shadow-2xl p-4 z-20">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Filter By Status</h4>
                  <div className="space-y-3 text-sm">
                    <label className="flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-lg cursor-pointer">
                      <input type="checkbox" className="accent-[#F49547]" defaultChecked /> <span className="text-gray-300">Pending</span>
                    </label>
                    <label className="flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-lg cursor-pointer">
                      <input type="checkbox" className="accent-[#F49547]" defaultChecked /> <span className="text-gray-300">Confirmed</span>
                    </label>
                    <label className="flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-lg cursor-pointer">
                      <input type="checkbox" className="accent-[#F49547]" defaultChecked /> <span className="text-gray-300">Delivered</span>
                    </label>
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
                    <th className="py-4 px-6 font-semibold">ADDRESS</th>
                    <th className="py-4 px-6 font-semibold">AMOUNT & METHOD</th>
                    <th className="py-4 px-6 font-semibold">STATUS</th>
                    <th className="py-4 px-6 font-semibold text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-500">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#F49547]" />
                        Loading real-time orders...
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-500">
                        এখনো কোনো নতুন অর্ডার আসেনি।
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => {
                      const { date, time } = formatDate(order.created_at);
                      
                      return (
                        <tr key={order.id} className="border-b border-[#1f1f1f] hover:bg-[#161616] transition-colors group">
                          
                          {/* Column 1: Order ID & Date */}
                          <td className="py-4 px-6 align-top">
                            <p className="font-mono text-white font-semibold">#{order.order_number?.split('-')[0] || order.id.split('-')[0].toUpperCase()}</p>
                            <p className="text-xs text-gray-500 mt-1">{date}</p>
                            <p className="text-xs text-gray-600">{time}</p>
                          </td>

                          {/* Column 2: Customer */}
                          <td className="py-4 px-6 align-top">
                            <p className="text-gray-200 font-semibold mb-1">{order.customer_name || "Guest User"}</p>
                            <div className="flex items-center gap-2 mb-1.5 group/copy">
                              <p className="text-xs text-gray-400 font-mono bg-[#1a1a1a] px-1.5 py-0.5 rounded border border-[#2a2a2a]">{order.customer_phone}</p>
                              <button onClick={() => handleCopy(order.customer_phone, `${order.id}-phone`)} className="text-gray-500 hover:text-[#F49547] transition-colors">
                                {copiedId === `${order.id}-phone` ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                              </button>
                            </div>
                            <div className="mt-2 text-[10px] text-gray-500 font-medium">
                              {order.customers?.total_orders ? `${order.customers.total_orders} Total Orders` : 'First Time Order'}
                            </div>
                          </td>

                          {/* Column 3: Address */}
                          <td className="py-4 px-6 align-top max-w-[200px]">
                            <div className="flex items-start gap-1.5 text-xs text-gray-400">
                              <MapPin size={12} className="text-gray-500 mt-0.5 flex-shrink-0" />
                              <p className="line-clamp-3 leading-relaxed">{order.shipping_address || order.customer_address}</p>
                            </div>
                          </td>

                          {/* Column 4: Amount */}
                          <td className="py-4 px-6 align-top">
                            <p className="text-white font-bold mb-1">৳ {order.total_amount}</p>
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-[10px] text-gray-400 font-medium">
                              {order.payment_method === 'COD' ? '💵' : '💳'} {order.payment_method || 'COD'}
                            </div>
                          </td>

                          {/* Column 5: Status (Editable) */}
                          <td className="py-4 px-6 align-top">
                            <select 
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              disabled={isUpdating}
                              className={`appearance-none outline-none border text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer ${
                                order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                                order.status === 'Confirmed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                'bg-red-500/10 text-red-400 border-red-500/20'
                              }`}
                            >
                              <option value="Pending" className="bg-[#121212] text-white">Pending</option>
                              <option value="Confirmed" className="bg-[#121212] text-white">Confirmed</option>
                              <option value="Delivered" className="bg-[#121212] text-white">Delivered</option>
                              <option value="Cancelled" className="bg-[#121212] text-white">Cancelled</option>
                            </select>
                          </td>

                          {/* Column 6: Action */}
                          <td className="py-4 px-6 align-top text-center">
                            <div className="flex items-center justify-center gap-3">
                              {/* Eye Icon (Opens Modal) */}
                              <button onClick={() => setSelectedOrder(order)} className="text-gray-400 hover:text-blue-400 transition-colors p-1.5 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] hover:border-blue-400/30">
                                <Eye size={16} />
                              </button>
                            </div>
                          </td>

                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* ---------------- Customer Details Slide-over Modal (Eye Icon Click) ---------------- */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
            
            <div className="relative w-full max-w-md bg-[#121212] h-full shadow-2xl border-l border-[#1f1f1f] flex flex-col animate-in slide-in-from-right duration-300">
              
              <div className="flex justify-between items-center p-6 border-b border-[#1f1f1f] bg-[#0a0a0a]">
                <div>
                  <h3 className="text-lg font-bold text-white">Customer Insights</h3>
                  <p className="text-xs text-gray-500 font-mono mt-1">Order: #{selectedOrder.order_number?.split('-')[0] || selectedOrder.id.split('-')[0].toUpperCase()}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 text-gray-400 hover:text-white bg-[#1a1a1a] rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {/* Profile Section */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#F49547]/10 border border-[#F49547]/20 flex items-center justify-center text-xl font-bold text-[#F49547]">
                    {(selectedOrder.customer_name || 'G').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white leading-tight">{selectedOrder.customer_name || 'Guest User'}</h2>
                    <p className="text-sm text-gray-400 font-mono mt-1">{selectedOrder.customer_phone}</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-bold text-purple-400">
                    <Star size={14} /> {getCustomerType(selectedOrder.customers?.total_orders || 1)}
                  </div>
                </div>

                {/* Lifetime Value */}
                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a]">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Customer History</h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Total Spent</span>
                    <span className="text-lg font-bold text-white">৳ {selectedOrder.customers?.total_spent || selectedOrder.total_amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Total Orders</span>
                    <span className="text-lg font-bold text-white">{selectedOrder.customers?.total_orders || 1}</span>
                  </div>
                </div>

                {/* Order Notes Section */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Customer Notes</h4>
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 text-sm text-gray-300 min-h-[80px]">
                    {selectedOrder.customer_notes ? selectedOrder.customer_notes : <span className="text-gray-600 italic">No notes provided by the customer.</span>}
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