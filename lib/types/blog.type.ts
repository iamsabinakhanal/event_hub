import z from 'zod';

export const BlogSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1),
    content: z.string().min(1),
    authorId: z.string(),
    author: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type BlogType = z.infer<typeof BlogSchema>;
