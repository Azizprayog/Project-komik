"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Register failed");
      return;
    }

    // sukses -> ke login
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl p-8">

        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* USERNAME */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="
              w-full px-4 py-2 rounded-lg
              bg-slate-800
              border border-slate-700
              focus:outline-none
              focus:border-purple-500
            "
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full px-4 py-2 rounded-lg
              bg-slate-800
              border border-slate-700
              focus:outline-none
              focus:border-purple-500
            "
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="
              w-full px-4 py-2 rounded-lg
              bg-slate-800
              border border-slate-700
              focus:outline-none
              focus:border-purple-500
            "
          />

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-400 text-center">
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            disabled={loading}
            type="submit"
            className="
              w-full py-2 rounded-lg
              bg-purple-600 hover:bg-purple-500
              transition font-semibold
              disabled:opacity-50
            "
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <p className="text-sm text-center text-slate-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:underline">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}
