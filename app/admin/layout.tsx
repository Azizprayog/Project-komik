import LogoutButton from "@/components/LogoutAdminButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <LogoutButton />
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
