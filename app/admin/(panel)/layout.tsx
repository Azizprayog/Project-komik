"use client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  async function handleLogout() {
    await fetch("/api/auth/admin-quit", {
      method: "POST",
    });

    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <div className="border-b border-white/10 px-6 py-4 flex justify-between">
        <h1 className="font-bold">Admin Panel</h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="px-6 py-6">{children}</div>
    </div>
  );
}
