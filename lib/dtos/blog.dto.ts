import z from "zod";
import { BlogSchema } from "../types/blog.type";

export const CreateBlogDto = BlogSchema.pick({
    title: true,
    content: true,
});

export type CreateBlogDto = z.infer<typeof CreateBlogDto>;

export const UpdateBlogDto = BlogSchema.partial();

export type UpdateBlogDto = z.infer<typeof UpdateBlogDto>;
