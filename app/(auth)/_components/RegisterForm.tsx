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

    const res = await handleRegister(values);

    setIsSubmitting(false);

    if (!res.success) {
      alert(res.message || "Registration failed");
      return;
    }

    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Create an account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Join Event Hub and start organizing today
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputField
            label="First Name"
            name="firstName"
            register={register}
            error={errors.firstName?.message}
          />

          <InputField
            label="Last Name"
            name="lastName"
            register={register}
            error={errors.lastName?.message}
          />

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

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            error={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-500 text-white hover:bg-purple-600 rounded-lg py-2.5 disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
