import z from "zod";

export const GallerySchema = z.object({
    _id: z.string().optional(),
    id: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    image_url: z.string(),
    category: z.string(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type GalleryType = z.infer<typeof GallerySchema>;

export const CreateGalleryDto = GallerySchema.pick({
    title: true,
    description: true,
    image_url: true,
    category: true,
});

export type CreateGalleryDto = z.infer<typeof CreateGalleryDto>;

export const UpdateGalleryDto = GallerySchema.partial();

export type UpdateGalleryDto = z.infer<typeof UpdateGalleryDto>;
