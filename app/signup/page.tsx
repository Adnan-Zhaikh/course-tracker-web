"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

    async function handleSignup() {
        setLoading(true);

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });
        if (res.ok) {
            router.push("/login");
        } else {
            const data = await res.json();
            setError(data.error || "Signup failed");
        }
        setLoading(false);
    }
    return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Course Tracker</h1>
        <p className="text-gray-500 mb-6">Sign up to create your account</p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="adnan@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
  <label className="text-sm font-medium text-gray-700 block mb-1">
    Password
  </label>
  <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="••••••••"
    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
    onClick={() => setShowPassword(!showPassword)}
    className="text-xs text-blue-500 mt-1 hover:underline"
  >
    {showPassword ? "Hide password" : "Show password"}
  </button>
</div>
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}