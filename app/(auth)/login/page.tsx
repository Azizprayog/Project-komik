"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.href = "/";
    } else {
      alert("Login gagal");
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-sm mx-auto mt-40 bg-slate-900 p-6 rounded-xl"
    >
      <h1 className="text-xl mb-4 text-center">Login</h1>

      <input
        type="email"
        className="w-full mb-3 p-2 rounded bg-slate-800"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full mb-3 p-2 rounded bg-slate-800"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="bg-purple-600 w-full py-2 rounded hover:bg-purple-700 transition">
        Login
      </button>

      {/* 🔗 EXTRA LINKS */}
      <div className="mt-4 flex justify-between text-sm text-slate-400">
        <Link
          href="/forgot-password"
          className="hover:text-purple-400"
        >
          Forgot password?
        </Link>

        <Link
          href="/register"
          className="hover:text-purple-400"
        >
          Register
        </Link>
      </div>
    </form>
  );
}
