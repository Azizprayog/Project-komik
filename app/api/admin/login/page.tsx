"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      window.location.href = "/admin";
    } else {
      alert("Login admin gagal");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-slate-900 p-6 rounded-xl w-[360px]"
      >
        <h1 className="text-xl font-bold mb-4 text-white">Admin Login</h1>

        <input
          className="w-full mb-3 px-3 py-2 rounded bg-slate-800 text-white"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 px-3 py-2 rounded bg-slate-800 text-white"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full py-2 bg-purple-600 rounded text-white">
          Login
        </button>
      </form>
    </div>
  );
}
