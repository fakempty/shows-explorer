<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { fetchShows, ShowCard, type TvShow } from "@/entities/show";
import { ShowFiltersBar, useShowFilters } from "@/features/filter-shows";

const shows = ref<TvShow[]>([]);
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
let isActive = true;

const {
  query,
  genre,
  minRating,
  availableGenres,
  filteredShows,
  hasActiveFilters,
  resetFilters,
} = useShowFilters(shows);

async function loadShows() {
  isLoading.value = true;
  errorMessage.value = null;

  try {
    const data = await fetchShows();
    if (!isActive) {
      return;
    }
    shows.value = data;
  } catch (err) {
    if (!isActive) {
      return;
    }
    errorMessage.value =
      err instanceof Error ? err.message : "Failed to load shows catalog";
  } finally {
    if (isActive) {
      isLoading.value = false;
    }
  }
}

onMounted(() => {
  void loadShows();
});

onBeforeUnmount(() => {
  isActive = false;
});
</script>

<template>
  <section class="shows-catalog">
    <div
      v-if="isLoading"
      class="shows-catalog__grid"
      aria-busy="true"
    >
      <div
        v-for="n in 8"
        :key="n"
        class="shows-catalog__skeleton"
      />
    </div>

    <div
      v-else-if="errorMessage"
      class="shows-catalog__state"
      role="alert"
    >
      <p class="shows-catalog__message">
        {{ errorMessage }}
      </p>
      <button
        type="button"
        class="shows-catalog__retry"
        @click="loadShows"
      >
        Try again
      </button>
    </div>

    <div
      v-else-if="shows.length === 0"
      class="shows-catalog__state"
    >
      <p class="shows-catalog__message">
        No shows found.
      </p>
    </div>

    <template v-else>
      <ShowFiltersBar
        v-model:query="query"
        v-model:genre="genre"
        v-model:min-rating="minRating"
        :genres="availableGenres"
        :has-active-filters="hasActiveFilters"
        @reset="resetFilters"
      />

      <p class="shows-catalog__count">
        Showing {{ filteredShows.length }} of {{ shows.length }} shows
      </p>

      <div
        v-if="filteredShows.length === 0"
        class="shows-catalog__state"
      >
        <p class="shows-catalog__message">
          No shows match the selected filters.
        </p>
        <button
          type="button"
          class="shows-catalog__retry"
          @click="resetFilters"
        >
          Reset filters
        </button>
      </div>

      <div
        v-else
        class="shows-catalog__grid"
      >
        <RouterLink
          v-for="show in filteredShows"
          :key="show.id"
          :to="`/shows/${show.id}`"
          class="shows-catalog__link"
        >
          <ShowCard :show="show" />
        </RouterLink>
      </div>
    </template>
  </section>
</template>

<style scoped lang="scss">
.shows-catalog {
  &__count {
    margin: 0 0 16px;
    font-size: 0.9rem;
    color: #9aa2b2;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
  }

  &__link {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  &__skeleton {
    aspect-ratio: 2 / 3;
    border-radius: 10px;
    background: #232732;
    animation: pulse 1.2s infinite ease-in-out;
  }

  &__state {
    padding: 32px 16px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  &__message {
    margin: 0;
    color: #cbd2e1;
  }

  &__retry {
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    background: #3b82f6;
    color: #fff;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background: #2563eb;
    }
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 0.95;
  }
}
</style>
