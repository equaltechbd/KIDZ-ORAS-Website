"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast, Toaster } from "react-hot-toast";
import { ShoppingBag, CreditCard, MapPin, Phone, User, CheckCircle2 } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ডামি কার্ট ডেটা (আপাতত টেস্টিংয়ের জন্য)
  const cart = [
    {
      id: "PRD-001",
      name: "কিউট বেবি সুতি রমপার - প্রিমিয়াম",
      price: 600,
      quantity: 1,
      variant: "12 Months / Red",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALG52l4H597Zus4CpnjmcgrWB9leinNtFPsCznTWr7puoP653tLm4mLY8ocqBA5kLsoHp97bYlnMLx1NDdeQxeuvp-paVAAh7QijRbSDO_LSf6nLa8j8lkRHBP67ghM13lQRHZ3203sba1Q8T1zqH7Ij1gZSyMEucuq2ZsL9WjvRbVtov32GG_HRrPoy5WBIZKk_L2zB8fmsD4u4vSvn4Dxi9MO-O6nTWqYnQP5-UitwjibcTjOB_v_KZktagBcaqypQ"
    }
  ];

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryCharge = 60; // ঢাকার ভেতরে
  const totalAmount = subtotal + deliveryCharge;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // ১. কাস্টমার চেক বা ক্রিয়েট করা
      let customerId;
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('id')
        .eq('phone', formData.phone)
        .single();

      if (existingCustomer) {
        customerId = existingCustomer.id;
        // কাস্টমারের অর্ডার সংখ্যা আপডেট করা
        await supabase.rpc('increment_customer_orders', { customer_id: customerId, amount: totalAmount });
      } else {
        const { data: newCustomer, error: customerError } = await supabase
          .from('customers')
          .insert([{
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            total_orders: 1,
            total_spent: totalAmount
          }])
          .select()
          .single();
        
        if (customerError) throw customerError;
        customerId = newCustomer.id;
      }

      // ২. অর্ডার ক্রিয়েট করা
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          customer_id: customerId,
          subtotal: subtotal,
          delivery_charge: deliveryCharge,
          total_amount: totalAmount,
          shipping_address: formData.address,
          customer_notes: formData.notes
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // ৩. অর্ডারের আইটেমগুলো সেভ করা
      const orderItems = cart.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        product_name: item.name,
        price: item.price,
        quantity: item.quantity,
        variant: item.variant
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // সাকসেস হলে কনফার্মেশন পেজে পাঠানো
      toast.success("অর্ডার সফলভাবে সম্পন্ন হয়েছে!");
      router.push(`/order-success?id=${orderData.id}`);

    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error("অর্ডার সম্পন্ন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#050505] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#F49547]/30">
      <Toaster position="top-center" />
      
      {/* Simple Header */}
      <header className="bg-[#0a0a0a] border-b border-[#1f1f1f] h-16 flex items-center justify-center sticky top-0 z-50">
        <h1 className="text-xl font-bold text-white tracking-wide">KIDZ ORAS</h1>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">নিরাপদ চেকআউট</h2>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Checkout Form */}
          <div className="flex-1 space-y-6">
            <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <MapPin size={20} className="text-[#F49547]" /> ডেলিভারি ইনফরমেশন
              </h3>
              
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">আপনার নাম *</label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="যেমন: হাসিব আল হাসান" 
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#F49547]/50" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">মোবাইল নাম্বার *</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                      required
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="যেমন: 017XXXXXXXX" 
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-3 pl-11 pr-4 text-sm text-white font-mono focus:outline-none focus:border-[#F49547]/50" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">সম্পূর্ণ ঠিকানা *</label>
                  <textarea 
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3} 
                    placeholder="আপনার এলাকার নাম, রাস্তা, হাউজ নাম্বার বিস্তারিত লিখুন..." 
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#F49547]/50 resize-none"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">অতিরিক্ত নোট (ঐচ্ছিক)</label>
                  <textarea 
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={2} 
                    placeholder="ডেলিভারিম্যানের জন্য কোনো নির্দেশ থাকলে লিখুন..." 
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#F49547]/50 resize-none"
                  ></textarea>
                </div>
              </form>
            </div>

            <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard size={20} className="text-[#F49547]" /> পেমেন্ট মেথড
              </h3>
              <div className="border border-[#F49547]/50 bg-[#F49547]/10 p-4 rounded-xl flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#F49547] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div>
                  <p className="font-bold text-white">ক্যাশ অন ডেলিভারি (COD)</p>
                  <p className="text-xs text-gray-400 mt-0.5">প্রোডাক্ট হাতে পেয়ে টাকা পরিশোধ করুন।</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6 md:p-8 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#F49547]" /> অর্ডার সামারি
              </h3>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-[#1f1f1f] pb-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-[#2a2a2a]" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.variant} • {item.quantity} পিস</p>
                      <p className="text-sm font-bold text-[#F49547] mt-1">৳{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm border-b border-[#1f1f1f] pb-4 mb-4">
                <div className="flex justify-between text-gray-400">
                  <span>সাবটোটাল</span>
                  <span className="text-white font-medium">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>ডেলিভারি চার্জ (ঢাকা)</span>
                  <span className="text-white font-medium">৳{deliveryCharge}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-white">সর্বমোট</span>
                <span className="text-2xl font-bold text-[#F49547]">৳{totalAmount}</span>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#F49547] hover:bg-[#d87c33] disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-[#F49547]/20 text-lg"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CheckCircle2 size={22} /> অর্ডার কনফার্ম করুন
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-gray-500 mt-3">
                অর্ডার কনফার্ম করার মাধ্যমে আপনি আমাদের শর্তাবলীতে সম্মত হচ্ছেন।
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}