"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPassword } from "@/lib/api/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ForgetPasswordSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" })
});

type ForgetPasswordData = z.infer<typeof ForgetPasswordSchema>;

export default function ForgetPasswordPage() {
    const router = useRouter();
    const [emailSent, setEmailSent] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgetPasswordData>({
        resolver: zodResolver(ForgetPasswordSchema)
    });

    const onSubmit = async (data: ForgetPasswordData) => {
        try {
            const response = await forgetPassword(data.email);
            if (response.success) {
                setEmailSent(true);
                toast.success('Password reset link sent to your email!');
            } else {
                toast.error(response.message || 'Failed to send reset link.');
            }
        } catch (error) {
            toast.error((error as Error).message || 'Failed to send reset link.');
        }
    };

    if (emailSent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
                <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center mb-6">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Mail className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h2>
                        <p className="text-gray-600 text-sm">
                            We've sent a password reset link to your email address. 
                            Please check your inbox and follow the instructions.
                        </p>
                    </div>
                    
                    <div className="space-y-3">
                        <Link 
                            href="/login"
                            className="w-full bg-[#134e4a] text-white py-3 rounded-xl font-semibold hover:bg-[#0e3a38] transition-colors flex items-center justify-center"
                        >
                            Back to Login
                        </Link>
                        <button
                            onClick={() => setEmailSent(false)}
                            className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                        >
                            Resend Email
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8">
                <Link href="/login" className="flex items-center gap-2 text-[#134e4a] hover:underline mb-6">
                    <ArrowLeft size={16} />
                    Back to Login
                </Link>

                <h2 className="text-[#134e4a] text-2xl font-bold py-5 text-center">
                    Forgot Password?
                </h2>
                <p className="text-gray-500 text-sm text-center mb-6">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                                {...register("email")}
                            />
                            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#134e4a] text-white py-3 rounded-xl font-semibold hover:bg-[#0e3a38] disabled:opacity-70 disabled:cursor-not-allowed transition-colors mt-6"
                    >
                        {isSubmitting ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm font-medium">
                    Remember your password?{" "}
                    <Link href="/login" className="text-[#00a884] font-bold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
