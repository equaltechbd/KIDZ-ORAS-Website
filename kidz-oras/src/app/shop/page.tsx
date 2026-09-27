/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import toast, { Toaster } from "react-hot-toast";
import { 
  Menu, Search, ShoppingCart, Home, Store, User, Star, 
  SlidersHorizontal, ChevronDown, Image as ImageIcon, Loader2 
} from "lucide-react";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("সবগুলো");
  const categories = ["সবগুলো", "খেলনা", "পোশাক", "এসেনশিয়ালস", "অফার", "ফিডিং"];

  // ডাইনামিক স্টেট 
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  // ডাটাবেস থেকে প্রোডাক্ট ফেচ করা
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, [supabase]);

  // কুইক অ্যাড টু কার্ট লজিক
  const handleQuickAddToCart = (e: React.MouseEvent, prod: any) => {
    e.preventDefault(); // লিংকে ক্লিক হয়ে প্রোডাক্ট পেজে যাওয়া ঠেকাতে
    
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
      
      {/* Premium Header */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-10 py-3 md:py-4 bg-white/95 backdrop-blur-md gap-3 shadow-[0_2px_15px_rgba(0,0,0,0.05)] border-b border-gray-100">
        <div className="flex items-center gap-3 shrink-0">
          <button aria-label="Menu" className="md:hidden text-gray-600 hover:text-[#E52565] transition-colors">
            <Menu size={26} />
          </button>
          <Link href="/" className="flex items-center">
            <img alt="Kidz Oras Logo" className="h-10 md:h-14 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx02yTRDOJbMk7xjU5ULRxzbKNMTucJICwrA1eAywfJxP-zDT5OoqWvEIOHDzC15-nP2b4llzWD7aObmP7FGL0nI2cUNBuiVe25N5UVLo41G3xGLRyzGcjlkax8_2AGm0xJR7RVcx2ik2QmvrBAY4j4RTn4of1i4tuJzTVVf92bP-Wni6VOmsQdqIfkQr75CitP0uesZkol6DpcquXd-Rme4_S3qByKJb1MbE5OnRBToYz08Uik-ceQPH3fQqq5AxIUQ" />
          </Link>
        </div>
        
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

        <div className="flex items-center gap-5 md:gap-8 shrink-0">
          <div className="hidden md:flex items-center gap-6 lg:gap-8 font-bold text-sm">
            <Link href="/" className="text-gray-600 hover:text-[#E52565] transition-colors">হোম</Link>
            <Link href="/shop" className="text-[#E52565]">শপ</Link>
            <Link href="#" className="text-gray-600 hover:text-[#E52565] transition-colors">আমাদের সম্পর্কে</Link>
          </div>

          <Link href="/cart" className="text-gray-700 hover:text-[#E52565] transition-colors relative mr-1 md:mr-0">
            <ShoppingCart size={24} className="md:w-6 md:h-6" />
            <span className="absolute -top-1.5 -right-2 bg-[#E52565] text-white text-[10px] md:text-xs font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full">2</span>
          </Link>
        </div>
      </nav>

      <main className="pt-20 md:pt-28 pb-10">
        
        {/* Filters & Sorting Section */}
        <section className="px-4 md:px-5 py-4 border-b border-gray-100 sticky top-[64px] md:top-[80px] z-40 bg-white/95 backdrop-blur-md">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Horizontal Scrollable Categories */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 md:pb-0">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                    activeCategory === cat 
                      ? "bg-[#E52565] text-white shadow-sm" 
                      : "bg-[#F5F5F5] text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Filter & Sort Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                <SlidersHorizontal size={16} />
                ফিল্টার
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                সর্টিং
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Product Grid (AliExpress Borderless Style) */}
        <section className="px-4 md:px-5 py-6">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="text-xl md:text-2xl font-bold text-[#221a15] mb-6 pl-1">
              সব কালেকশন <span className="text-sm font-normal text-gray-500 ml-2">({products.length} আইটেম)</span>
            </h1>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#E52565]">
                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">প্রোডাক্ট লোড হচ্ছে...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 font-medium text-lg">এখনো কোনো প্রোডাক্ট যোগ করা হয়নি!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-6 md:gap-x-4 md:gap-y-8">
                {products.map((prod) => {
                  // ডিসকাউন্ট ক্যালকুলেশন
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
                })}
              </div>
            )}

            {/* Load More Button */}
            {!isLoading && products.length > 0 && (
              <div className="flex justify-center mt-10 md:mt-14">
                <button className="px-10 py-2.5 md:py-3 md:px-12 md:text-base border border-gray-300 rounded-full font-bold text-gray-600 hover:border-[#E52565] hover:text-[#E52565] transition-all">
                  আরও লোড করুন
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Mobile Bottom NavBar - "Shop" Active */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md px-2 py-3 flex justify-around items-center border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <Link href="/" className="flex flex-col items-center justify-center text-gray-500 hover:text-[#E52565] transition-colors px-6">
          <Home size={22} />
          <span className="font-bold text-[10px] mt-1">হোম</span>
        </Link>
        <Link href="/shop" className="flex flex-col items-center justify-center text-[#E52565] px-6">
          <Store size={22} fill="currentColor" />
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
        <p className="text-sm text-gray-400 mt-4">
          © 2026 Kidz Oras. All rights reserved.
        </p>
      </footer>

    </div>
  );
}