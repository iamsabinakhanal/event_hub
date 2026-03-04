import { handleGetAllGalleryImages } from "@/lib/action/gallery_action";
import GalleryClient from "./GalleryClient";

export const revalidate = 0; // Disable caching to show new uploads immediately

export default async function GalleryPage() {
  const result = await handleGetAllGalleryImages();

  const images = result.success ? result.data : [];

  return <GalleryClient initialImages={images} />;
}
