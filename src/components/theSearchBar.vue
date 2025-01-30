<template>
    <div class="search-bar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <input type="text" placeholder="Search for photo" />
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.search-bar {
    width: 100%;
    background: #ffffff;
    padding-left: 3rem;
    height: 5rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 2rem;

    svg {
        min-width: max-content;
    }

    input {
        width: 100%;
        height: 5rem;
        outline: none;
        border: none;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;

        &::placeholder {
            color: red;
            font-weight: 500;
        }
    }
}
</style>
