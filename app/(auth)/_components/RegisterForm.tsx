"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import InputField from "../../components/inputField";
import Button from "../../components/button";

import { registerSchema, type RegisterData } from "../../scheme";
import { handleRegister } from "@/lib/action/auth_action";

export default function RegisterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterData) => {
    setIsSubmitting(true);
    setError(null);

    const res = await handleRegister(values);

    setIsSubmitting(false);

    if (!res.success) {
      setError(res.message || "Registration failed");
      return;
    }

    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-black px-4 relative overflow-hidden py-12">
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-5 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-5 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-2xl"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Gradient Border */}
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-r from-pink-600 via-purple-600 to-pink-600 rounded-2xl blur-md opacity-75"></div>
          
          {/* Form Card */}
          <div className="relative bg-gray-950 rounded-2xl p-8 border border-gray-800 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-linear-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Event Hub
              </h1>
              <h2 className="text-2xl font-bold text-white">Join Us Today</h2>
              <p className="text-gray-400 text-sm mt-2">Create your account and start organizing amazing events</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white text-sm font-semibold">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    {...register("firstName")}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-xs">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-white text-sm font-semibold">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    {...register("lastName")}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-xs">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-white text-sm font-semibold">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-white text-sm font-semibold">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
                />
                {errors.password && (
                  <p className="text-red-400 text-xs">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-white text-sm font-semibold">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Terms Checkbox */}
              <label className="flex items-start gap-3 text-sm text-gray-400 cursor-pointer hover:text-gray-300 transition">
                <input type="checkbox" className="mt-1" required />
                <span>
                  I agree to the{" "}
                  <Link href="#" className="text-pink-400 hover:text-pink-300 transition">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-pink-400 hover:text-pink-300 transition">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block animate-spin">⏳</span>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 border-t border-gray-700"></div>
              <span className="text-gray-500 text-sm">or</span>
              <div className="flex-1 border-t border-gray-700"></div>
            </div>

            {/* Footer */}
            <p className="text-gray-400 text-center text-sm">
              Already have an account?{" "}
              <Link 
                href="/auth/login" 
                className="text-transparent bg-linear-to-r from-pink-400 to-purple-400 bg-clip-text font-bold hover:opacity-80 transition"
              >
                Sign in here
              </Link>
            </p>

            {/* Additional Info */}
            <p className="text-gray-500 text-xs text-center mt-4">
              Secure your account with industry-leading encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
