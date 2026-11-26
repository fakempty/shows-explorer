<script setup lang="ts">
import { computed } from "vue";
import type { TvShow } from "../model/types";

const props = defineProps<{
  show: TvShow;
}>();

const posterUrl = computed(
  () => props.show.image?.medium || props.show.image?.original || "",
);

const ratingText = computed(() =>
  props.show.rating?.average != null
    ? props.show.rating.average.toFixed(1)
    : "N/A",
);
</script>

<template>
  <article class="show-card">
    <div class="show-card__poster-wrap">
      <img
        v-if="posterUrl"
        :src="posterUrl"
        :alt="show.name"
        class="show-card__poster"
        loading="lazy"
      >
      <div
        v-else
        class="show-card__placeholder"
      >
        No Poster
      </div>
      <span class="show-card__rating">{{ ratingText }}</span>
    </div>

    <div class="show-card__body">
      <h3 class="show-card__title">
        {{ show.name }}
      </h3>
      <div
        v-if="show.genres.length"
        class="show-card__genres"
      >
        <span
          v-for="genre in show.genres.slice(0, 3)"
          :key="genre"
          class="show-card__genre"
        >
          {{ genre }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.show-card {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  background: #181a20;
  color: #f4f6fb;
  transition: transform 0.15s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &__poster-wrap {
    position: relative;
    aspect-ratio: 2 / 3;
    background: #232732;
  }

  &__poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    color: #9aa2b2;
  }

  &__rating {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 2px 8px;
    border-radius: 999px;
    background: rgba(15, 17, 22, 0.85);
    font-size: 0.8rem;
    font-weight: 600;
  }

  &__body {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__title {
    margin: 0;
    font-size: 1rem;
    line-height: 1.3;
  }

  &__genres {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  &__genre {
    font-size: 0.75rem;
    padding: 2px 8px;
    border-radius: 6px;
    background: #262b38;
    color: #cbd2e1;
  }
}
