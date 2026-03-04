import z from "zod";
import { BookSchema } from "../types/book.type";

export const CreateBookDto = BookSchema.pick({
    id: true,
    title: true,
    date: true,
});

export type CreateBookDto = z.infer<typeof CreateBookDto>;

export const UpdateBookDto = BookSchema.partial();

export type UpdateBookDto = z.infer<typeof UpdateBookDto>;
