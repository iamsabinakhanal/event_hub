"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import InputField from "../../components/inputField";
import Button from "../../components/button";
import Link from "next/link";

// Zod schema for validation
const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Registration Data:", data);
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-purple-300">
      {/* Left Panel */}
      <div className="w-1/2 hidden md:flex flex-col items-center justify-center bg-pink-300 text-white p-10">
        <h1 className="text-3xl font-semibold mb-4">Welcome</h1>
        <p className="mb-6 text-center">
          Hello! Sign in to access your Event Hub dashboard
        </p>
        <Link href="/login">
          <button className="border border-white px-6 py-2 rounded hover:bg-white hover:text-pink-300 transition">
            Sign In
          </button>
        </Link>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-10">
        <div className="w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-6">Create account</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputField
              label="Name"
              name="name"
              register={register}
              error={errors.name?.message}
              placeholder="Enter your name"
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email?.message}
              placeholder="Enter your email"
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password?.message}
              placeholder="Enter password"
            />
            <Button type="submit" className="w-full bg-gray-200 text-black hover:bg-gray-300">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
