import { z } from 'zod';

export const BookSchema = z.object({
    _id: z.string().optional(),
    id: z.string().min(1, "Book ID is required"),
    title: z.string().min(1, "Book title is required"),
    date: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type Book = z.infer<typeof BookSchema>;
