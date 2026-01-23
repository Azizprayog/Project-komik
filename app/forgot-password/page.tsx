export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl p-8">

        <h1 className="text-2xl font-bold mb-2 text-center">
          Reset Password
        </h1>

        <p className="text-sm text-slate-400 text-center mb-6">
          Enter your email and we’ll send a reset link.
        </p>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="
              w-full px-4 py-2 rounded-lg
              bg-slate-800
              border border-slate-700
              focus:outline-none
              focus:border-purple-500
            "
          />

          <button
            type="submit"
            className="
              w-full py-2 rounded-lg
              bg-purple-600 hover:bg-purple-500
              transition font-semibold
            "
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-sm text-center text-slate-400 mt-4">
          Back to{" "}
          <a href="/login" className="text-purple-400 hover:underline">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}
