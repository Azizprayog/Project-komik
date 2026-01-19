"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Username atau password salah");
      return;
    }

    router.push("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-sm space-y-6 border border-slate-800 p-6 rounded-lg bg-slate-900">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>

        {/* Username */}
        <div className="space-y-1">
          <label className="text-sm text-slate-400">Username</label>
          <input
            type="text"
            placeholder="admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm text-slate-400">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Error */}
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        {/* Button */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded font-semibold disabled:opacity-50">
          {loading ? "Masuk..." : "Login"}
        </button>
      </div>
    </div>
  );
}
