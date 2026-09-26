"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { CheckCircle2, Info, User as UserIcon, Phone, MapPin, Banknote, ShoppingBag, Home, X, Loader2 } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const supabase = createClient();

  const [order, setOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      // Fetch Order Info
      const { data: orderData } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (orderData) {
        setOrder(orderData);
        // Fetch Order Items
        const { data: itemsData } = await supabase
          .from("order_items")
          .select("*")
          .eq("order_id", orderId);
        
        if (itemsData) setOrderItems(itemsData);
      }
      setLoading(false);
    };

    fetchOrderDetails();
  }, [orderId, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-[#E52565] animate-spin" />
        <p className="text-gray-500 font-medium">অর্ডারের তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-xl font-bold text-gray-800">অর্ডারটি খুঁজে পাওয়া যায়নি!</p>
        <Link href="/" className="px-6 py-2 bg-[#E52565] text-white rounded-lg font-bold">হোমে ফিরে যান</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#221a15] font-sans pb-24 md:pb-10">
      {/* Header */}
      <header className="w-full top-0 sticky bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 z-50">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <div className="w-10"></div>
          <h1 className="text-lg md:text-xl font-bold text-gray-900">অর্ডার সফল</h1>
          <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
            <X size={24} />
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 md:px-6 pt-8 flex flex-col gap-6">
        
        {/* Success Confirmation Block */}
        <section className="flex flex-col items-center text-center gap-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-2">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-2 shadow-sm">
            <CheckCircle2 size={48} strokeWidth={2.5} />
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 leading-snug">
            ধন্যবাদ! আপনার অর্ডারটি সফলভাবে রিসিভ হয়েছে।
          </h2>
          <p className="text-base text-gray-600 mt-1">
            অর্ডার আইডি: <span className="font-bold text-[#E52565]">#{order.id.split('-')[0].toUpperCase()}</span>
          </p>
        </section>

        {/* Important Notice */}
        <div className="bg-[#F49547]/10 border border-[#F49547]/20 rounded-xl p-4 md:p-5 flex items-start gap-3 md:gap-4">
          <Info size={24} className="text-[#F49547] shrink-0 mt-0.5" />
          <p className="text-sm md:text-base font-medium text-gray-800 leading-relaxed">
            আমাদের একজন প্রতিনিধি খুব শীঘ্রই আপনাকে কল দিয়ে অর্ডারটি কনফার্ম করবেন। অনুগ্রহ করে আপনার মোবাইলটি সচল রাখুন।
          </p>
        </div>

        {/* Order Summary Card */}
        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100">
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">অর্ডারের বিবরণ</h3>
          
          <div className="space-y-4 mb-5">
            {orderItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#F5F5F5] p-2 border border-gray-100 flex items-center justify-center">
                  {/* Image is optional from order_items, handled as a fallback */}
                  <ShoppingBag className="text-gray-400 w-8 h-8" /> 
                </div>
                <div className="flex-1">
                  <h4 className="text-sm md:text-base font-bold text-gray-900 line-clamp-2">{item.product_name}</h4>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">পরিমাণ: {item.quantity} টি</p>
                  {item.variant && <p className="text-xs md:text-sm text-gray-500">ভ্যারিয়েন্ট: {item.variant}</p>}
                </div>
                <div className="text-base md:text-lg font-bold text-gray-900">
                  ৳{item.price}
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-3 text-sm md:text-base text-gray-600 border-t border-gray-100 pt-4">
            <div className="flex justify-between">
              <span>সাবটোটাল</span>
              <span className="font-bold text-gray-800">৳{order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>ডেলিভারি চার্জ</span>
              <span className="font-bold text-gray-800">৳{order.delivery_charge}</span>
            </div>
            <div className="flex justify-between text-lg md:text-xl font-bold text-[#E52565] pt-3 border-t border-gray-100 mt-1">
              <span>সর্বমোট</span>
              <span>৳{order.total_amount}</span>
            </div>
          </div>
        </section>

        {/* Delivery Information Card */}
        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">ডেলিভারি ইনফরমেশন</h3>
          <ul className="space-y-4 md:space-y-5">
            <li className="flex items-start gap-3 md:gap-4">
              <div className="p-2 bg-gray-50 rounded-full text-gray-400 mt-0.5">
                <UserIcon size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">নাম</p>
                <p className="text-sm md:text-base font-bold text-gray-900 mt-0.5">{order.customer_name || 'N/A'}</p>
              </div>
            </li>
            <li className="flex items-start gap-3 md:gap-4">
              <div className="p-2 bg-gray-50 rounded-full text-gray-400 mt-0.5">
                <Phone size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">মোবাইল</p>
                <p className="text-sm md:text-base font-bold text-gray-900 mt-0.5">{order.customer_phone}</p>
              </div>
            </li>
            <li className="flex items-start gap-3 md:gap-4">
              <div className="p-2 bg-gray-50 rounded-full text-gray-400 mt-0.5">
                <MapPin size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">ঠিকানা</p>
                <p className="text-sm md:text-base font-bold text-gray-900 mt-0.5">{order.shipping_address || order.customer_address}</p>
              </div>
            </li>
            <li className="flex items-start gap-3 md:gap-4">
              <div className="p-2 bg-gray-50 rounded-full text-gray-400 mt-0.5">
                <Banknote size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">পেমেন্ট মেথড</p>
                <p className="text-sm md:text-base font-bold text-[#E52565] mt-0.5">{order.payment_method || 'ক্যাশ অন ডেলিভারি (COD)'}</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link href="/shop" className="w-full bg-[#E52565] hover:bg-[#E52565]/90 text-white font-bold py-3.5 rounded-lg shadow-sm transition-colors text-center flex items-center justify-center gap-2">
            <ShoppingBag size={18} />
            আরও শপিং করুন
          </Link>
          <Link href="/" className="w-full bg-white border-2 border-gray-200 text-gray-700 hover:border-[#E52565] hover:text-[#E52565] font-bold py-3.5 rounded-lg shadow-sm transition-colors text-center flex items-center justify-center gap-2">
            <Home size={18} />
            হোমপেজে ফিরে যান
          </Link>
        </div>

      </main>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#E52565] animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}