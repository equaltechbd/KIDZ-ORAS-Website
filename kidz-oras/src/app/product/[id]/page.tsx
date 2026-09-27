/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { 
  Star, Share2, MapPin, Truck, ShieldCheck, RotateCcw, 
  MessageSquare, ChevronRight, Plus, Minus, QrCode, AlertCircle
} from "lucide-react";

export default function SingleProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const router = useRouter();

  // ডামি ডেটা 
  const product = {
    id: "PRD-001",
    title: "Wooden kids toy set - Kids cook pot set 30 pcs",
    price: 599,
    rating: 4.7,
    reviews: 140,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDN7P6f248ZyWilkiqmtHN332jWtuKfRNW5Pb02o5y9FmSlXEUqaNHCDMMqoUADbrXEFxcE2nS9iQWu2MSO77j7IWBt30Z_0xkEnOThOFXS3AwPLh-Mqji-lDYgfkOdZ2mlWjRT4meVrLnUzzFtwsPilFHMhoWUX4LSExj7tj4fjd0-8mMRy5B038_dvRIcbg2o9jqFuAV7lQnoZq-6uvvOKBeqE1m45Moj8XYZHr7A4H2QZkqmHSG3",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiNVvtEG3oFqFg05B8OdeQL4kSQdpTXw1ZE3QSusVFz93Q5B2TGxYf-QVDsJDD2h2Q6qVy-Zu37DxTlFyRXMmQdM-yP-CQl4YtGbfh9jt7Xn9SlXIin0eOE3ZC0MaxxUSr1iidBpYP7hwKHFyMv7yWBG7rnM4l-m1SGdsCfpun3f_d2a3-Bx6mpVStn99mBeQqJPbYdxOfYygtY4lq26cLflC8X58WmBwRUoJYO_sfQlDNSGb2XQCG",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbypmutJAUoTsfZiwVaqynUq38i2PH7x9Oxl2K1M3kd9u69KwQK7c5xQnPUHjgGqrZ7vmCr0Lhp0jLKh8FekiuRRFFufabjPCVE2_cxefLObbMjrxebD7zZRIzIJrLyPraqPrUnF7F_mArtcTb4I2--R7rq_LvAQGcc4Hh1f536EXaxpmYV2IG9wOZNXkedK_7sq8dMRsvuaQL6b5Ph36DYZZw-KWNDB_yJJ9A130x0Zj0kiEdA8IL"
    ]
  };

  // 🔴 Cart Logic: লোকাল স্টোরেজে প্রোডাক্ট সেভ করা
  const addToCartLogic = () => {
    const cartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
      variant: "Multicolor"
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === cartItem.id);
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(existingCart));
  };

  // Add to Cart Button Action
  const handleAddToCart = () => {
    addToCartLogic();
    toast.success("প্রোডাক্ট কার্টে যোগ করা হয়েছে!");
  };

  // Buy Now Button Action
  const handleBuyNow = () => {
    addToCartLogic();
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#eff0f5] text-[#212121] font-sans pb-20 pt-[60px] md:pt-[80px]">
      <Toaster position="top-center" />
      
      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-4 py-3 text-[13px] text-gray-500 flex items-center gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
        <Link href="/" className="hover:text-[#E52565] transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link href="/shop" className="hover:text-[#E52565] transition-colors">Toys & Games</Link>
        <ChevronRight size={14} />
        <span className="text-gray-800 line-clamp-1">{product.title}</span>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 flex flex-col gap-4">
        
        {/* --- Top Section: Images, Info, Delivery --- */}
        <div className="bg-white rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-0 border border-gray-100">
          
          {/* 1. Left Column: Product Images */}
          <div className="lg:col-span-4 p-4 md:p-6 border-b lg:border-b-0 lg:border-r border-gray-100">
            <div className="aspect-square bg-gray-50 mb-4 rounded-sm overflow-hidden flex items-center justify-center">
              <img src={product.images[activeImage]} alt="Product" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`w-14 h-14 shrink-0 border-2 rounded-sm overflow-hidden p-1 ${activeImage === idx ? 'border-[#E52565]' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover mix-blend-multiply" />
                </button>
              ))}
            </div>
          </div>

          {/* 2. Middle Column: Product Info */}
          <div className="lg:col-span-5 p-4 md:p-6 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col">
            <div className="flex justify-between items-start gap-4 mb-2">
              <h1 className="text-xl md:text-[22px] font-medium text-gray-900 leading-snug">
                {product.title}
              </h1>
              <button className="text-gray-400 hover:text-[#E52565] shrink-0 mt-1 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-sm mb-4">
              <div className="flex items-center gap-1 text-[#F49547]">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" className="text-gray-300" />
              </div>
              <Link href="#reviews" className="text-[#E52565] hover:underline">{product.rating} Ratings</Link>
            </div>

            <div className="py-4 border-t border-gray-100">
              <span className="text-3xl font-bold text-[#E52565]">৳ {product.price}</span>
            </div>

            <div className="py-4 border-t border-gray-100 flex-1">
              <div className="mb-6">
                <span className="text-sm text-gray-500 block mb-2">Color Family: <span className="text-gray-800 font-medium">Multicolor</span></span>
                <div className="flex gap-2">
                  <div className="w-10 h-10 border border-[#E52565] p-0.5 cursor-pointer">
                    <img src={product.images[0]} className="w-full h-full object-cover" alt="color" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm text-gray-500 w-16">Quantity</span>
                <div className="flex items-center">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-[#E52565] hover:text-white transition-colors"><Minus size={16}/></button>
                  <span className="w-12 h-8 flex items-center justify-center font-medium text-gray-800">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-[#E52565] hover:text-white transition-colors"><Plus size={16}/></button>
                </div>
              </div>

              <div className="flex gap-3 mt-auto">
                <button onClick={handleBuyNow} className="flex-1 bg-[#E52565] hover:bg-[#cc1f57] text-white font-medium py-3 rounded-sm transition-colors shadow-sm">
                  Buy Now
                </button>
                <button onClick={handleAddToCart} className="flex-1 bg-[#F49547] hover:bg-[#d87c33] text-white font-medium py-3 rounded-sm transition-colors shadow-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* 3. Right Column: Delivery & Seller */}
          <div className="lg:col-span-3 bg-[#fafafa] lg:bg-white p-4 md:p-6 text-sm">
            {/* Delivery Options */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-gray-500 text-xs uppercase font-semibold">Delivery Options</h3>
                <AlertCircle size={14} className="text-gray-400" />
              </div>
              <div className="flex gap-3 items-start mb-4 py-3 border-b border-gray-100">
                <Truck size={20} className="text-[#E52565] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">Standard Delivery</p>
                  <p className="text-gray-500 text-xs mt-0.5">১-৩ দিনের মধ্যে ডেলিভারি</p>
                </div>
                <span className="font-medium text-[#E52565]">৳ 60+</span>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 border border-[#E52565] text-[#E52565] rounded-sm flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">৳</div>
                <p className="text-gray-800">Cash on Delivery Available</p>
              </div>
            </div>

            {/* Return & Warranty */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-gray-500 text-xs uppercase font-semibold">Return & Warranty</h3>
                <AlertCircle size={14} className="text-gray-400" />
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3 items-start">
                  <RotateCcw size={18} className="text-gray-500 shrink-0" />
                  <span className="text-gray-800">100% Authentic Product</span>
                </li>
                <li className="flex gap-3 items-start">
                  <ShieldCheck size={18} className="text-[#41C1C0] shrink-0" />
                  <span className="text-gray-800">Safe & Secure Payment</span>
                </li>
              </ul>
            </div>

            {/* Seller Info */}
            <div className="bg-gray-50 border border-gray-100 p-4 rounded-sm">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Sold by</p>
                  <p className="text-[#E52565] font-bold">Kidz Oras Official</p>
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 overflow-hidden">
                   <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx02yTRDOJbMk7xjU5ULRxzbKNMTucJICwrA1eAywfJxP-zDT5OoqWvEIOHDzC15-nP2b4llzWD7aObmP7FGL0nI2cUNBuiVe25N5UVLo41G3xGLRyzGcjlkax8_2AGm0xJR7RVcx2ik2QmvrBAY4j4RTn4of1i4tuJzTVVf92bP-Wni6VOmsQdqIfkQr75CitP0uesZkol6DpcquXd-Rme4_S3qByKJb1MbE5OnRBToYz08Uik-ceQPH3fQqq5AxIUQ" alt="Logo" className="w-8 h-8 object-contain" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- Product Details Section --- */}
        <div className="bg-white rounded-sm p-4 md:p-6 border border-gray-100 mt-2">
          <h2 className="bg-[#fafafa] px-4 py-3 text-gray-800 font-medium text-sm border-b border-gray-200 mb-4 -mx-4 md:-mx-6 -mt-4 md:-mt-6">
            Product details of {product.title}
          </h2>
          <div className="text-sm text-gray-700 leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <ul className="list-disc pl-5 space-y-1">
              <li>Toys & Games</li>
              <li>Dress Up & Pretend Play</li>
              <li>Playsets</li>
            </ul>
            <ul className="list-disc pl-5 space-y-1">
              <li>Housekeeping</li>
              <li>Wooden kids toy set - Kids cook pot set 30 pcs</li>
            </ul>
          </div>
          <div className="text-sm text-gray-700">
            <p className="mb-2 font-medium">বিস্তারিত বিবরণ:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4 text-gray-600">
              <li>বাচ্চাদের জন্য নিরাপদ উডেন ম্যাটেরিয়াল দিয়ে তৈরি।</li>
              <li>ব্রেণ ডেভেলপমেন্ট এবং ক্রিয়েটিভ খেলার জন্য দারুণ।</li>
              <li>খুবই প্রিমিয়াম ফিনিশিং, কোনো ধারালো কোণা নেই।</li>
              <li>গিফট করার জন্য সেরা একটি পছন্দ।</li>
            </ul>
            <p className="mt-2 text-[#E52565] font-medium">#woodtoys #kidzoras</p>
          </div>
        </div>

        {/* --- Ratings & Reviews --- */}
        <div id="reviews" className="bg-white rounded-sm p-4 md:p-6 border border-gray-100">
          <h2 className="text-gray-800 font-medium text-sm mb-6 border-b border-gray-100 pb-3">
            Ratings & Reviews of {product.title}
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-gray-100">
            <div className="flex flex-col items-start w-48">
              <div className="flex items-baseline gap-2">
                <span className="text-[40px] text-gray-800 font-medium leading-none">4.7</span>
                <span className="text-2xl text-gray-400 font-light">/5</span>
              </div>
              <div className="flex items-center gap-1 text-[#F49547] my-2">
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" className="text-gray-300" />
              </div>
              <span className="text-xs text-gray-500">{product.reviews} Ratings</span>
            </div>
            
            {/* Stars Bar */}
            <div className="flex-1 max-w-xs space-y-1">
              {[5, 4, 3, 2, 1].map((star, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="flex text-[#F49547]">
                    {[...Array(star)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                    {[...Array(5 - star)].map((_, i) => <Star key={i} size={10} fill="#e5e7eb" className="text-gray-200" />)}
                  </div>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full bg-[#F49547] ${star === 5 ? 'w-[80%]' : star === 4 ? 'w-[15%]' : 'w-0'}`}></div>
                  </div>
                  <span className="w-4">{star === 5 ? '112' : star === 4 ? '28' : '0'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            <div className="border-b border-gray-50 pb-6">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-1 text-[#F49547] mb-1">
                  <Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" />
                </div>
                <span className="text-xs text-gray-400">14 Sep 2026</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">by Tania M. <span className="text-green-600 flex items-center inline-flex gap-1"><ShieldCheck size={10}/> Verified Purchase</span></p>
              <p className="text-sm text-gray-800 mb-3">
                বাচ্চার জন্য এটা প্রথমবার অডার করছি এবং প্রোডাক্ট কোয়ালিটি অসাধারণ হয়েছে। বাচ্চা অনেক খুশি। প্যাকিংটাও অনেক সেফ ছিল। সেলারকে ধন্যবাদ।
              </p>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-1 text-[#F49547] mb-1">
                  <Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" />
                </div>
                <span className="text-xs text-gray-400">10 Sep 2026</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">by Shafiq R. <span className="text-green-600 flex items-center inline-flex gap-1"><ShieldCheck size={10}/> Verified Purchase</span></p>
              <p className="text-sm text-gray-800 mb-3">
                খুবই সুন্দর প্রোডাক্ট! আমার মেয়ে তো সারাদিন এটা নিয়েই খেলছে। উডেন ম্যাটেরিয়াল খুবই প্রিমিয়াম মনে হচ্ছে।
              </p>
            </div>
          </div>
        </div>

        {/* --- Questions about this product (Fixed) --- */}
        <div className="bg-white rounded-sm p-4 md:p-6 border border-gray-100 mt-2">
          <h2 className="text-gray-800 font-medium text-sm mb-6 border-b border-gray-100 pb-3">
            Questions about this product (0)
          </h2>
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <MessageSquare size={32} className="text-gray-300 mb-3" />
            <p className="text-sm text-gray-500 mb-2">কোনো প্রশ্ন থাকলে সরাসরি আমাদের পেজে মেসেজ করুন</p>
            <a href="https://m.me/kidzoras" target="_blank" rel="noreferrer" className="text-[#E52565] hover:text-white border border-[#E52565] hover:bg-[#E52565] transition-colors font-medium px-6 py-2 rounded-sm text-sm">
              আমাদের ইনবক্স করুন
            </a>
          </div>
        </div>

        {/* --- You may also like --- */}
        <div className="mt-4">
          <h2 className="text-gray-800 font-medium text-sm mb-4">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Link href="#" key={item} className="bg-white hover:shadow-md transition-shadow duration-200 rounded-sm overflow-hidden flex flex-col group border border-transparent hover:border-gray-200">
                <div className="aspect-square bg-gray-50 p-2">
                  <img src={product.images[0]} alt="Related" className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="p-2 flex flex-col flex-1">
                  <p className="text-xs text-gray-800 line-clamp-2 mb-2 group-hover:text-[#E52565] transition-colors">35 pcs Wooden kids toy - Kids cook pot set</p>
                  <p className="text-sm font-bold text-[#E52565] mt-auto">৳ 449</p>
                  <div className="flex text-[#F49547] mt-1">
                    <Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Mobile Fixed Action Bar (Sticky at bottom) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 flex shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <a href="https://m.me/kidzoras" className="flex-1 flex flex-col items-center justify-center py-2 text-gray-600 bg-gray-50 hover:text-[#E52565] transition-colors">
          <MessageSquare size={18} />
          <span className="text-[10px] mt-0.5 font-medium">Chat</span>
        </a>
        <button onClick={handleBuyNow} className="flex-[2] bg-[#E52565] text-white font-medium text-sm py-3">
          Buy Now
        </button>
        <button onClick={handleAddToCart} className="flex-[2] bg-[#F49547] text-white font-medium text-sm py-3">
          Add to Cart
        </button>
      </div>

    </div>
  );
}