"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Star, Home, Store, User, ArrowLeft, Heart, Share2, Tag, CheckCircle2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function SingleProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // ডামি প্রোডাক্ট ডেটা (পরবর্তীতে Supabase থেকে আসবে)
  const product = {
    id: "PRD-001",
    name: "কিউট বেবি সুতি রমপার - প্রিমিয়াম কোয়ালিটি",
    price: 600,
    oldPrice: 700,
    sold: "800+",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    description: "আপনার সোনামণির জন্য আরামদায়ক এবং প্রিমিয়াম কোয়ালিটির সুতি রমপার। গরমের জন্য একদম পারফেক্ট। কালার গ্যারান্টি এবং সফট ফেব্রিক।",
    features: ["১০০% সুতি কাপড়", "সফট ও আরামদায়ক", "সহজে ধোয়া যায়", "০-৬ মাসের বাচ্চার জন্য"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALG52l4H597Zus4CpnjmcgrWB9leinNtFPsCznTWr7puoP653tLm4mLY8ocqBA5kLsoHp97bYlnMLx1NDdeQxeuvp-paVAAh7QijRbSDO_LSf6nLa8j8lkRHBP67ghM13lQRHZ3203sba1Q8T1zqH7Ij1gZSyMEucuq2ZsL9WjvRbVtov32GG_HRrPoy5WBIZKk_L2zB8fmsD4u4vSvn4Dxi9MO-O6nTWqYnQP5-UitwjibcTjOB_v_KZktagBcaqypQ"
  };

  const handleAddToCart = () => {
    // এখানে কার্টে অ্যাড করার লজিক বসবে
    setIsAdded(true);
    toast.success("প্রোডাক্ট কার্টে যোগ করা হয়েছে!");
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen pb-32 bg-[#F8F9FA] text-[#221a15] font-sans">
      <Toaster position="top-center" />
      
      {/* Simple Header with Back Button */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <Link href="/" className="p-2 -ml-2 text-gray-600 hover:text-[#E52565] transition-colors rounded-full hover:bg-gray-50">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-base font-bold text-gray-800 line-clamp-1 flex-1 text-center px-4">প্রোডাক্ট বিস্তারিত</h1>
        <div className="flex gap-2 shrink-0">
          <button className="p-2 text-gray-600 hover:text-[#E52565] transition-colors rounded-full hover:bg-gray-50">
            <Share2 size={22} />
          </button>
          <Link href="/cart" className="p-2 text-gray-600 hover:text-[#E52565] transition-colors rounded-full hover:bg-gray-50 relative">
            <ShoppingCart size={22} />
            <span className="absolute top-1 right-1 bg-[#E52565] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">2</span>
          </Link>
        </div>
      </nav>

      <main className="pt-[60px]">
        {/* Product Image Section */}
        <div className="w-full bg-white relative aspect-square md:aspect-[4/3] lg:aspect-[21/9] max-h-[500px] flex justify-center items-center overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply sm:object-contain" />
          <button className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur rounded-full text-gray-400 hover:text-[#E52565] hover:bg-white transition-all shadow-sm">
            <Heart size={24} />
          </button>
        </div>

        <div className="max-w-4xl mx-auto md:mt-6 md:px-5">
          {/* Main Info Section */}
          <div className="bg-white p-5 md:rounded-2xl md:shadow-sm md:border md:border-gray-100 mb-2 md:mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#E52565] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Top Selling</span>
              <div className="flex items-center gap-1 text-[#F49547]">
                <Star size={14} fill="currentColor" />
                <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
              </div>
            </div>
            
            <h1 className="text-lg md:text-2xl font-bold text-gray-900 leading-snug mb-3">
              {product.name}
            </h1>
            
            <div className="flex items-end gap-3 mb-4">
              <span className="text-3xl font-bold text-[#E52565]">৳{product.price}</span>
              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through mb-1">৳{product.oldPrice}</span>
              )}
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded ml-auto mb-1 flex items-center gap-1">
                <CheckCircle2 size={12} /> {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div className="flex items-center gap-4 py-4 border-t border-gray-100">
              <span className="text-sm font-bold text-gray-700">পরিমাণ:</span>
              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#E52565] font-bold text-lg transition-colors">-</button>
                <span className="w-10 h-10 flex items-center justify-center font-bold text-gray-900 bg-white border-x border-gray-200">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#E52565] font-bold text-lg transition-colors">+</button>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white p-5 md:rounded-2xl md:shadow-sm md:border md:border-gray-100 mb-2 md:mb-6">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Tag size={18} className="text-[#E52565]" /> প্রোডাক্টের বিবরণ
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {product.description}
            </p>
            <ul className="space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#E52565] shrink-0"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Floating Action Bar (Add to Cart / Buy Now) */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-100 p-3 md:p-4 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:hidden">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <button 
            onClick={handleAddToCart}
            className={`flex-1 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              isAdded ? 'bg-green-500 text-white' : 'bg-[#FFF0F5] text-[#E52565] hover:bg-[#ffe4ee]'
            }`}
          >
            {isAdded ? <CheckCircle2 size={18} /> : <ShoppingCart size={18} />}
            {isAdded ? 'যোগ হয়েছে' : 'কার্টে রাখুন'}
          </button>
          <Link href="/checkout" className="flex-1 bg-[#E52565] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center shadow-lg shadow-[#E52565]/20 hover:bg-[#cc1f57] transition-all">
            অর্ডার করুন
          </Link>
        </div>
      </div>

      {/* Desktop Fixed Action Bar (Hidden on mobile) */}
      <div className="hidden md:block fixed bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-t border-gray-100 py-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto px-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <img src={product.image} alt="" className="w-12 h-12 rounded object-cover border border-gray-100" />
             <div>
               <p className="font-bold text-gray-900 text-sm line-clamp-1">{product.name}</p>
               <p className="text-[#E52565] font-bold">৳{product.price}</p>
             </div>
          </div>
          <div className="flex gap-3 w-[400px]">
            <button onClick={handleAddToCart} className="flex-1 bg-[#FFF0F5] text-[#E52565] hover:bg-[#ffe4ee] py-3 rounded-xl font-bold transition-all flex justify-center items-center gap-2">
              <ShoppingCart size={18}/> কার্টে রাখুন
            </button>
            <Link href="/checkout" className="flex-1 bg-[#E52565] text-white py-3 rounded-xl font-bold flex justify-center items-center shadow-lg shadow-[#E52565]/20 hover:bg-[#cc1f57] transition-all">
              অর্ডার করুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}