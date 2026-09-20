"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { 
  Menu, Bell, Search, Star, MessageSquare, CheckCircle, 
  XCircle, Trash2, Filter, Reply, Check, X, Image as ImageIcon 
} from "lucide-react";

// --- Mock Data ---
const mockReviews = [
  {
    id: "REV-001",
    customerName: "ফারজানা ইয়াসমিন",
    productName: "কিউট বেবি সুতি রমপার - প্রিমিয়াম",
    productImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuALG52l4H597Zus4CpnjmcgrWB9leinNtFPsCznTWr7puoP653tLm4mLY8ocqBA5kLsoHp97bYlnMLx1NDdeQxeuvp-paVAAh7QijRbSDO_LSf6nLa8j8lkRHBP67ghM13lQRHZ3203sba1Q8T1zqH7Ij1gZSyMEucuq2ZsL9WjvRbVtov32GG_HRrPoy5WBIZKk_L2zB8fmsD4u4vSvn4Dxi9MO-O6nTWqYnQP5-UitwjibcTjOB_v_KZktagBcaqypQ",
    rating: 5,
    date: "Sep 20, 2026",
    content: "কাপড়ের কোয়ালিটি অনেক ভালো। আমার বাবুর জন্য একদম পারফেক্ট হয়েছে। ডেলিভারিও ফাস্ট ছিল। ধন্যবাদ Kidz Oras!",
    status: "pending",
    adminReply: null
  },
  {
    id: "REV-002",
    customerName: "অজ্ঞাত ব্যবহারকারী",
    productName: "জিওমেট্রিক ব্লক সেট",
    productImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiNVvtEG3oFqFg05B8OdeQL4kSQdpTXw1ZE3QSusVFz93Q5B2TGxYf-QVDsJDD2h2Q6qVy-Zu37DxTlFyRXMmQdM-yP-CQl4YtGbfh9jt7Xn9SlXIin0eOE3ZC0MaxxUSr1iidBpYP7hwKHFyMv7yWBG7rnM4l-m1SGdsCfpun3f_d2a3-Bx6mpVStn99mBeQqJPbYdxOfYygtY4lq26cLflC8X58WmBwRUoJYO_sfQlDNSGb2XQCG",
    rating: 1,
    date: "Sep 19, 2026",
    content: "ফালতু একটা জিনিস, কেউ কিনবেন না। একদম বাজে! 🤬 (বাজে ভাষা)",
    status: "pending",
    adminReply: null
  },
  {
    id: "REV-003",
    customerName: "সাদমান সাকিব (প্রশ্ন)",
    productName: "উডেন মন্টিসরি ফিশিং টয়",
    productImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuDN7P6f248ZyWilkiqmtHN332jWtuKfRNW5Pb02o5y9FmSlXEUqaNHCDMMqoUADbrXEFxcE2nS9iQWu2MSO77j7IWBt30Z_0xkEnOThOFXS3AwPLh-Mqji-lDYgfkOdZ2mlWjRT4meVrLnUzzFtwsPilFHMhoWUX4LSExj7tj4fjd0-8mMRy5B038_dvRIcbg2o9jqFuAV7lQnoZq-6uvvOKBeqE1m45Moj8XYZHr7A4H2QZkqmHSG3",
    rating: 4,
    date: "Sep 18, 2026",
    content: "এটা কি ৫ বছরের বাচ্চার জন্য ঠিক হবে? সাইজটা একটু কনফার্ম করবেন দয়া করে।",
    status: "published",
    adminReply: "জি ভাইয়া, এটি ৩ থেকে ৬ বছরের বাচ্চাদের জন্য একদম উপযুক্ত। সাইজ নিয়ে চিন্তা করতে হবে না।"
  }
];

