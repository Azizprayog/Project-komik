import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full h-16 flex items-center justify-between px-8 bg-gradient-to-r from-black via-slate-900 to-black">
      {/* LEFT */}
      <Link href="/" className="text-xl font-bold text-white">
        KomikKita
      </Link>

      {/* CENTER */}
      <input
        type="text"
        placeholder="Cari komik..."
        className="w-[320px] px-4 py-2 rounded-md bg-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none"
      />

      {/* RIGHT */}
      <div className="flex items-center gap-6 text-sm">
        <Link
          href="/"
          className="text-slate-300 hover:text-white transition"
        >
          Home
        </Link>

        <Link
          href="/bookmark"
          className="text-slate-300 hover:text-white transition"
        >
          Bookmark
        </Link>

        {/* 🔥 LOGIN BUTTON */}
        <Link
          href="/login"
          className="px-4 py-1.5 rounded-md bg-purple-600 hover:bg-purple-500 text-white transition font-medium"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
