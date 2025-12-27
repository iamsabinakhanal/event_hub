"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import InputField from "../../components/inputField";
import Button from "../../components/button";
import Image from "next/image";
import Link from "next/link";

// Zod schema for validation
const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    console.log("Registration data:", data);
    alert("Registration successful! Redirecting to login...");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-400 to-purple-600 relative flex items-center justify-center">
      
      {/* ✅ WEBSITE LOGO (Top-left) */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Event-HUB Logo"
          width={36}
          height={36}
          priority
        />
        <span className="text-xl font-bold text-white">
          Event<span className="text-yellow-300">HUB</span>
        </span>
      </Link>

      {/* Register Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Full Name"
            name="name"
            register={register}
            error={errors.name?.message}
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            register={register}
            error={errors.email?.message}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            register={register}
            error={errors.password?.message}
          />
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            className="mt-4 w-full bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            Register
          </Button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
