/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Star, Share2, MapPin, Truck, ShieldCheck, RotateCcw, 
  MessageSquare, ChevronRight, Plus, Minus, QrCode, AlertCircle
} from "lucide-react";

export default function SingleProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // ডামি ডেটা (রেফারেন্স ইমেজ অনুযায়ী)
  const product = {
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

  return (
    <div className="min-h-screen bg-[#eff0f5] text-[#212121] font-sans pb-20 pt-[60px] md:pt-[80px]">
      
      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-4 py-3 text-[13px] text-gray-500 flex items-center gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link href="#" className="hover:text-blue-600 transition-colors">Toys & Games</Link>
        <ChevronRight size={14} />
        <Link href="#" className="hover:text-blue-600 transition-colors">Dress Up & Pretend Play</Link>
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
                  className={`w-14 h-14 shrink-0 border-2 rounded-sm overflow-hidden p-1 ${activeImage === idx ? 'border-orange-500' : 'border-transparent hover:border-gray-300'}`}
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
              <button className="text-gray-400 hover:text-gray-600 shrink-0 mt-1">
                <Share2 size={20} />
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-sm mb-4">
              <div className="flex items-center gap-1 text-[#f57224]">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" className="text-gray-300" />
              </div>
              <Link href="#reviews" className="text-blue-600 hover:underline">{product.rating} Ratings</Link>
            </div>

            <div className="py-4 border-t border-gray-100">
              <span className="text-3xl font-bold text-[#f57224]">৳ {product.price}</span>
            </div>

            <div className="py-4 border-t border-gray-100 flex-1">
              <div className="mb-6">
                <span className="text-sm text-gray-500 block mb-2">Color Family: <span className="text-gray-800 font-medium">Multicolor</span></span>
                <div className="flex gap-2">
                  <div className="w-10 h-10 border border-orange-500 p-0.5 cursor-pointer">
                    <img src={product.images[0]} className="w-full h-full object-cover" alt="color" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm text-gray-500 w-16">Quantity</span>
                <div className="flex items-center">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"><Minus size={16}/></button>
                  <span className="w-12 h-8 flex items-center justify-center font-medium text-gray-800">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"><Plus size={16}/></button>
                </div>
              </div>

              <div className="flex gap-3 mt-auto">
                <button className="flex-1 bg-[#25a5d8] hover:bg-[#1f8ebc] text-white font-medium py-3 rounded-sm transition-colors">
                  Buy Now
                </button>
                <button className="flex-1 bg-[#f57224] hover:bg-[#d0611e] text-white font-medium py-3 rounded-sm transition-colors">
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
              <div className="flex gap-3 items-start mb-4">
                <MapPin size={20} className="text-gray-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-800 leading-tight">Dhaka, Dhaka North, Banani Road No. 12 - 19</p>
                </div>
                <button className="text-blue-600 font-medium text-xs uppercase hover:underline">Change</button>
              </div>
              <div className="flex gap-3 items-start mb-4 py-3 border-y border-gray-200 lg:border-gray-100">
                <Truck size={20} className="text-gray-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">Standard Delivery</p>
                  <p className="text-gray-500 text-xs mt-0.5">Guaranteed by 29 Sep-2 Oct</p>
                </div>
                <span className="font-medium">৳ 140</span>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center shrink-0 mt-0.5 text-gray-500 font-bold text-[10px]">৳</div>
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
                  <span className="text-gray-800">14 days easy return</span>
                </li>
                <li className="flex gap-3 items-start">
                  <ShieldCheck size={18} className="text-gray-500 shrink-0" />
                  <span className="text-gray-800">Warranty not available</span>
                </li>
              </ul>
            </div>

            {/* App Promo QR Box */}
            <div className="bg-white border border-gray-200 p-3 flex items-center gap-3 mb-6 shadow-sm">
              <QrCode size={40} className="text-gray-800" />
              <div className="flex-1 flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                  <img src="https://img.icons8.com/color/48/daraz.png" alt="App" className="w-5 h-5 grayscale opacity-70" />
                </div>
                <p className="text-[10px] text-gray-500 leading-tight">Download app to enjoy exclusive discounts!</p>
              </div>
            </div>

            {/* Seller Info */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Sold by</p>
                  <p className="text-gray-800 font-medium">Online seller 2.0</p>
                </div>
                <button className="flex items-center gap-1 text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors">
                  <MessageSquare size={16} /> <span className="text-xs font-medium">Chat Now</span>
                </button>
              </div>
              <div className="grid grid-cols-3 divide-x divide-gray-200 border-t border-gray-100 pt-4">
                <div className="text-center px-1">
                  <p className="text-gray-500 text-[10px] mb-1">Positive Seller Ratings</p>
                  <p className="text-xl font-light text-gray-800">94%</p>
                </div>
                <div className="text-center px-1">
                  <p className="text-gray-500 text-[10px] mb-1">Ship on Time</p>
                  <p className="text-xl font-light text-gray-800">100%</p>
                </div>
                <div className="text-center px-1">
                  <p className="text-gray-500 text-[10px] mb-1">Chat Response Rate</p>
                  <p className="text-xs font-light text-gray-800 mt-2">Not enough data</p>
                </div>
              </div>
              <Link href="#" className="block text-center text-blue-600 font-medium text-xs mt-4 hover:underline uppercase">Go To Store</Link>
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
            <p className="mb-2">Product details of Wooden kids toy set - Kids cook pot set 30 pcs:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Wooden kids' toy set with 30 pcs cook pot set</li>
              <li>Perfect for dress up and pretend play</li>
              <li>Encourages imaginative and creative play</li>
              <li>High-quality wooden material for durability</li>
              <li>Ideal for kids who love to play kitchen games</li>
            </ul>
            <p>Wooden kids toy set - Kids cook pot set 30 pcs</p>
            <p className="mt-2 text-gray-500 font-medium">#wood toys for kids</p>
            <p className="text-gray-500 font-medium">#play kitchen set</p>
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
              <div className="flex items-center gap-1 text-[#f57224] my-2">
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" className="text-gray-300" />
              </div>
              <span className="text-xs text-gray-500">{product.reviews} Ratings</span>
            </div>
            
            {/* Stars Bar (Mockup) */}
            <div className="flex-1 max-w-xs space-y-1">
              {[5, 4, 3, 2, 1].map((star, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="flex text-[#f57224]">
                    {[...Array(star)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                    {[...Array(5 - star)].map((_, i) => <Star key={i} size={10} fill="#e5e7eb" className="text-gray-200" />)}
                  </div>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full bg-[#f57224] ${star === 5 ? 'w-[80%]' : star === 4 ? 'w-[15%]' : 'w-0'}`}></div>
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
                <div className="flex items-center gap-1 text-[#f57224] mb-1">
                  <Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" />
                </div>
                <span className="text-xs text-gray-400">14 Sep 2026</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">by Hasib A. <span className="text-green-600 flex items-center inline-flex gap-1"><ShieldCheck size={10}/> Verified Purchase</span></p>
              <p className="text-sm text-gray-800 mb-3">
                বাচ্চার জন্য এটা প্রথমবার অডার করছি এবং প্রোডাক্ট কোয়ালিটি অসাধারণ হয়েছে। বাচ্চা অনেক খুশি। প্যাকিংটাও অনেক সেফ ছিল। সেলারকে ধন্যবাদ।
              </p>
              <div className="flex gap-2">
                <div className="w-16 h-16 bg-gray-100 rounded-sm border border-gray-200 overflow-hidden">
                  <img src={product.images[0]} className="w-full h-full object-cover" alt="review pic" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-1 text-[#f57224] mb-1">
                  <Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" />
                </div>
                <span className="text-xs text-gray-400">10 Sep 2026</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">by Sadia I. <span className="text-green-600 flex items-center inline-flex gap-1"><ShieldCheck size={10}/> Verified Purchase</span></p>
              <p className="text-sm text-gray-800 mb-3">
                খুবই সুন্দর প্রোডাক্ট! আমার মেয়ে তো সারাদিন এটা নিয়েই খেলছে। উডেন ম্যাটেরিয়াল খুবই প্রিমিয়াম মনে হচ্ছে।
              </p>
              <div className="flex gap-2">
                <div className="w-16 h-16 bg-gray-100 rounded-sm border border-gray-200 overflow-hidden">
                  <img src={product.images[1]} className="w-full h-full object-cover" alt="review pic" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Questions about this product --- */}
        <div className="bg-white rounded-sm p-4 md:p-6 border border-gray-100 mt-2">
          <h2 className="text-gray-800 font-medium text-sm mb-6 border-b border-gray-100 pb-3">
            Questions about this product (0)
          </h2>
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <MessageSquare size={32} className="text-gray-300 mb-3" />
            <p className="text-sm text-gray-500 mb-1">There are no questions yet.</p>
            <p className="text-sm text-gray-500">
              <Link href="#" className="text-blue-600 hover:underline">Login</Link> or <Link href="#" className="text-blue-600 hover:underline">Register</Link> to ask the seller now and answer will show here.
            </p>
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
                  <p className="text-xs text-gray-800 line-clamp-2 mb-2 group-hover:text-[#f57224] transition-colors">35 pcs Wooden kids toy - Kids cook pot set</p>
                  <p className="text-sm font-bold text-[#f57224] mt-auto">৳ 449</p>
                  <div className="flex text-[#f57224] mt-1">
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
        <Link href="#" className="flex-1 flex flex-col items-center justify-center py-2 text-blue-600 bg-blue-50">
          <MessageSquare size={18} />
          <span className="text-[10px] mt-0.5 font-medium">Chat</span>
        </Link>
        <button className="flex-[2] bg-[#25a5d8] text-white font-medium text-sm py-3">
          Buy Now
        </button>
        <button className="flex-[2] bg-[#f57224] text-white font-medium text-sm py-3">
          Add to Cart
        </button>
      </div>

    </div>
  );
}