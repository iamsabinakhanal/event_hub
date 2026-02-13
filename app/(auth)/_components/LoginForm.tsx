"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { LoginData, loginSchema } from "../../scheme";
import { handleLogin } from "@/lib/action/auth_action";

import InputField from "../../components/inputField";
import Button from "../../components/button";

export default function LoginForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = (values: LoginData) => {
    setError(null);

    startTransition(async () => {
      try {
        const response: any = await handleLogin(values);

        if (!response?.success) {
          throw new Error(response?.message || "Login failed");
        }

        // Get role from common response shapes
        const role =
          response?.user?.role ||
          response?.data?.role ||
          response?.role ||
          "";

        //  Redirect based on role
        if (role === "admin") {
          router.push("/admin/users");
        } else {
          router.push("/auth/dashboard");
        }

        // Optional: refresh to re-run middleware / server components auth checks
        router.refresh();
      } catch (err: any) {
        setError(err?.message || "Login failed");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-100 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputField
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
          />

          <div className="flex justify-end">
            <Link href="/forget-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-600 text-white hover:bg-blue-700 py-2.5 rounded-lg disabled:opacity-50"
          >
            {pending ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}