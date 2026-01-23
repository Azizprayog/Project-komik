"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log({ email, password });
    // nanti kita sambung ke API login
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div
        className="
          w-full max-w-md
          bg-slate-900
          border border-slate-700
          rounded-xl
          p-8
          shadow-lg
        "
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            className="
              w-full px-4 py-2 rounded-lg
              bg-slate-800
              border border-slate-700
              focus:outline-none
              focus:border-purple-500
            "
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="
              w-full py-2 rounded-lg
              bg-purple-600
              hover:bg-purple-500
              transition
              font-semibold
            "
          >
            Login
          </button>
        </form>

        {/* LINKS */}
        <div className="flex justify-between text-sm mt-4">

          <a
            href="/forgot-password"
            className="text-purple-400 hover:underline"
          >
            Forgot password?
          </a>

          <a
            href="/register"
            className="text-purple-400 hover:underline"
          >
            Register
          </a>

        </div>
      </div>
    </div>
  );
}
