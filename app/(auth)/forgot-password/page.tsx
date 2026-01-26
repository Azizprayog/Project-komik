"use client";

import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setSent(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded w-[360px]"
      >
        <h1 className="text-xl font-bold mb-4">
          Forgot Password
        </h1>

        {sent ? (
          <p className="text-green-400">
            Check console for reset link 😉
          </p>
        ) : (
          <>
            <input
              className="w-full mb-3 p-2 rounded bg-slate-800"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <button className="w-full bg-purple-600 py-2 rounded">
              Send reset link
            </button>
          </>
        )}
      </form>
    </div>
  );
}
