export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <div className="border-b border-white/10 px-6 py-4 flex justify-between">
        <h1 className="font-bold">Admin Panel</h1>
        <form action="/api/logout" method="post">
          <button className="bg-red-600 px-4 py-1 rounded">
            Logout
          </button>
        </form>
      </div>

      {/* CONTENT */}
      <div className="px-6 py-6">{children}</div>
    </div>
  );
}
