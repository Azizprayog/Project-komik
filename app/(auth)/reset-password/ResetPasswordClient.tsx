"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordClient() {
  const params = useSearchParams();
  const token = params.get("token");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (res.ok) {
        setDone(true);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to reset password");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-red-400">Invalid or missing token</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded w-[360px]"
      >
        <h1 className="text-xl font-bold mb-4">Reset Password</h1>
        
        {done ? (
          <p className="text-green-400">
            Password updated successfully! You can now login with your new password.
          </p>
        ) : (
          <>
            {error && (
              <p className="text-red-400 mb-3 text-sm">{error}</p>
            )}
            
            <input
              type="password"
              className="w-full mb-3 p-2 rounded bg-slate-800 text-white"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
            />
            
            <button 
              className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !password}
            >
              {loading ? "Resetting..." : "Reset password"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}