export default function ReviewsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<typeof mockReviews[0] | null>(null);

  // Filter reviews based on tab
  const filteredReviews = mockReviews.filter(review => review.status === activeTab);

  // Star Rating Component
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className={i < rating ? "fill-yellow-400 text-yellow-400" : "fill-[#2a2a2a] text-[#2a2a2a]"} />
        ))}
      </div>
    );
  };

  const openReplyModal = (review: typeof mockReviews[0]) => {
    setSelectedReview(review);
    setReplyModalOpen(true);
  };

  return (
    <div className="bg-[#050505] text-[#e5e2e1] min-h-screen font-sans selection:bg-[#F49547]/30 flex">
      
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 md:ml-[260px] flex flex-col min-h-screen w-full relative">
        
        {/* Header */}
        <header className="bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-30 border-b border-[#1f1f1f] flex justify-between items-center h-16 px-4 md:px-8">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-400 hover:text-[#F49547] p-2 rounded-lg">
              <Menu size={24} />
            </button>
            <div className="hidden md:block mr-8">
              <h1 className="text-xl font-bold text-white tracking-wide">KIDZ ORAS</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#1a1a1a] transition-colors relative">
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 md:p-8 space-y-6 w-full pb-20 max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Reviews & Q&A</h2>
              <p className="text-gray-400 mt-1 text-sm">Moderate customer feedback before they go live on products.</p>
            </div>
          </div>

          {/* Search & Tabs */}
          <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-2 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
            
            {/* Custom Tabs */}
            <div className="flex w-full md:w-auto p-1 bg-[#0a0a0a] rounded-xl border border-[#1f1f1f]">
              <button 
                onClick={() => setActiveTab("pending")}
                className={`flex-1 md:flex-none px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === 'pending' ? 'bg-[#1a1a1a] text-[#F49547] shadow-sm border border-[#2a2a2a]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Pending (২)
              </button>
              <button 
                onClick={() => setActiveTab("published")}
                className={`flex-1 md:flex-none px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === 'published' ? 'bg-[#1a1a1a] text-emerald-400 shadow-sm border border-[#2a2a2a]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Published
              </button>
              <button 
                onClick={() => setActiveTab("rejected")}
                className={`flex-1 md:flex-none px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === 'rejected' ? 'bg-[#1a1a1a] text-red-400 shadow-sm border border-[#2a2a2a]' : 'text-gray-500 hover:text-gray-300'}`}
              >
                Rejected
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full md:max-w-xs group px-2 md:px-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search reviews..." 
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#F49547]/50" 
              />
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <div key={review.id} className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 md:p-6 shadow-sm hover:border-[#333] transition-colors flex flex-col md:flex-row gap-6">
                  
                  {/* Left: Customer & Review Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-bold text-base flex items-center gap-2">
                          {review.customerName}
                          {review.status === 'published' && <CheckCircle size={14} className="text-emerald-500" />}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                      </div>
                      {renderStars(review.rating)}
                    </div>
                    
                    <p className="text-sm text-gray-300 leading-relaxed bg-[#0a0a0a] p-4 rounded-xl border border-[#1f1f1f]">
                      "{review.content}"
                    </p>

                    {/* Admin Reply Thread */}
                    {review.adminReply && (
                      <div className="ml-6 pl-4 border-l-2 border-[#F49547]/30 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded bg-[#F49547] text-white flex items-center justify-center font-bold text-[10px]">K</div>
                          <span className="text-xs font-bold text-[#F49547]">Kidz Oras (Admin)</span>
                        </div>
                        <p className="text-sm text-gray-400 bg-[#1a1a1a] p-3 rounded-lg border border-[#2a2a2a]">
                          {review.adminReply}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right: Product Info & Actions */}
                  <div className="w-full md:w-64 flex flex-col justify-between gap-4 md:border-l border-[#1f1f1f] md:pl-6">
                    {/* Product Snippet */}
                    <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]">
                      <img src={review.productImg} alt="Product" className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="text-xs text-white font-semibold line-clamp-1">{review.productName}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Product Link ↗</p>
                      </div>
                    </div>

                    {/* Moderation Actions */}
                    <div className="space-y-2">
                      {activeTab === 'pending' && (
                        <div className="grid grid-cols-2 gap-2">
                          <button className="flex items-center justify-center gap-1.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold transition-colors">
                            <Check size={14} /> Approve
                          </button>
                          <button className="flex items-center justify-center gap-1.5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold transition-colors">
                            <X size={14} /> Reject
                          </button>
                        </div>
                      )}
                      <button 
                        onClick={() => openReplyModal(review)}
                        className="w-full flex items-center justify-center gap-2 py-2 bg-[#1a1a1a] hover:bg-[#252525] text-gray-300 border border-[#2a2a2a] rounded-lg text-xs font-bold transition-colors"
                      >
                        <Reply size={14} /> {review.adminReply ? 'Edit Reply' : 'Write Reply'}
                      </button>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-[#121212] border border-[#1f1f1f] rounded-2xl">
                <MessageSquare size={40} className="mx-auto text-gray-600 mb-3" />
                <h3 className="text-lg font-bold text-gray-400">No {activeTab} reviews found.</h3>
                <p className="text-sm text-gray-500 mt-1">You're all caught up!</p>
              </div>
            )}
          </div>
        </main>

        {/* ---------------- Reply Modal ---------------- */}
        {replyModalOpen && selectedReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setReplyModalOpen(false)} />
            <div className="relative w-full max-w-lg bg-[#121212] border border-[#1f1f1f] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              
              <div className="flex justify-between items-center p-5 border-b border-[#1f1f1f] bg-[#0a0a0a]">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Reply size={18} className="text-[#F49547]" /> Reply to {selectedReview.customerName}
                </h3>
                <button onClick={() => setReplyModalOpen(false)} className="p-1.5 text-gray-400 hover:text-white bg-[#1a1a1a] rounded-full transition-colors">
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a]">
                  {renderStars(selectedReview.rating)}
                  <p className="text-sm text-gray-300 mt-2 italic">"{selectedReview.content}"</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Your Public Reply</label>
                  <textarea 
                    rows={4} 
                    defaultValue={selectedReview.adminReply || ""}
                    placeholder="Write a polite response. This will be visible on the product page..." 
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#F49547]/50 resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="p-5 border-t border-[#1f1f1f] bg-[#0a0a0a] flex gap-3 justify-end">
                <button onClick={() => setReplyModalOpen(false)} className="px-5 py-2.5 bg-[#1a1a1a] hover:bg-[#252525] border border-[#2a2a2a] rounded-xl text-sm font-semibold text-white transition-colors">
                  Cancel
                </button>
                <button className="px-6 py-2.5 bg-[#F49547] hover:bg-[#d87c33] rounded-xl text-sm font-semibold text-white transition-colors shadow-lg shadow-[#F49547]/20">
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}