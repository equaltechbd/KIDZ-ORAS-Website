export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* 
      যেহেতু আমরা সাইডবার এবং হেডার প্রতিটি পেজেই (Dashboard, Orders, Products) 
      আলাদা করে দিয়েছি, তাই লেআউট ফাইলে শুধু এই বেসিক চিলড্রেন র‍্যাপারটি রাখছি। 
    */
    <div className="admin-wrapper bg-[#0a0a0a]">
      {children}
    </div>
  );
}