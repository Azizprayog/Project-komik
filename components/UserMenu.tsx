"use client";

import { useState } from "react";
import Link from "next/link";

export default function UserMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center font-bold"
      >
        A
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-40 bg-[#111827] border border-white/10 rounded shadow-lg">
          <Link
            href="/settings"
            className="block px-4 py-2 hover:bg-white/10"
          >
            Pengaturan
          </Link>

          <form action="/api/auth/logout" method="POST">
            <button
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-white/10"
            >
              Logout
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
