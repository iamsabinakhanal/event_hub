"use client";

import { FormEvent, useState } from "react";
import { handleTotpSetup, handleTotpVerify } from "@/lib/action/auth_action";

export default function SecurityPage() {
  const [setup, setSetup] = useState<{ secret?: string; otpauthUrl?: string } | null>(null);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const beginSetup = async () => {
    const result = await handleTotpSetup();
    if (result.success) setSetup(result.data);
    else setMessage(result.message || "Could not start MFA setup");
  };

  const verify = async (event: FormEvent) => {
    event.preventDefault();
    const result = await handleTotpVerify(code);
    setMessage(result.success ? "Authenticator verification enabled." : result.message || "Invalid code");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <section className="mx-auto max-w-xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-900">Account security</h1>
        <p className="mt-2 text-slate-600">Protect your Event Hub account with a time-based authenticator code.</p>
        {!setup ? (
          <button onClick={beginSetup} className="mt-8 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
            Set up authenticator
          </button>
        ) : (
          <form onSubmit={verify} className="mt-8 space-y-4">
            <p className="text-sm text-slate-700">Add this secret to your authenticator app, then enter the six-digit code.</p>
            <code className="block break-all rounded bg-slate-100 p-3 text-sm">{setup.secret}</code>
            <input
              value={code}
              onChange={(event) => setCode(event.target.value)}
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              placeholder="000000"
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              aria-label="Authenticator code"
            />
            <button className="rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700">Verify code</button>
          </form>
        )}
        {message && <p className="mt-6 text-sm text-slate-700">{message}</p>}
      </section>
    </main>
  );
}
