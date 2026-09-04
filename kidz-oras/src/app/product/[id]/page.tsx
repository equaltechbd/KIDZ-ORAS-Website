/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Share2, ShoppingCart, Heart, Star, Truck, RefreshCcw, Edit, Home, Store, User, Plus, Minus, MapPin, Banknote, ShieldOff, Info, Image as ImageIcon } from "lucide-react";

export default function ProductDetailsPage() {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // পিওর হোয়াইট থিম এবং নতুন ব্র্যান্ড কালার
  return (
    <div className="min-h-screen pb-32 bg-white text-[#221a15] font-sans">
      
      {/* Premium Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md px-4 md:px-8 py-3 md:py-4 flex justify-between items-center shadow-[0_2px_15px_rgba(0,0,0,0.05)] border-b border-gray-100">
        <Link href="/" className="text-gray-700 hover:text-[#E52565] transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex items-center h-9 md:h-12">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFnrOWwXO5XcJCsPq5rROR4aUou9lMt3HigJAs_YmB3jVStH53H3Jsm_WRrGuEIulPS1NlWlkKsrddZJjt2vUoOiZbyv8Q-R9ulT1748HpmbgGHeNK0mBhl1xWTHq68JHsFkGpIRAAfhPGmaOrYRrvICQ-axUacgof7EEehaEPgfPdzINReZO4_w3_57bp25onAqh0losgml6ITPShiWxUkbVcYo80PEGre3dGo1pZK9dI7nOHzvxkbunBHLLIUe4RGA" alt="Kidz Oras Logo" className="h-full w-auto object-contain" />
        </div>
        <div className="flex gap-4">
          <button aria-label="Share" className="text-gray-700 hover:text-[#E52565] transition-colors">
            <Share2 size={22} />
          </button>
          <Link href="/cart" className="text-gray-700 hover:text-[#E52565] transition-colors relative">
            <ShoppingCart size={22} />
            <span className="absolute -top-1.5 -right-2 bg-[#E52565] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">2</span>
          </Link>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="pt-16 md:pt-28 pb-10 max-w-[1200px] mx-auto md:px-4">
        
        {/* Top Grid: Image | Info | Delivery Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 md:gap-5 lg:gap-6">
          
          {/* Column 1: Image Gallery */}
          <div className="lg:col-span-4">
            <div className="relative w-full aspect-square bg-[#F5F5F5] rounded-none md:rounded-xl overflow-hidden mb-2 md:mb-0">
              <img 
                alt="Product Image" 
                className="w-full h-full object-contain p-4 mix-blend-multiply" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuALG52l4H597Zus4CpnjmcgrWB9leinNtFPsCznTWr7puoP653tLm4mLY8ocqBA5kLsoHp97bYlnMLx1NDdeQxeuvp-paVAAh7QijRbSDO_LSf6nLa8j8lkRHBP67ghM13lQRHZ3203sba1Q8T1zqH7Ij1gZSyMEucuq2ZsL9WjvRbVtov32GG_HRrPoy5WBIZKk_L2zB8fmsD4u4vSvn4Dxi9MO-O6nTWqYnQP5-UitwjibcTjOB_v_KZktagBcaqypQ" 
              />
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2.5 rounded-full text-[#E52565] shadow-sm hover:scale-110 transition-transform"
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          {/* Column 2: Product Info, Price & Actions */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="px-4 py-5 md:p-6 bg-white border border-gray-100 shadow-sm rounded-none md:rounded-xl mb-2 md:mb-0 flex-1 flex flex-col">
              
              <h1 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 leading-snug">
                কিউট বেবি সুতি রমপার - প্রিমিয়াম কোয়ালিটি
              </h1>
              
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                <div className="flex text-[#F49547]">
                  <Star size={15} fill="currentColor" />
                  <Star size={15} fill="currentColor" />
                  <Star size={15} fill="currentColor" />
                  <Star size={15} fill="currentColor" />
                  <Star size={15} fill="currentColor" />
                </div>
                <span className="font-bold text-xs text-gray-600">4.8</span>
                <span className="text-gray-300 mx-1">|</span>
                <a className="font-bold text-xs text-[#E52565] hover:underline" href="#reviews">১২ রেটিংস</a>
              </div>

              <div className="flex items-end gap-3 mb-6">
                <span className="text-3xl font-bold text-[#E52565] leading-none">৳৬০০</span>
                <span className="text-sm text-gray-400 line-through mb-1">৳৭৫০</span>
                <span className="bg-[#E52565]/10 text-[#E52565] text-xs font-bold px-2 py-0.5 rounded-sm mb-1">-১৫%</span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-5 mb-6">
                <span className="text-sm text-gray-500 font-bold">পরিমাণ</span>
                <div className="flex items-center border border-gray-200 rounded-md">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-50 text-gray-500 transition-colors">
                    <Minus size={16}/>
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-gray-800">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-50 text-gray-500 transition-colors">
                    <Plus size={16}/>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                <button className="flex-1 bg-[#F49547] hover:bg-[#F49547]/90 text-white font-bold py-3.5 rounded-lg shadow-sm transition-colors text-center text-sm">
                  এখনি কিনুন
                </button>
                <button className="flex-1 bg-[#E52565] hover:bg-[#E52565]/90 text-white font-bold py-3.5 rounded-lg shadow-sm transition-colors text-center text-sm flex items-center justify-center gap-2">
                  <ShoppingCart size={18} />
                  <span className="hidden md:inline">কার্টে যোগ করুন</span>
                  <span className="md:hidden">কার্টে নিন</span>
                </button>
              </div>
              
            </div>
          </div>

          {/* Column 3: Trust & Delivery Box */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-100 shadow-sm rounded-none md:rounded-xl mb-2 md:mb-0 h-full">
              
              {/* Delivery Section */}
              <div className="p-4 md:p-5 border-b border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Delivery Options</span>
                  <Info size={16} className="text-gray-300" />
                </div>
                
                <div className="flex items-start gap-3 mb-4">
                  <MapPin size={20} className="text-[#41C1C0] shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-800 leading-snug">ঢাকা, ঢাকা উত্তর, বনানী রোড নং ১২-১৯</div>
                </div>
                
                <div className="flex items-start gap-3 mb-4">
                  <Truck size={20} className="text-[#41C1C0] shrink-0 mt-0.5" />
                  <div className="w-full">
                    <div className="flex justify-between w-full">
                      <div className="font-bold text-sm text-gray-800">স্ট্যান্ডার্ড ডেলিভারি</div>
                      <div className="font-bold text-sm text-gray-800">৳ ৬০</div>
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">গ্যারান্টিড ৩ - ৫ দিন</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Banknote size={20} className="text-[#41C1C0] shrink-0 mt-0.5" />
                  <div className="font-bold text-sm text-gray-800">ক্যাশ অন ডেলিভারি (COD) এভেইলেবল</div>
                </div>
              </div>

              {/* Warranty & Return Section */}
              <div className="p-4 md:p-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Return & Warranty</span>
                  <Info size={16} className="text-gray-300" />
                </div>
                
                <div className="flex items-start gap-3 mb-4">
                  <RefreshCcw size={20} className="text-[#41C1C0] shrink-0 mt-0.5" />
                  <div className="w-full">
                    <div className="font-bold text-sm text-gray-800">৭ দিনের ইজি রিটার্ন</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">শর্ত প্রযোজ্য</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <ShieldOff size={20} className="text-[#41C1C0] shrink-0 mt-0.5" />
                  <div className="font-bold text-sm text-gray-800">ওয়ারেন্টি প্রযোজ্য নয়</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Grid: Description & Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 md:gap-6 mt-0 md:mt-6">
          <div className="lg:col-span-9 flex flex-col gap-2 md:gap-6">
            
            {/* Highlights */}
            <div className="px-4 py-5 md:p-6 bg-white border border-gray-100 shadow-sm rounded-none md:rounded-xl mb-2 md:mb-0">
              <h2 className="font-bold text-base text-gray-900 mb-3">Highlights</h2>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600 pl-1">
                <li>Material: 100% Cotton</li>
                <li>Age: 0-2 Years</li>
                <li>Safe & Non-toxic</li>
              </ul>
            </div>

            {/* Product Details */}
            <div className="px-4 py-5 md:p-6 bg-white border border-gray-100 shadow-sm rounded-none md:rounded-xl mb-2 md:mb-0">
              <h2 className="font-bold text-base text-gray-900 mb-3">Product Details</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                বাচ্চাদের জন্য আরামদায়ক এবং স্টাইলিশ সুতির রমপার। প্রিমিয়াম কোয়ালিটির কাপড় দিয়ে তৈরি, যা বাচ্চার ত্বকের জন্য ১০০% নিরাপদ। গরমে বাচ্চার আরাম নিশ্চিত করতে এই রমপারটি সেরা পছন্দ।
              </p>
            </div>

            {/* Ratings & Reviews */}
            <div className="px-4 py-5 md:p-6 bg-white border border-gray-100 shadow-sm rounded-none md:rounded-xl mb-6" id="reviews">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-base text-gray-900">Ratings & Reviews</h2>
                <div className="text-right">
                  <div className="text-xl font-bold text-[#E52565]">4.8<span className="text-sm text-gray-400 font-normal">/5</span></div>
                  <div className="text-xs text-gray-500 mt-0.5">১২ রেটিংস</div>
                </div>
              </div>

              {/* Review Item */}
              <div className="border border-gray-100 rounded-xl p-4 mb-4 bg-gray-50/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">সাদিয়া ইসলাম</span>
                    <span className="bg-[#41C1C0] text-white px-1 py-0.5 rounded-full flex items-center justify-center">
                      <span className="text-[9px] font-bold">✓</span>
                    </span>
                  </div>
                  <div className="flex text-[#F49547]">
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">খুব সুন্দর ফেব্রিক, আমার বাচ্চার খুব পছন্দ হয়েছে!</p>
                <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUXPKtvK_FBsW6Sl9cjQPTZAYo9rsEnYVQN4z0MgolhT-yuVsMK90M3wrM3NC54enrF8QgnZcRDXKB5VeqhdCDIo_2bc_biGSAQRp839WZwhZKYvWzlO8k8lSPaJv5XQGmkvT4-E-veHFkSChVzSbQrlnP6ZJ1NAkV2d93O2CVvQC3vAuPRly_LZstNJ6Flg2z5fwuJtHhAbf2qxsmTbljw1Y7xBxrKSlA0Qwd61ieHrmWO-jC1UW2" alt="Review photo" />
                </div>
              </div>

              <button className="w-full md:w-auto md:px-8 py-3 border border-[#E52565] text-[#E52565] font-bold rounded-lg flex justify-center items-center gap-2 hover:bg-[#E52565]/5 transition-colors text-sm">
                <Edit size={16} />
                রিভিউ দিন
              </button>
            </div>
            
            {/* Related Items Section (AliExpress Style) */}
            <div className="pt-4 md:pt-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 px-4 md:px-0">
                রিলেটেড প্রোডাক্টস
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-4 md:gap-y-8 px-4 md:px-0">
                {[
                  { title: "উডেন মন্টিসরি ফিশিং টয় এডুকেশনাল পাজল", price: "৳৬৫০", oldPrice: "৳৭৫০", sold: "600+", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDN7P6f248ZyWilkiqmtHN332jWtuKfRNW5Pb02o5y9FmSlXEUqaNHCDMMqoUADbrXEFxcE2nS9iQWu2MSO77j7IWBt30Z_0xkEnOThOFXS3AwPLh-Mqji-lDYgfkOdZ2mlWjRT4meVrLnUzzFtwsPilFHMhoWUX4LSExj7tj4fjd0-8mMRy5B038_dvRIcbg2o9jqFuAV7lQnoZq-6uvvOKBeqE1m45Moj8XYZHr7A4H2QZkqmHSG3" },
                  { title: "জিওমেট্রিক ব্লক সেট কালারফুল ব্রেইন টিজার", price: "৳৮৫০", oldPrice: "৳১০০০", sold: "1k+", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiNVvtEG3oFqFg05B8OdeQL4kSQdpTXw1ZE3QSusVFz93Q5B2TGxYf-QVDsJDD2h2Q6qVy-Zu37DxTlFyRXMmQdM-yP-CQl4YtGbfh9jt7Xn9SlXIin0eOE3ZC0MaxxUSr1iidBpYP7hwKHFyMv7yWBG7rnM4l-m1SGdsCfpun3f_d2a3-Bx6mpVStn99mBeQqJPbYdxOfYygtY4lq26cLflC8X58WmBwRUoJYO_sfQlDNSGb2XQCG" },
                  { title: "শেপ সর্টার বক্স বেবি লার্নিং টয়", price: "৳৯৯০", oldPrice: "৳১১৬৫", sold: "2k+", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbypmutJAUoTsfZiwVaqynUq38i2PH7x9Oxl2K1M3kd9u69KwQK7c5xQnPUHjgGqrZ7vmCr0Lhp0jLKh8FekiuRRFFufabjPCVE2_cxefLObbMjrxebD7zZRIzIJrLyPraqPrUnF7F_mArtcTb4I2--R7rq_LvAQGcc4Hh1f536EXaxpmYV2IG9wOZNXkedK_7sq8dMRsvuaQL6b5Ph36DYZZw-KWNDB_yJJ9A130x0Zj0kiEdA8IL" },
                  { title: "সিলিকন বেবি টিদার সফট ম্যাটেরিয়াল", price: "৳৩৫০", oldPrice: "৳৪০০", sold: "5k+", img: null },
                ].map((prod, idx) => (
                  <Link href="/product/1" key={idx} className="flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-200">
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
            </div>

          </div>
        </div>
      </main>

      {/* Mobile Bottom NavBar */}
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

    </div>
  );
}