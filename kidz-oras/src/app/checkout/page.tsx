/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, MapPin, Phone, User as UserIcon, CreditCard, ShieldCheck, CheckCircle2, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // ডেমো অর্ডার সামারি ডেটা
  const cartItems = [
    { id: 1, title: "কিউট বেবি সুতি রমপার - প্রিমিয়াম কোয়ালিটি", price: 600, qty: 1, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALG52l4H597Zus4CpnjmcgrWB9leinNtFPsCznTWr7puoP653tLm4mLY8ocqBA5kLsoHp97bYlnMLx1NDdeQxeuvp-paVAAh7QijRbSDO_LSf6nLa8j8lkRHBP67ghM13lQRHZ3203sba1Q8T1zqH7Ij1gZSyMEucuq2ZsL9WjvRbVtov32GG_HRrPoy5WBIZKk_L2zB8fmsD4u4vSvn4Dxi9MO-O6nTWqYnQP5-UitwjibcTjOB_v_KZktagBcaqypQ" },
    { id: 2, title: "জিওমেট্রিক ব্লক সেট কালারফুল ব্রেইন টিজার", price: 850, qty: 2, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiNVvtEG3oFqFg05B8OdeQL4kSQdpTXw1ZE3QSusVFz93Q5B2TGxYf-QVDsJDD2h2Q6qVy-Zu37DxTlFyRXMmQdM-yP-CQl4YtGbfh9jt7Xn9SlXIin0eOE3ZC0MaxxUSr1iidBpYP7hwKHFyMv7yWBG7rnM4l-m1SGdsCfpun3f_d2a3-Bx6mpVStn99mBeQqJPbYdxOfYygtY4lq26cLflC8X58WmBwRUoJYO_sfQlDNSGb2XQCG" }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const deliveryCharge = 60;
  const total = subtotal + deliveryCharge;

  return (
    <div className="min-h-screen pb-20 bg-[#F8F9FA] text-[#221a15] font-sans">
      
      {/* Checkout Header (Simple & Trust Focused) */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md px-4 md:px-8 py-3 md:py-4 flex items-center justify-between shadow-sm border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/cart" className="text-gray-700 hover:text-[#E52565] transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg md:text-xl font-bold text-gray-900">নিরাপদ চেকআউট</h1>
        </div>
        <div className="flex items-center gap-1.5 text-green-600 font-bold text-xs md:text-sm">
          <ShieldCheck size={18} />
          <span className="hidden md:inline">১০০% সিকিউর</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 md:pt-28 max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Left Column: Form & Payment Methods */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Delivery Information Form */}
            <div className="bg-white p-5 md:p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2 pb-4 border-b border-gray-100">
                <MapPin className="text-[#F49547]" size={20} />
                ডেলিভারি ইনফরমেশন
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                    <UserIcon size={14} className="text-gray-400" /> আপনার সম্পূর্ণ নাম <span className="text-[#E52565]">*</span>
                  </label>
                  <input type="text" placeholder="যেমন: সাদিয়া ইসলাম" className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg py-3 px-4 text-sm outline-none focus:border-[#E52565]/50 focus:bg-white transition-all" />
                </div>
                
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                    <Phone size={14} className="text-gray-400" /> মোবাইল নম্বর <span className="text-[#E52565]">*</span>
                  </label>
                  <input type="tel" placeholder="01XXXXXXXXX" className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg py-3 px-4 text-sm outline-none focus:border-[#E52565]/50 focus:bg-white transition-all" />
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                    <MapPin size={14} className="text-gray-400" /> সম্পূর্ণ ঠিকানা <span className="text-[#E52565]">*</span>
                  </label>
                  <textarea rows={3} placeholder="বাসা নং, রোড নং, এলাকা (বিস্তারিত)" className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg py-3 px-4 text-sm outline-none focus:border-[#E52565]/50 focus:bg-white transition-all resize-none"></textarea>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-gray-700">শহর / জেলা <span className="text-[#E52565]">*</span></label>
                  <select className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg py-3 px-4 text-sm outline-none focus:border-[#E52565]/50 focus:bg-white transition-all appearance-none cursor-pointer">
                    <option value="">নির্বাচন করুন</option>
                    <option value="dhaka">ঢাকা</option>
                    <option value="outside">ঢাকার বাইরে</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-gray-700">এরিয়া / জোন</label>
                  <input type="text" placeholder="যেমন: মিরপুর, ধানমন্ডি" className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg py-3 px-4 text-sm outline-none focus:border-[#E52565]/50 focus:bg-white transition-all" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-5 md:p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2 pb-4 border-b border-gray-100">
                <CreditCard className="text-[#41C1C0]" size={20} />
                পেমেন্ট মেথড
              </h2>
              
              <div className="flex flex-col gap-3">
                {/* COD Option */}
                <label 
                  className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                    paymentMethod === "cod" ? "border-[#E52565] bg-[#E52565]/5" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <div className="flex-1 flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "cod" ? "border-[#E52565]" : "border-gray-300"
                    }`}>
                      {paymentMethod === "cod" && <div className="w-2.5 h-2.5 bg-[#E52565] rounded-full"></div>}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">ক্যাশ অন ডেলিভারি (COD)</span>
                      <span className="text-xs text-gray-500">পণ্য হাতে পেয়ে পেমেন্ট করুন</span>
                    </div>
                  </div>
                  <img src="https://cdn-icons-png.flaticon.com/512/2800/2800166.png" alt="COD" className="w-8 h-8 opacity-70" />
                </label>

                {/* Mobile Banking Option (Optional/Future) */}
                <label 
                  className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                    paymentMethod === "bkash" ? "border-[#E52565] bg-[#E52565]/5" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("bkash")}
                >
                  <div className="flex-1 flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "bkash" ? "border-[#E52565]" : "border-gray-300"
                    }`}>
                      {paymentMethod === "bkash" && <div className="w-2.5 h-2.5 bg-[#E52565] rounded-full"></div>}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">বিকাশ / নগদ পেমেন্ট</span>
                      <span className="text-xs text-gray-500">অ্যাডভান্স পেমেন্ট করুন</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            
          </div>

          {/* Right Column: Order Summary (Sticky) */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100 sticky top-[90px]">
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100 flex items-center gap-2">
                <ShoppingBag className="text-[#E52565]" size={20} />
                আপনার অর্ডার
              </h2>
              
              {/* Items List (Mini) */}
              <div className="flex flex-col gap-3 mb-5 max-h-[200px] overflow-y-auto hide-scrollbar pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-[#F8F9FA] rounded border border-gray-100 shrink-0 p-1">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{item.title}</h4>
                      <div className="text-xs text-gray-500 mt-0.5">পরিমাণ: {item.qty}</div>
                    </div>
                    <div className="text-sm font-bold text-gray-900">৳{item.price * item.qty}</div>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="flex flex-col gap-3 text-sm text-gray-600 mb-4 pb-4 border-y border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span>সাবটোটাল</span>
                  <span className="font-bold text-gray-800">৳{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ</span>
                  <span className="font-bold text-gray-800">৳{deliveryCharge}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-6">
                <span className="text-base font-bold text-gray-900">সর্বমোট পরিশোধ</span>
                <span className="text-2xl font-bold text-[#E52565]">৳{total}</span>
              </div>
              
              {/* Submit Button */}
              <Link href="/success" className="w-full bg-[#E52565] hover:bg-[#E52565]/90 text-white font-bold py-3.5 rounded-lg shadow-md transition-colors text-center flex items-center justify-center gap-2 mb-3">
                <CheckCircle2 size={20} />
                অর্ডার কনফার্ম করুন
              </Link>
              
              <p className="text-[11px] text-center text-gray-500">
                অর্ডার কনফার্ম করার মাধ্যমে আপনি আমাদের <Link href="#" className="text-[#E52565] hover:underline">শর্তাবলী</Link> তে সম্মত হচ্ছেন।
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}