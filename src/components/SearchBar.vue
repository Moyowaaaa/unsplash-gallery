<template>
    <div class="search-bar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <input type="text" placeholder="Search for photo" v-model="searchValue" @keyup.enter="willSearch" @click="" />
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";

const searchValue = ref<string>("");
const router = useRouter();

const willSearch = () => {
    if (searchValue.value) {
        router.push({
            name: "search",
            query: {
                search_value: searchValue.value.trim(),
            },
        });
    }
};
</script>

<style scoped lang="scss">
.search-bar {
    width: 100%;
    background: #ffffff;
    padding-left: 3rem;
    height: 5rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-top: 5rem;

    svg {
        min-width: max-content;
    }

    input {
        width: 100%;
        height: 5rem;
        outline: none;
        border: none;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;

        &::placeholder {
            color: #3c4b65;
            font-weight: 500;
            font-size: 1.5rem;
            font-family: poppins;
        }
    }
}
</style>
