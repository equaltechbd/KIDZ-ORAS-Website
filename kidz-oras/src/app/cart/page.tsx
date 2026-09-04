/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Tag } from "lucide-react";

export default function CartPage() {
  // ডেমো কার্ট আইটেম (স্টেট দিয়ে ম্যানেজ করা হয়েছে যাতে পরিমাণ কমানো-বাড়ানো যায়)
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      title: "কিউট বেবি সুতি রমপার - প্রিমিয়াম কোয়ালিটি", 
      price: 600, 
      qty: 1, 
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALG52l4H597Zus4CpnjmcgrWB9leinNtFPsCznTWr7puoP653tLm4mLY8ocqBA5kLsoHp97bYlnMLx1NDdeQxeuvp-paVAAh7QijRbSDO_LSf6nLa8j8lkRHBP67ghM13lQRHZ3203sba1Q8T1zqH7Ij1gZSyMEucuq2ZsL9WjvRbVtov32GG_HRrPoy5WBIZKk_L2zB8fmsD4u4vSvn4Dxi9MO-O6nTWqYnQP5-UitwjibcTjOB_v_KZktagBcaqypQ" 
    },
    { 
      id: 2, 
      title: "জিওমেট্রিক ব্লক সেট কালারফুল ব্রেইন টিজার", 
      price: 850, 
      qty: 2, 
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiNVvtEG3oFqFg05B8OdeQL4kSQdpTXw1ZE3QSusVFz93Q5B2TGxYf-QVDsJDD2h2Q6qVy-Zu37DxTlFyRXMmQdM-yP-CQl4YtGbfh9jt7Xn9SlXIin0eOE3ZC0MaxxUSr1iidBpYP7hwKHFyMv7yWBG7rnM4l-m1SGdsCfpun3f_d2a3-Bx6mpVStn99mBeQqJPbYdxOfYygtY4lq26cLflC8X58WmBwRUoJYO_sfQlDNSGb2XQCG" 
    }
  ]);

  // পরিমাণ (Quantity) আপডেট করার ফাংশন
  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  // আইটেম ডিলিট করার ফাংশন
  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // টোটাল হিসাব
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const deliveryCharge = 60;
  const total = subtotal > 0 ? subtotal + deliveryCharge : 0;

  return (
    <div className="min-h-screen pb-20 bg-[#F8F9FA] text-[#221a15] font-sans">
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md px-4 md:px-8 py-3 md:py-4 flex items-center justify-between shadow-[0_2px_15px_rgba(0,0,0,0.03)] border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/shop" className="text-gray-700 hover:text-[#E52565] transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg md:text-xl font-bold text-gray-900">আপনার কার্ট</h1>
        </div>
        <div className="bg-[#E52565]/10 text-[#E52565] font-bold text-xs md:text-sm px-3 py-1.5 rounded-full">
          {cartItems.length} আইটেম
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 md:pt-28 max-w-[1200px] mx-auto px-4 md:px-6">
        
        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Cart Items List (Left Side) */}
            <div className="flex-1 flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center">
                  
                  {/* Product Image */}
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-[#F5F5F5] rounded-lg p-2 shrink-0">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-sm md:text-base font-bold text-gray-800 line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="রিমুভ করুন"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="flex items-end justify-between mt-3">
                      <div className="text-lg font-bold text-[#E52565]">৳{item.price}</div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-md bg-white">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)} 
                          className="p-1.5 hover:bg-gray-50 text-gray-600 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-gray-800">{item.qty}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)} 
                          className="p-1.5 hover:bg-gray-50 text-gray-600 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Order Summary (Right Side) */}
            <div className="w-full lg:w-[380px] shrink-0">
              <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100 sticky top-[90px]">
                <h2 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">অর্ডার সামারি</h2>
                
                {/* Promo Code Option */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="relative flex-1">
                    <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="প্রোমো কোড (যদি থাকে)" 
                      className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-sm outline-none focus:border-[#E52565]/50 focus:bg-white transition-all"
                    />
                  </div>
                  <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-900 transition-colors">
                    এপ্লাই
                  </button>
                </div>

                <div className="flex flex-col gap-3 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex justify-between">
                    <span>সাবটোটাল ({cartItems.length} আইটেম)</span>
                    <span className="font-bold text-gray-800">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ডেলিভারি চার্জ (ঢাকা)</span>
                    <span className="font-bold text-gray-800">৳{deliveryCharge}</span>
                  </div>
                  <div className="flex justify-between text-[#E52565]">
                    <span>ডিসকাউন্ট</span>
                    <span className="font-bold">- ৳০</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-end mb-6">
                  <span className="text-base font-bold text-gray-900">সর্বমোট</span>
                  <span className="text-2xl font-bold text-[#E52565]">৳{total}</span>
                </div>
                
                <Link href="/checkout" className="w-full bg-[#E52565] hover:bg-[#E52565]/90 text-white font-bold py-3.5 rounded-lg shadow-md transition-colors text-center flex items-center justify-center gap-2 mb-4">
                  <ShoppingBag size={18} />
                  চেকআউট করুন
                </Link>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <ShieldCheck size={16} className="text-green-500" />
                  <span>১০০% নিরাপদ চেকআউট</span>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* Empty Cart View */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center mb-4">
              <ShoppingCart size={40} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">আপনার কার্ট সম্পূর্ণ খালি!</h2>
            <p className="text-gray-500 mb-6 text-center">মনে হচ্ছে আপনি এখনো কোনো প্রোডাক্ট কার্টে যোগ করেননি।</p>
            <Link href="/shop" className="bg-[#E52565] text-white px-8 py-3 rounded-full font-bold hover:bg-[#E52565]/90 transition-colors">
              শপিং শুরু করুন
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}