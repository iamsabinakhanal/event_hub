import z from "zod";
import { UserSchema } from "../types/user.type";

export const CreateUserDto = UserSchema.pick({
    username: true,
    email: true,
    password: true,
    firstName: true,
    lastName: true,
}).extend({
    confirmPassword: z.string().min(6),
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
);

export type CreateUserDto = z.infer<typeof CreateUserDto>;

export const LoginUserDto = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
});

export type LoginUserDto = z.infer<typeof LoginUserDto>;

export const UpdateUserDto = UserSchema.partial();

export type UpdateUserDto = z.infer<typeof UpdateUserDto>;

export const ResetPasswordDto = z.object({
    email: z.string().email(),
});

export type ResetPasswordDto = z.infer<typeof ResetPasswordDto>;
