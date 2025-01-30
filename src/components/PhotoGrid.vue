<template>
  <div class="photo-grid">
    <ImageViewer
      v-if="openModal"
      :image="image"
      @closeImage="toggleModal"
      :location="location"
    />
    <div v-if="error" class="photo-grid__error">{{ error }}</div>
    <template v-else>
      <div
        class="photo-grid__column"
        v-for="(column, columnIndex) in groupedImages"
        :key="columnIndex"
        :class="{ 'photo-grid__column--tall': columnIndex === 1 }"
      >
        <ImageCard
          v-for="image in column"
          :key="image.id"
          :image="image"
          @enlargeImage="toggleModal"
          :column-index="columnIndex"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import useFetchUnsplashImages from "@/composables/useFetchImages";
import ImageCard from "./ImageCard.vue";
import ImageViewer from "./ImageViewer.vue";
import type { UnsplashImage } from "../types/declarations";

const { images, error, fetchImages } = useFetchUnsplashImages();
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

onMounted(fetchImages);

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
.photo-grid {
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

  @media (min-width: 486px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    width: 90%;
  }

  &__column {
    display: flex;
    flex-direction: column;
    gap: 4rem;

    &--tall {
      .photo-grid__image--tall {
        height: calc(100% + 4rem);
      }
    }
  }
}
</style>
