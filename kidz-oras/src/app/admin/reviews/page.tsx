"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import toast, { Toaster } from "react-hot-toast";
import { 
  Search, Star, MessageSquare, CheckCircle, 
  Reply, Check, X, Loader2 
} from "lucide-react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any | null>(null);
  const [replyText, setReplyText] = useState("");

  const supabase = createClient();

  // Supabase থেকে রিয়েল-টাইম রিভিউ ফেচ করা
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setReviews(data);
    }
    setIsLoading(false);
  };

  // স্ট্যাটাস আপডেট (Approve / Reject)
  const updateReviewStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('reviews')
      .update({ status })
      .eq('id', id);
      
    if (error) {
      toast.error("স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে!");
    } else {
      toast.success(`রিভিউটি ${status} করা হয়েছে!`);
      fetchReviews();
    }
  };

  // অ্যাডমিন রিপ্লাই সাবমিট করা
  const handleReplySubmit = async () => {
    if (!selectedReview) return;
    
    const { error } = await supabase
      .from('reviews')
      .update({ admin_reply: replyText, status: 'published' }) 
      .eq('id', selectedReview.id);
      
    if (error) {
      toast.error("রিপ্লাই পোস্ট করতে সমস্যা হয়েছে!");
    } else {
      toast.success("রিপ্লাই সফলভাবে পোস্ট হয়েছে!");
      setReplyModalOpen(false);
      setReplyText("");
      fetchReviews();
    }
  };

  const filteredReviews = reviews.filter(review => review.status === activeTab);
  const pendingCount = reviews.filter(r => r.status === 'pending').length;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className={i < rating ? "fill-yellow-400 text-yellow-400" : "fill-[#2a2a2a] text-[#2a2a2a]"} />
        ))}
      </div>
    );
  };

  const openReplyModal = (review: any) => {
    setSelectedReview(review);
    setReplyText(review.admin_reply || "");
    setReplyModalOpen(true);
  };

  return (
    // এখান থেকে Sidebar, Header এবং ডাবল মার্জিন রিমুভ করা হয়েছে
    <div className="space-y-6 pb-20 text-[#e5e2e1] max-w-6xl mx-auto">
      <Toaster position="top-center" />
      
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
            Pending ({pendingCount})
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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#F49547]">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="text-gray-500 font-medium text-sm">রিভিউ লোড হচ্ছে...</p>
          </div>
        ) : filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-[#121212] border border-[#1f1f1f] rounded-2xl p-5 md:p-6 shadow-sm hover:border-[#333] transition-colors flex flex-col md:flex-row gap-6">
              
              {/* Left: Customer & Review Details */}
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-bold text-base flex items-center gap-2">
                      {review.customer_name || "অজ্ঞাত কাস্টমার"}
                      {review.status === 'published' && <CheckCircle size={14} className="text-emerald-500" />}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{new Date(review.created_at).toLocaleDateString()}</p>
                  </div>
                  {renderStars(review.rating || 5)}
                </div>
                
                <p className="text-sm text-gray-300 leading-relaxed bg-[#0a0a0a] p-4 rounded-xl border border-[#1f1f1f]">
                  "{review.content}"
                </p>

                {/* Admin Reply Thread */}
                {review.admin_reply && (
                  <div className="ml-6 pl-4 border-l-2 border-[#F49547]/30 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-[#F49547] text-white flex items-center justify-center font-bold text-[10px]">K</div>
                      <span className="text-xs font-bold text-[#F49547]">Kidz Oras (Admin)</span>
                    </div>
                    <p className="text-sm text-gray-400 bg-[#1a1a1a] p-3 rounded-lg border border-[#2a2a2a]">
                      {review.admin_reply}
                    </p>
                  </div>
                )}
              </div>

              {/* Right: Product Info & Actions */}
              <div className="w-full md:w-64 flex flex-col justify-between gap-4 md:border-l border-[#1f1f1f] md:pl-6">
                {/* Product Snippet */}
                <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]">
                  {review.product_img ? (
                    <img src={review.product_img} alt="Product" className="w-10 h-10 rounded-lg object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-[#2a2a2a] flex items-center justify-center text-gray-500">Img</div>
                  )}
                  <div>
                    <p className="text-xs text-white font-semibold line-clamp-1">{review.product_name || "Product"}</p>
                    <Link href={`/product/${review.product_id || '#'}`} className="text-[10px] text-gray-500 mt-0.5 hover:text-[#F49547] transition-colors">Product Link ↗</Link>
                  </div>
                </div>

                {/* Moderation Actions */}
                <div className="space-y-2">
                  {activeTab === 'pending' && (
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => updateReviewStatus(review.id, 'published')} className="flex items-center justify-center gap-1.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold transition-colors">
                        <Check size={14} /> Approve
                      </button>
                      <button onClick={() => updateReviewStatus(review.id, 'rejected')} className="flex items-center justify-center gap-1.5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold transition-colors">
                        <X size={14} /> Reject
                      </button>
                    </div>
                  )}
                  <button 
                    onClick={() => openReplyModal(review)}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-[#1a1a1a] hover:bg-[#252525] text-gray-300 border border-[#2a2a2a] rounded-lg text-xs font-bold transition-colors"
                  >
                    <Reply size={14} /> {review.admin_reply ? 'Edit Reply' : 'Write Reply'}
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

      {/* ---------------- Reply Modal ---------------- */}
      {replyModalOpen && selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setReplyModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#121212] border border-[#1f1f1f] rounded-2xl shadow-2xl overflow-hidden">
            
            <div className="flex justify-between items-center p-5 border-b border-[#1f1f1f] bg-[#0a0a0a]">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Reply size={18} className="text-[#F49547]" /> Reply to Customer
              </h3>
              <button onClick={() => setReplyModalOpen(false)} className="p-1.5 text-gray-400 hover:text-white bg-[#1a1a1a] rounded-full transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a]">
                {renderStars(selectedReview.rating || 5)}
                <p className="text-sm text-gray-300 mt-2 italic">"{selectedReview.content}"</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Your Public Reply</label>
                <textarea 
                  rows={4} 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a polite response. This will be visible on the product page..." 
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#F49547]/50 resize-none"
                ></textarea>
              </div>
            </div>

            <div className="p-5 border-t border-[#1f1f1f] bg-[#0a0a0a] flex gap-3 justify-end">
              <button onClick={() => setReplyModalOpen(false)} className="px-5 py-2.5 bg-[#1a1a1a] hover:bg-[#252525] border border-[#2a2a2a] rounded-xl text-sm font-semibold text-white transition-colors">
                Cancel
              </button>
              <button onClick={handleReplySubmit} className="px-6 py-2.5 bg-[#F49547] hover:bg-[#d87c33] rounded-xl text-sm font-semibold text-white transition-colors shadow-lg shadow-[#F49547]/20">
                Post Reply
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}