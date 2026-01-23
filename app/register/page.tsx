"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.href = "/login";
    } else {
      alert("Register gagal");
    }
  }

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-sm mx-auto mt-40 bg-slate-900 p-6 rounded"
    >
      <h1 className="text-xl mb-4">Register</h1>

      <input
        type="email"
        className="w-full mb-3 p-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full mb-3 p-2"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="bg-purple-600 w-full py-2 rounded">
        Register
      </button>
    </form>
  );
}
