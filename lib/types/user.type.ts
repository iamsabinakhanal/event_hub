import z from 'zod';

export const UserSchema = z.object({
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    role: z.enum(['admin', 'user']).default('user'),
    imageUrl: z.string().optional(),
    _id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type UserType = z.infer<typeof UserSchema>;
