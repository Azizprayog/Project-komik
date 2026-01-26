"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordClient() {
  const params = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        password,
      }),
    });

    if (res.ok) setDone(true);
  }

  if (!token) return <p className="text-center mt-20">Invalid token</p>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded w-[360px]">
        <h1 className="text-xl font-bold mb-4">Reset Password</h1>

        {done ? (
          <p className="text-green-400">Password updated. Login again.</p>
        ) : (
          <>
            <input
              type="password"
              className="w-full mb-3 p-2 rounded bg-slate-800"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-purple-600 py-2 rounded">
              Reset password
            </button>
          </>
        )}
      </form>
    </div>
  );
}
