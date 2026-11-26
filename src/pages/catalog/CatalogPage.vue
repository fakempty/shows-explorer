<script setup lang="ts">
import { ShowsCatalog } from "@/widgets/shows-catalog";
</script>

<template>
  <main class="catalog-page">
    <h1 class="catalog-page__title">
      TV Shows Catalog
    </h1>
    <ShowsCatalog />
  </main>
</template>

<style scoped lang="scss">
.catalog-page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 16px;

  &__title {
    margin: 0 0 20px;
    font-size: 1.75rem;
  }
}
</style>
