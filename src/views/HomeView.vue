<template>
  <div class="home-page">
    <div class="home-page__search-section">
      <h1 class="heading-1" v-if="didSearch">
        Searching for <span class="searchedValue">"{{ searchValue }}"</span>
      </h1>
      <SearchBar v-model="searchValue" @searched="onSearchValue" />
    </div>

    <div class="home-page__bottom-section">
      <PhotoGrid />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import PhotoGrid from "@/components/PhotoGrid.vue";

const searchValue = ref<string>("");
const didSearch = ref<boolean>(false);

const onSearchValue = () => {
  didSearch.value = !false;
};

watchEffect(() => {
  if (searchValue.value !== "") {
    didSearch.value = false;
  }
});
</script>

<style scoped lang="scss">
.home-page {
  width: 100%;
  max-width: 115rem;
  margin: auto;
  min-height: max-content;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 4rem;

  &__search-section {
    top: 0;
    width: 100%;
    max-width: 115rem;
    margin: auto;
    display: grid;
    align-items: end;
    top: 0;
    margin-top: 2vh;
    h1 {
      color: #223754;
    }
  }

  &__bottom-section {
    width: 90%;
    margin: auto;
    display: grid;
    grid-template-rows: auto 1fr;
  }

  .searchedValue {
    color: #6d7b8e;
  }

  @media screen and (max-width: 991px) {
    &__search-section {
      top: 0;
      width: 90%;
    }
  }
}
</style>
