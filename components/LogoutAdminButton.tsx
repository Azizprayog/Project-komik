"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
    >
      Logout
    </button>
  );
}
