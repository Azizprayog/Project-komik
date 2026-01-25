"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/admin-login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.message || "Login admin gagal");
      return;
    }

    // ✅ sukses → masuk admin
    window.location.href = "/admin";
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-slate-900 p-6 rounded-xl w-[360px]"
      >
        <h1 className="text-xl font-bold mb-4 text-white">
          Admin Login
        </h1>

        <input
          type="email"
          className="w-full mb-3 px-3 py-2 rounded bg-slate-800 text-white"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full mb-4 px-3 py-2 rounded bg-slate-800 text-white"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-purple-600 rounded text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}
