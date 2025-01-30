<template>
  <div
    class="image-card"
    :class="[`image-card--${imageHeight}`]"
    @click="$emit('enlargeImage', image, imageDetails?.location.name)"
  >
    <SkeletonLoader v-if="isLoading" />
    <img
      v-if="image.urls.regular"
      :src="image.urls.regular"
      :alt="image.alt_description || 'Unsplash Image'"
      @load="handleImageLoad"
      @error="handleImageError"
      v-show="!isLoading"
    />
    <div class="image-card__desc" v-show="!isLoading">
      <h1>{{ image.user.name }}</h1>
      <p>{{ imageDetails?.location.name || "" }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import useFetchUnsplashImages from "@/composables/useFetchImages";
import type { UnsplashImage } from "../types/declarations";
import SkeletonLoader from "./SkeletonLoader.vue";

interface Props {
  image: UnsplashImage;
  isTall?: boolean;
  columnIndex?: number;
}
const props = defineProps<Props>();

const isLoading = ref(true);
const { fetchImageById, imageDetails } = useFetchUnsplashImages();

onMounted(() => {
  fetchImageById(props.image.id);
});

const handleImageLoad = () => {
  isLoading.value = false;
};

const handleImageError = () => {
  console.error("Error loading image");
  isLoading.value = false;
};

const imageHeight = computed(() => {
  if (props.columnIndex === 0) {
    return "default";
  } else if (props.columnIndex === 1) {
    return "tall";
  }
  return "medium";
});
</script>

<style scoped lang="scss">
.image-card {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;

  &--default {
    height: 300px !important;
  }

  &--medium {
    height: 500px !important;
  }

  &--tall {
    height: 600px !important;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    transition: background 0.3s ease;
  }

  &__desc {
    position: absolute;
    bottom: 2rem;
    left: 1.5rem;
    right: 1.5rem;
    color: white;
    z-index: 2;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);

    h1 {
      font-size: 2rem;
      font-weight: 400 !important;
    }

    p {
      font-size: 1rem;
    }
  }

  &:hover::before {
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
