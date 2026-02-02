"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import UserMenu from "./UserMenu";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Bookmark", href: "/bookmark" },
];

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  const [q, setQ] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const value = q.trim();
    if (!value) return;

    const params = new URLSearchParams({ q: value });
    const url = `/search?${params.toString()}`;

    if (pathname === "/search") {
      router.replace(url);
    } else {
      router.push(url); // dari home → masuk search
    }
  }

  return (
  <nav
    className="relative flex flex-col gap-4 md:grid md:grid-cols-3 md:items-center px-5 md:px-12 py-4 md:py-6 bg-gradient-to-r from-black via-slate-900 to-black">
      {/* LEFT */}
      <div className="flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-white">
          Fuzkomik
        </Link>
      </div>

      {/* CENTER */}
      <div className="flex w-full md:justify-center">
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-3 w-full md:max-w-xl">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search komik..."
            className="flex-1 bg-slate-900 border border-white/10 px-5 py-3 rounded-lg text-base text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="bg-purple-600 px-5 py-3 rounded-lg text-base hover:bg-purple-700 transition">
            Search
          </button>
        </form>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center md:justify-end gap-6">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "relative text-xl font-semibold transition",
                isActive
                  ? "text-purple-400"
                  : "text-slate-300 hover:text-white",
              )}>
              {item.label}

              {isActive && (
                <span className="absolute -bottom-2 left-0 h-[3px] w-full bg-purple-500 rounded-full" />
              )}
            </Link>
          );
        })}

        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <Link
            href="/login"
            className="ml-4 px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-base text-white transition">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
