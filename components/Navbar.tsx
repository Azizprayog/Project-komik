"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import UserMenu from "./UserMenu";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Bookmark", href: "/bookmark" },
];

export default function Navbar({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-black via-slate-900 to-black">
      {/* LOGO */}
      <Link href="/" className="text-xl font-bold text-white">
        KomikKita
      </Link>

      {/* NAV MENU */}
      <div className="flex items-center gap-6">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "relative text-sm transition",
                isActive
                  ? "text-purple-400"
                  : "text-slate-300 hover:text-white",
              )}
            >
              {item.label}

              {isActive && (
                <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-purple-500 rounded-full" />
              )}
            </Link>
          );
        })}

        {/* USER AREA */}
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <Link
            href="/login"
            className="ml-4 px-4 py-1.5 rounded-md bg-purple-600 hover:bg-purple-700 text-sm text-white transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
