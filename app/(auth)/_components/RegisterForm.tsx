"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

import { registerSchema, type RegisterData } from "../../scheme";
import { handleRegister } from "@/lib/action/auth_action";

export default function RegisterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
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
    setSuccess(null);

    const res = await handleRegister(values);

    setIsSubmitting(false);

    if (!res.success) {
      setError(res.message || "Registration failed");
      return;
    }

    setVerificationEmail(values.email);
    setSuccess(res.message || "Account created. Check your email for the verification code.");
  };

  const handleVerifyEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsVerifying(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050"}/api/auth/verify-email`, {
        email: verificationEmail,
        code: verificationCode,
      });

      if (response.data?.success) {
        setSuccess("Email verified successfully. You can now sign in.");
        setTimeout(() => router.push("/auth/login"), 1200);
      } else {
        setError(response.data?.message || "Verification failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Verification failed");
    } finally {
      setIsVerifying(false);
    }
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

              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-white text-sm font-semibold">Username</label>
                <input
                  type="text"
                  placeholder="johndoe"
                  {...register("username")}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
                />
                {errors.username && (
                  <p className="text-red-400 text-xs">{errors.username.message}</p>
                )}
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
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    title={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-white text-sm font-semibold">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((visible) => !visible)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    title={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
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

              {success && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg text-sm">
                  {success}
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

            {verificationEmail && (
              <form onSubmit={handleVerifyEmail} className="mt-6 rounded-lg border border-gray-800 bg-gray-900/80 p-4">
                <h3 className="text-white font-semibold mb-2">Verify your email</h3>
                <p className="text-sm text-gray-400 mb-3">Enter the 6-digit code sent to {verificationEmail}</p>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(event) => setVerificationCode(event.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition"
                />
                <button
                  type="submit"
                  disabled={isVerifying || verificationCode.length !== 6}
                  className="w-full mt-3 bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifying ? "Verifying..." : "Verify Email"}
                </button>
              </form>
            )}

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
