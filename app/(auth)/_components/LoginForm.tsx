"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { LoginData, loginSchema } from "../../scheme";
import { handleLogin } from "@/lib/action/auth_action";

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
    console.log("Form submitted with values:", values);
    setError(null);

    startTransition(async () => {
      try {
        const response: any = await handleLogin(values);
        console.log("Login response:", response);

        if (response?.success) {
          // Redirect based on user role
          const userRole = response?.role || response?.data?.role || 'user';
          console.log("User role:", userRole);
          
          if (userRole === 'admin') {
            console.log("Redirecting to admin dashboard");
            setTimeout(() => {
              router.push("/admin");
            }, 100);
          } else {
            console.log("Redirecting to user dashboard");
            setTimeout(() => {
              router.push("/auth/dashboard");
            }, 100);
          }
        } else {
          setError(response?.message || "Login failed");
        }
      } catch (err: any) {
        setError(err?.message || "Login failed");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-black px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-600/10 rounded-full blur-2xl"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Gradient Border */}
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl blur-md opacity-75"></div>
          
          {/* Form Card */}
          <div className="relative bg-gray-950 rounded-2xl p-8 border border-gray-800 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Event Hub
              </h1>
              <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
              <p className="text-gray-400 text-sm mt-2">Sign in to your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label className="text-white text-sm font-semibold">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-white text-sm font-semibold">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                />
                {errors.password && (
                  <p className="text-red-400 text-xs">{errors.password.message}</p>
                )}
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center text-gray-400 cursor-pointer hover:text-white transition">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <Link 
                  href="/auth/forget-password" 
                  className="text-purple-400 hover:text-purple-300 transition font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={pending}
                className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {pending ? (
                  <>
                    <span className="inline-block animate-spin">⏳</span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
                

              </button>
               <Link 
                  href="/auth/dashboard" 
                ></Link>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 border-t border-gray-700"></div>
              <span className="text-gray-500 text-sm">or</span>
              <div className="flex-1 border-t border-gray-700"></div>
            </div>

            {/* Footer */}
            <p className="text-gray-400 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link 
                href="/register" 
                className="text-transparent bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text font-bold hover:opacity-80 transition"
              >
                Sign up now
              </Link>
            </p>

            {/* Additional Info */}
            <p className="text-gray-500 text-xs text-center mt-4">
              By signing in, you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}