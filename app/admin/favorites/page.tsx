import { handleGetAllFavorites } from "@/lib/action/favorite_action";
import FavoritesClient from "./FavoritesClient";

export const revalidate = 0; // Disable caching to show live data

export default async function FavoritesPage() {
  const result = await handleGetAllFavorites();
  const favorites = result.success ? result.data : [];

  return <FavoritesClient initialFavorites={favorites} />;
}
