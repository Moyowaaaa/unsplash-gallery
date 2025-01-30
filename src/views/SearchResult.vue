<template>
  <div class="search-page">
    <div class="search-page__search-section">
      <button
        class="search-page__search-section--back-button"
        @click="router.back()"
      >
        &larr;
      </button>
      <h1 class="heading-1" v-if="route.query.search_value">
        <span v-if="!isLoading">Search Results for </span>
        <span v-else>Searching for </span>
        <span class="searchedValue">"{{ route.query.search_value }}"</span>
      </h1>
    </div>

    <div class="search-page__photos-gallery">
      <ImageViewer
        v-if="openModal"
        :image="image"
        @closeImage="toggleModal"
        :location="location"
      />
      <div v-if="error" class="photo-grid__error">{{ error }}</div>
      <div
        class="search-page__photos-gallery--column"
        v-for="(column, index) in groupedImages"
        :key="index"
        v-else
      >
        <ImageCard
          v-for="image in column"
          :key="image.id"
          :image="image"
          @enlargeImage="toggleModal"
          :column-index="index"
        />
      </div>
    </div>

    <div
      class="search-page__empty-state"
      v-if="!isLoading && !error && images.length === 0"
    >
      No images found here :(
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import useFetchUnsplashImages from "@/composables/useFetchImages";
import type { UnsplashImage } from "../types/declarations";
import ImageViewer from "@/components/ImageViewer.vue";
import ImageCard from "@/components/ImageCard.vue";

const route = useRoute();
const router = useRouter();

const { images, isLoading, error, searchImages } = useFetchUnsplashImages();
const image = ref<UnsplashImage | null>(null);
const location = ref<string | null>(null);

const groupedImages = computed(() => {
  if (!images.value) return [];
  const grouped: UnsplashImage[][] = [[], [], []];
  images.value.forEach((image, index) => {
    grouped[index % 3].push(image);
  });
  return grouped;
});

watch(
  () => route.query.search_value,
  (newSearchValue) => {
    if (newSearchValue) {
      searchImages(newSearchValue as string);
    }
  },
  { immediate: true }
);

const openModal = ref<boolean>(false);

const toggleModal = (
  selectedImage: UnsplashImage | null,
  selectedImageLocation: string | null
) => {
  openModal.value = !openModal.value;
  image.value = selectedImage;
  location.value = selectedImageLocation;
};
</script>

<style scoped lang="scss">
.search-page {
  width: 100%;
  max-width: 112rem;
  margin: auto;
  min-height: max-content;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 1rem;
  padding: 1rem;

  &__search-section {
    top: 0;
    width: 100%;
    max-width: 112rem;
    margin: auto;
    display: grid;
    align-items: end;
    gap: 2rem;
    // margin-top: 2rem;

    h1 {
      color: #223754;

      .searchedValue {
        color: #6d7b8e;
      }

      @media screen and (max-width: 991px) {
        text-align: center;
      }
    }

    &--back-button {
      padding: 1.5rem;
      border-radius: 50%;
      width: max-content;
      height: max-content;
      outline: none;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        box-shadow: 0 4px 6px rgba(0, 25, 40, 0.2);
        cursor: pointer;
      }
    }
  }

  &__photos-gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6rem;
    width: 100%;
    margin: 2rem auto;
    max-width: 112rem;

    @media screen and (max-width: 485px) {
      grid-template-columns: 1fr;
      width: 90%;
      gap: 4rem;
    }

    @media (min-width: 641px) and (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
      width: 90%;
    }

    &--column {
      display: flex;
      flex-direction: column;
      gap: 4rem;
    }

    &--image--tall {
      .image-card {
        height: calc(200% + 1rem);
      }
    }
  }

  &__empty-state {
    width: 100%;
    text-align: center;
    font-size: 2rem;
  }
}
</style>
