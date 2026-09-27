/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart, Tag, ShoppingBag, ShieldCheck } from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // পেজ লোড হওয়ার পর লোকাল স্টোরেজ থেকে কার্টের ডেটা নিয়ে আসা
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  // কার্ট আপডেট হলে লোকাল স্টোরেজেও সেভ করা
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      // কার্ট আপডেট হওয়ার পর অন্যান্য কম্পোনেন্টকে (যেমন হেডার) জানানোর জন্য ইভেন্ট ফায়ার করা
      window.dispatchEvent(new Event('cartUpdated')); 
    }
  }, [cartItems, isLoaded]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryCharge = cartItems.length > 0 ? 60 : 0;
  const total = subtotal + deliveryCharge;

  if (!isLoaded) return null; // হাইড্রেশন এরর এড়াতে

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
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-sm md:text-base font-bold text-gray-800 line-clamp-2 leading-snug">
                        {item.name}
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
                        <span className="w-8 text-center text-sm font-bold text-gray-800">{item.quantity}</span>
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