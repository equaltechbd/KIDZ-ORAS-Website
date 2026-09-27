/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import toast, { Toaster } from "react-hot-toast";
import { 
  Menu, Search, ShoppingCart, Home, Store, User, 
  Puzzle, Shirt, Baby, Tag, Image as ImageIcon, Star, Loader2 
} from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  // Supabase থেকে লেটেস্ট ৬টি প্রোডাক্ট নিয়ে আসা
  useEffect(() => {
    const fetchLatestProducts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6); // হোমপেজে শুধু শেষের ৬টি দেখাবে

      if (!error && data) {
        setProducts(data);
      }
      setIsLoading(false);
    };

    fetchLatestProducts();
  }, [supabase]);

  // কুইক অ্যাড টু কার্ট লজিক
  const handleQuickAddToCart = (e: React.MouseEvent, prod: any) => {
    e.preventDefault(); 
    
    const cartItem = {
      id: prod.id,
      name: prod.name,
      price: prod.discount_price || prod.price,
      quantity: 1,
      image: prod.image_url,
      variant: null
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === cartItem.id);
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    toast.success("প্রোডাক্ট কার্টে যোগ করা হয়েছে!");
  };

  return (
    <div className="min-h-screen pb-32 bg-white text-[#221a15] font-sans">
      <Toaster position="top-center" />
      
      {/* Premium Header (Pure White with Light Shadow) */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-10 py-3 md:py-4 bg-white/95 backdrop-blur-md gap-3 shadow-[0_2px_15px_rgba(0,0,0,0.05)] border-b border-gray-100">
        
        {/* Menu & Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button aria-label="Menu" className="md:hidden text-gray-600 hover:text-[#E52565] transition-colors">
            <Menu size={26} />
          </button>
          <Link href="/" className="flex items-center">
            <img alt="Kidz Oras Logo" className="h-10 md:h-14 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx02yTRDOJbMk7xjU5ULRxzbKNMTucJICwrA1eAywfJxP-zDT5OoqWvEIOHDzC15-nP2b4llzWD7aObmP7FGL0nI2cUNBuiVe25N5UVLo41G3xGLRyzGcjlkax8_2AGm0xJR7RVcx2ik2QmvrBAY4j4RTn4of1i4tuJzTVVf92bP-Wni6VOmsQdqIfkQr75CitP0uesZkol6DpcquXd-Rme4_S3qByKJb1MbE5OnRBToYz08Uik-ceQPH3fQqq5AxIUQ" />
          </Link>
        </div>
        
        {/* Search Bar (Premium Soft Box with Pinkish-Red Focus) */}
        <div className="flex-1 max-w-2xl mx-1 md:mx-6">
          <div className="relative w-full group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E52565] transition-colors" size={18} />
            <input
              type="text"
              placeholder="পছন্দের পণ্য খুঁজুন..."
              className="w-full bg-[#F5F5F5] border border-transparent rounded-full py-2.5 md:py-3 pl-10 pr-4 text-sm focus:bg-white focus:border-[#E52565]/30 focus:ring-2 focus:ring-[#E52565]/10 transition-all outline-none"
            />
          </div>
        </div>

        {/* Nav Links & Cart */}
        <div className="flex items-center gap-5 md:gap-8 shrink-0">
          <div className="hidden md:flex items-center gap-6 lg:gap-8 font-bold text-sm">
            <Link href="/" className="text-[#E52565]">হোম</Link>
            <Link href="/shop" className="text-gray-600 hover:text-[#E52565] transition-colors">শপ</Link>
            <Link href="#" className="text-gray-600 hover:text-[#E52565] transition-colors">আমাদের সম্পর্কে</Link>
          </div>

          <Link href="/cart" className="text-gray-700 hover:text-[#E52565] transition-colors relative mr-1 md:mr-0">
            <ShoppingCart size={24} className="md:w-6 md:h-6" />
            <span className="absolute -top-1.5 -right-2 bg-[#E52565] text-white text-[10px] md:text-xs font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full">2</span>
          </Link>
        </div>
      </nav>

      <main className="pt-20 md:pt-28 pb-10">
        
        {/* Hero Slider Image */}
        <section className="px-4 md:px-5 py-2">
          <div className="relative w-full max-w-6xl mx-auto rounded-xl md:rounded-2xl overflow-hidden shadow-sm">
            <div className="relative h-40 sm:h-56 md:h-80 lg:h-[400px] w-full bg-[#F5F5F5]">
              <img alt="Banner" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgy4AmGoXJqFxIWXljTJ86VDuvqcv9MpUT13IuTeuDiISrX0t5C4ne_oLXfd8isyP7q2J3a9SGT6-oUiuNY7LyLw_0_rvgiJDNOoOZLOrsxmy9p5FZtDWIoGzqEUsWPB6bJrWI_-Zkf2wc9BN2DnZ1XO1x9ad6ZRGfCc81ispqp7vDoCa25j6g1FHXySLjTSVkqyR2ZnCH_RQEQSRsH2blKePPIAwSCFFMU16_qntGijzS5ofzwSSw" />
            </div>
            {/* Dots (Using Logo Red for Active) */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#E52565]"></span>
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/60 backdrop-blur"></span>
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/60 backdrop-blur"></span>
            </div>
          </div>
        </section>

        {/* Categories (Colored based on Logo) */}
        <section className="px-4 py-8 md:py-10">
          <div className="max-w-4xl mx-auto overflow-x-auto hide-scrollbar">
            <div className="flex items-center justify-between md:justify-center gap-4 md:gap-16 w-max mx-auto px-2">
              {[
                { icon: Puzzle, label: 'খেলনা', color: 'text-[#F49547]', bg: 'bg-[#F49547]/10 hover:bg-[#F49547]/20' }, // K - Orange
                { icon: Shirt, label: 'পোশাক', color: 'text-[#41C1C0]', bg: 'bg-[#41C1C0]/10 hover:bg-[#41C1C0]/20' },  // I - Cyan
                { icon: Baby, label: 'এসেনশিয়ালস', color: 'text-[#E52565]', bg: 'bg-[#E52565]/10 hover:bg-[#E52565]/20' }, // D - Pinkish Red
                { icon: Tag, label: 'অফার', color: 'text-[#A984C1]', bg: 'bg-[#A984C1]/10 hover:bg-[#A984C1]/20' },     // Z - Purple
              ].map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <div key={idx} className="flex flex-col items-center gap-3 group cursor-pointer">
                    <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center ${cat.bg} ${cat.color} transition-colors duration-300`}>
                      <Icon className="w-7 h-7 md:w-9 md:h-9" strokeWidth={2} />
                    </div>
                    <span className="font-bold text-xs md:text-sm text-gray-700">{cat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Products (Dynamic Supabase Feed) */}
        <section className="px-4 md:px-5 py-6">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-[#221a15] mb-6 pl-1">
              জনপ্রিয় কালেকশন
            </h2>
            
            {/* Grid for Products */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-6 md:gap-x-4 md:gap-y-8">
              {isLoading ? (
                <div className="col-span-2 md:col-span-4 lg:col-span-6 flex flex-col items-center justify-center py-20 text-[#E52565]">
                  <Loader2 className="w-10 h-10 animate-spin mb-4" />
                  <p className="text-gray-500 font-medium">প্রোডাক্ট লোড হচ্ছে...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="col-span-2 md:col-span-4 lg:col-span-6 text-center py-20">
                  <p className="text-gray-500 font-medium text-lg">এখনো কোনো প্রোডাক্ট যোগ করা হয়নি!</p>
                </div>
              ) : (
                products.map((prod) => {
                  const currentPrice = prod.discount_price || prod.price;
                  const oldPrice = prod.discount_price ? prod.price : null;
                  const discountPercent = prod.discount_price ? Math.round(((prod.price - prod.discount_price) / prod.price) * 100) : 0;

                  return (
                    <Link href={`/product/${prod.id}`} key={prod.id} className="flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-200">
                      
                      {/* Product Image Area */}
                      <div className="relative aspect-square bg-[#F5F5F5] rounded-xl overflow-hidden mb-2">
                        {discountPercent > 0 && (
                          <span className="absolute top-0 left-0 bg-[#E52565] text-white font-bold text-[10px] md:text-xs px-2 py-1 rounded-br-lg z-10">
                            -{discountPercent}%
                          </span>
                        )}
                        
                        {prod.image_url ? (
                          <img className="w-full h-full object-cover mix-blend-multiply" src={prod.image_url} alt={prod.name} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <ImageIcon size={48} />
                          </div>
                        )}
                        
                        <button 
                          onClick={(e) => handleQuickAddToCart(e, prod)}
                          className="absolute bottom-2 right-2 z-10 w-8 h-8 bg-white text-gray-800 rounded-full flex items-center justify-center shadow-md hover:text-[#E52565] transition-colors"
                        >
                          <ShoppingCart size={14} />
                        </button>
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-col px-1">
                        <h3 className="text-sm md:text-[15px] font-medium text-gray-800 line-clamp-2 leading-snug group-hover:text-[#E52565] transition-colors">
                          {prod.name}
                        </h3>
                        
                        <div className="flex items-center gap-1.5 my-1">
                          <div className="flex text-[#F49547]">
                            <Star size={12} fill="currentColor" />
                          </div>
                          <span className="text-[11px] md:text-xs text-gray-500 font-medium">4.8 <span className="mx-0.5">|</span> {prod.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                        </div>
                        
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-lg md:text-xl font-bold text-[#E52565] leading-none">৳{currentPrice}</span>
                          {oldPrice && <span className="text-[11px] md:text-xs text-gray-400 line-through">৳{oldPrice}</span>}
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>

            {/* "আরও দেখুন" বাটনটি এখন লিংক হিসেবে শপ পেজে যাবে */}
            {!isLoading && products.length > 0 && (
              <div className="flex justify-center mt-10 md:mt-12">
                <Link href="/shop" className="px-10 py-2.5 md:py-3 md:px-12 md:text-base border border-gray-300 rounded-full font-bold text-gray-600 hover:border-[#E52565] hover:text-[#E52565] transition-all inline-block">
                  আরও দেখুন
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Mobile Bottom NavBar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md px-2 py-3 flex justify-around items-center border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <Link href="/" className="flex flex-col items-center justify-center text-[#E52565] px-6">
          <Home size={22} fill="currentColor" />
          <span className="font-bold text-[10px] mt-1">হোম</span>
        </Link>
        <Link href="/shop" className="flex flex-col items-center justify-center text-gray-500 hover:text-[#E52565] transition-colors px-6">
          <Store size={22} />
          <span className="font-bold text-[10px] mt-1">শপ</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center justify-center text-gray-500 hover:text-[#E52565] transition-colors px-6">
          <User size={22} />
          <span className="font-bold text-[10px] mt-1">অ্যাকাউন্ট</span>
        </Link>
      </nav>

      {/* Footer */}
      <footer className="w-full px-5 py-10 flex flex-col items-center gap-4 text-center bg-gray-50 border-t border-gray-100 pb-28 md:pb-12 mt-4">
        <img alt="Kidz Oras Logo" className="h-10 md:h-12 object-contain mx-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC0YhxuqDqWbty1htb0Yd6mkvYHD3ywPuHP9rBTZSYt-R2UzfXss5UWV2kwhK15afkeDbX5Amwt43ulZXEfrgN4lr2pZbNvyPDQAYKRnwsQMr3GTPnFfLgCzXGbavMK4UU0Qn3IVaUMVLx7Q6BRGZruWq2_zqEN_F6idMXGvOvWS1-xM6flCK1mGhJNxH_9pKx_SHpXxOr1j6t6M-w8u3zJlXglYTq-cYVm0VXwM_r_X8NU-Z5Y64RO205_SJI-rlXxw" />
        <p className="font-bold text-base md:text-lg text-gray-600">
          আপনার সোনামণির হাসিমুখের সঙ্গী - Kidz Oras
        </p>
        <div className="flex flex-wrap justify-center gap-6 font-medium text-sm text-gray-500 mt-2">
          <Link href="/policies" className="hover:text-[#E52565]">গোপনীয়তা নীতি</Link>
          <Link href="/policies" className="hover:text-[#E52565]">শর্তাবলী</Link>
          <Link href="/policies" className="hover:text-[#E52565]">রিফান্ড পলিসি</Link>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          © 2026 Kidz Oras. All rights reserved.
        </p>
      </footer>

    </div>
  );
}