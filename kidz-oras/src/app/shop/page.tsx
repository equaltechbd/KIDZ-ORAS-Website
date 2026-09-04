/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, ShoppingCart, Home, Store, User, Star, SlidersHorizontal, ChevronDown, Image as ImageIcon } from "lucide-react";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("সবগুলো");

  const categories = ["সবগুলো", "খেলনা", "পোশাক", "এসেনশিয়ালস", "অফার", "ফিডিং"];

  // ডেমো প্রোডাক্ট লিস্ট (আলীএক্সপ্রেস স্টাইল)
  const products = [
    { title: "উডেন মন্টিসরি ফিশিং টয় এডুকেশনাল পাজল", price: "৳৬৫০", oldPrice: "৳৭৫০", sold: "600+", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDN7P6f248ZyWilkiqmtHN332jWtuKfRNW5Pb02o5y9FmSlXEUqaNHCDMMqoUADbrXEFxcE2nS9iQWu2MSO77j7IWBt30Z_0xkEnOThOFXS3AwPLh-Mqji-lDYgfkOdZ2mlWjRT4meVrLnUzzFtwsPilFHMhoWUX4LSExj7tj4fjd0-8mMRy5B038_dvRIcbg2o9jqFuAV7lQnoZq-6uvvOKBeqE1m45Moj8XYZHr7A4H2QZkqmHSG3" },
    { title: "জিওমেট্রিক ব্লক সেট কালারফুল ব্রেইন টিজার", price: "৳৮৫০", oldPrice: "৳১০০০", sold: "1k+", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiNVvtEG3oFqFg05B8OdeQL4kSQdpTXw1ZE3QSusVFz93Q5B2TGxYf-QVDsJDD2h2Q6qVy-Zu37DxTlFyRXMmQdM-yP-CQl4YtGbfh9jt7Xn9SlXIin0eOE3ZC0MaxxUSr1iidBpYP7hwKHFyMv7yWBG7rnM4l-m1SGdsCfpun3f_d2a3-Bx6mpVStn99mBeQqJPbYdxOfYygtY4lq26cLflC8X58WmBwRUoJYO_sfQlDNSGb2XQCG" },
    { title: "শেপ সর্টার বক্স বেবি লার্নিং টয়", price: "৳৯৯০", oldPrice: "৳১১৬৫", sold: "2k+", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbypmutJAUoTsfZiwVaqynUq38i2PH7x9Oxl2K1M3kd9u69KwQK7c5xQnPUHjgGqrZ7vmCr0Lhp0jLKh8FekiuRRFFufabjPCVE2_cxefLObbMjrxebD7zZRIzIJrLyPraqPrUnF7F_mArtcTb4I2--R7rq_LvAQGcc4Hh1f536EXaxpmYV2IG9wOZNXkedK_7sq8dMRsvuaQL6b5Ph36DYZZw-KWNDB_yJJ9A130x0Zj0kiEdA8IL" },
    { title: "সিলিকন বেবি টিদার সফট ম্যাটেরিয়াল", price: "৳৩৫০", oldPrice: "৳৪০০", sold: "5k+", img: null },
    { title: "কিউট বেবি সুতি রমপার - প্রিমিয়াম কোয়ালিটি", price: "৳৬০০", oldPrice: "৳৭০০", sold: "800+", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALG52l4H597Zus4CpnjmcgrWB9leinNtFPsCznTWr7puoP653tLm4mLY8ocqBA5kLsoHp97bYlnMLx1NDdeQxeuvp-paVAAh7QijRbSDO_LSf6nLa8j8lkRHBP67ghM13lQRHZ3203sba1Q8T1zqH7Ij1gZSyMEucuq2ZsL9WjvRbVtov32GG_HRrPoy5WBIZKk_L2zB8fmsD4u4vSvn4Dxi9MO-O6nTWqYnQP5-UitwjibcTjOB_v_KZktagBcaqypQ" },
    { title: "সিলিকন ফিডিং স্পুন ফর বেবি", price: "৳১২০", oldPrice: "৳১৫০", sold: "10k+", img: null },
    { title: "বেবি স্ট্রলার উইথ ফোল্ডেবল ডিজাইন", price: "৳৪৫০০", oldPrice: "৳৫৫০০", sold: "300+", img: null },
    { title: "অ্যানিমেল প্রিন্টেড বেবি টাওয়েল", price: "৳৪৫০", oldPrice: "৳৫০০", sold: "3k+", img: null },
  ];

  return (
    <div className="min-h-screen pb-32 bg-white text-[#221a15] font-sans">
      
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
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-6 md:gap-x-4 md:gap-y-8">
              {products.map((prod, idx) => (
                <Link href="/product/1" key={idx} className="flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-200">
                  
                  {/* Product Image Area */}
                  <div className="relative aspect-square bg-[#F5F5F5] rounded-xl overflow-hidden mb-2">
                    <span className="absolute top-0 left-0 bg-[#E52565] text-white font-bold text-[10px] md:text-xs px-2 py-1 rounded-br-lg z-10">
                      -১৫%
                    </span>
                    
                    {prod.img ? (
                      <img className="w-full h-full object-cover mix-blend-multiply" src={prod.img} alt={prod.title} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon size={48} />
                      </div>
                    )}
                    
                    <button className="absolute bottom-2 right-2 z-10 w-8 h-8 bg-white text-gray-800 rounded-full flex items-center justify-center shadow-md hover:text-[#E52565] transition-colors">
                      <ShoppingCart size={14} />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col px-1">
                    <h3 className="text-sm md:text-[15px] font-medium text-gray-800 line-clamp-2 leading-snug group-hover:text-[#E52565] transition-colors">
                      {prod.title}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 my-1">
                      <div className="flex text-[#F49547]">
                        <Star size={12} fill="currentColor" />
                      </div>
                      <span className="text-[11px] md:text-xs text-gray-500 font-medium">4.8 <span className="mx-0.5">|</span> {prod.sold} sold</span>
                    </div>
                    
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-lg md:text-xl font-bold text-[#E52565] leading-none">{prod.price}</span>
                      <span className="text-[11px] md:text-xs text-gray-400 line-through">{prod.oldPrice}</span>
                    </div>
                  </div>

                </Link>
              ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center mt-10 md:mt-14">
              <button className="px-10 py-2.5 md:py-3 md:px-12 md:text-base border border-gray-300 rounded-full font-bold text-gray-600 hover:border-[#E52565] hover:text-[#E52565] transition-all">
                আরও লোড করুন
              </button>
            </div>
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