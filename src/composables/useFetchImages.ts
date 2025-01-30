import { ref } from "vue";
import axios from "axios";
import type { UnsplashImage } from "../types/declarations";

export default function useFetchUnsplashImages() {
  const images = ref<UnsplashImage[]>([]);
  const imageDetails = ref<any>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const fetchImages = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    try {
      await delay(1000);
      const response = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          params: {
            query: "African",
            count: 8,
          },
          headers: {
            Authorization: `Client-ID ${
              import.meta.env.VITE_UNSPLASH_ACCESS_KEY
            }`,
          },
        }
      );
      images.value = response.data;
    } catch (e) {
      error.value = "An error occurred, Please try again later.";
    } finally {
      isLoading.value = false;
    }
  };

  const fetchImageById = async (id: string): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/${id}`,
        {
          headers: {
            Authorization: `Client-ID ${
              import.meta.env.VITE_UNSPLASH_ACCESS_KEY
            }`,
          },
        }
      );
      imageDetails.value = response.data;
      return response.data;
    } catch (e) {
      error.value = "An error occurred, Please try again later.";
    } finally {
      isLoading.value = false;
    }
  };

  const searchImages = async (query: string): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: query,
            per_page: 8,
          },
          headers: {
            Authorization: `Client-ID ${
              import.meta.env.VITE_UNSPLASH_ACCESS_KEY
            }`,
          },
        }
      );

      images.value = response.data.results;
    } catch (e) {
      error.value = "An error occurred, Please try again later.";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    images,
    isLoading,
    error,
    imageDetails,
    fetchImages,
    searchImages,
    fetchImageById,
  };
}
