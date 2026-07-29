"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { handleOAuthToken } from "@/lib/action/auth_action";

export default function OAuthCompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const complete = async () => {
      const code = searchParams.get("code");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050"}/api/auth/oauth/google/exchange`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      const result = await handleOAuthToken(data.token || "");
      router.replace(result.success ? "/auth/dashboard" : "/login?error=oauth");
    };
    void complete();
  }, [router, searchParams]);

  return <main className="min-h-screen grid place-items-center">Completing secure sign-in...</main>;
}
