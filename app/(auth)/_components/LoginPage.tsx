"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import InputField from "../../components/inputField";
import Button from "../../components/button";
import Image from "next/image";
import Link from "next/link";

// Zod schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } =
    useForm<LoginFormInputs>({
      resolver: zodResolver(loginSchema),
    });

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login data:", data);
    router.push("/auth/dashboard");
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

      {/* Login Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Email"
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

          <Button
            type="submit"
            className="mt-4 w-full bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            Login
          </Button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
