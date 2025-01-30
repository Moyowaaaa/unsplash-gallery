<template>
  <div v-if="image" class="image-viewer-modal">
    <div
      class="image-viewer-modal__overlay"
      @click="$emit('closeImage', null)"
    ></div>
    <div
      class="image-viewer-modal__close-button"
      @click="$emit('closeImage', null)"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6L6 18M6 6L18 18"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <div class="image-viewer-modal__content-container">
      <div class="image-viewer-modal__content-container--image-container">
        <img
          :src="image.urls.regular"
          :alt="image.alt_description || 'Unsplash Image'"
        />
      </div>
      <div class="image-viewer-modal__content-container--desc-container">
        <h1>{{ image.user.name }}</h1>
        <p>{{ location || "-" }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UnsplashImage } from "../types/declarations";

interface Props {
  image: UnsplashImage | null;
  location: string | null;
}
defineProps<Props>();
defineEmits();
</script>

<style scoped lang="scss">
.image-viewer-modal {
  height: 100vh;
  position: fixed;
  top: 0;
  width: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  left: 0;
  z-index: 9999999;

  &__close-button {
    border: 2pxsolid red;
    position: absolute;
    right: 15vw;
    top: 5vh;
    color: white;
    cursor: pointer;
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__content-container {
    width: 60%;
    position: relative;
    border-radius: 10px;
    height: 80vh;
    background-color: white;
    overflow: hidden;
    opacity: 1;
    transition: all 0.3s ease;
    transform: scale(0);
    animation-name: showModal;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-delay: 0s;
    animation-duration: 0.5s;

    @keyframes showModal {
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    &--image-container {
      height: 80%;
      max-height: 80%;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    &--desc-container {
      padding-left: 4rem;
      height: 20%;
      max-height: 20%;
      display: flex;
      justify-content: center;
      flex-direction: column;
    }

    @media screen and (max-width: 485px) {
      width: 95%;

      &--close-button {
        top: 0rem;
        left: 5rem;
        color: #ebebeb;
        cursor: pointer;
      }

      &--desc-container {
        padding-left: 2rem;
        font-size: 1.5rem;
        line-height: 3rem;
      }
    }

    @media screen and (min-width: 500px) and (max-width: 991px) {
      width: 95%;

      &--close-button {
        top: 0rem;
        left: 5rem;
        color: #ebebeb;
        cursor: pointer;
      }
    }
  }
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-down-enter,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
