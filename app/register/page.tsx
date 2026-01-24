"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (res.ok) {
      window.location.href = "/login";
    } else {
      alert("Register gagal");
    }
  }

  return (
    <form
      onSubmit={handleRegister}
      className="
        max-w-sm mx-auto mt-40
        bg-slate-900/90
        p-6 rounded-xl
        border border-slate-800
        shadow-[0_0_30px_-10px_rgba(168,85,247,0.45)]
      "
    >
      <h1 className="text-xl mb-4 font-semibold text-center">
        Register
      </h1>

      <input
        type="email"
        required
        className="
          w-full mb-3 p-2 rounded
          bg-slate-800 border border-slate-700
          focus:outline-none focus:border-purple-500
        "
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        required
        className="
          w-full mb-4 p-2 rounded
          bg-slate-800 border border-slate-700
          focus:outline-none focus:border-purple-500
        "
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        disabled={loading}
        className="
          bg-purple-600 hover:bg-purple-500
          w-full py-2 rounded
          font-medium transition
          disabled:opacity-60
          active:scale-95
        "
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {/* 👇 LOGIN LINK */}
      <p className="text-sm text-slate-400 mt-4 text-center">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-purple-400 hover:text-purple-300 underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
