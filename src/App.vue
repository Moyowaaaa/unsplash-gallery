<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <main class="main-layout">
    <RouterView />
    <div class="main-layout__top-background"></div>
    <div class="main-layout__bottom-background"></div>
  </main>
</template>

<style lang="scss">
@import "@/assets/scss/index.scss";

.main-layout {
  margin: 0 auto;
  min-height: 100vh;
  overflow-x: auto;
  width: 100%;
  height: 100vh;
  padding-bottom: 5rem;
  box-sizing: border-box;

  @media screen and (min-width: 600px) {
    // padding: 4.8 2rem 9rem;
  }

  @media screen and (min-width: 992px) {
    // padding: 4.8rem 3.2rem 9rem;
  }

  &__top-background {
    position: fixed;
    top: 0;
    min-height: 30vh;
    width: 100%;
    background-color: #dce3eb;
    z-index: -5;
  }

  &__bottom-background {
    position: fixed;

    height: 60%;
    width: 100%;
    bottom: 0;
    background-color: #ffffff;
    z-index: -5;
  }
}
</style>
