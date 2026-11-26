<script setup lang="ts">
const query = defineModel<string>("query", { required: true });
const genre = defineModel<string>("genre", { required: true });
const minRating = defineModel<number>("minRating", { required: true });

defineProps<{
  genres: string[];
  hasActiveFilters: boolean;
}>();

const emit = defineEmits<{
  reset: [];
}>();
</script>

<template>
  <div class="filters-bar">
    <input
      v-model="query"
      type="search"
      placeholder="Search show by title..."
      aria-label="Search show by title"
      class="filters-bar__input"
    >

    <select
      v-model="genre"
      aria-label="Filter by genre"
      class="filters-bar__select"
    >
      <option value="">
        All genres
      </option>
      <option
        v-for="item in genres"
        :key="item"
        :value="item"
      >
        {{ item }}
      </option>
    </select>

    <select
      v-model.number="minRating"
      aria-label="Minimum rating"
      class="filters-bar__select"
    >
      <option :value="0">
        Any rating
      </option>
      <option :value="6">
        6.0+
      </option>
      <option :value="7">
        7.0+
      </option>
      <option :value="8">
        8.0+
      </option>
    </select>

    <button
      v-if="hasActiveFilters"
      type="button"
      class="filters-bar__reset"
      @click="emit('reset')"
    >
      Reset
    </button>
  </div>
</template>

<style scoped lang="scss">
.filters-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;

  &__input,
  &__select {
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #2e3444;
    background: #181a20;
    color: #f4f6fb;
    font-size: 0.95rem;
  }

  &__input {
    flex: 1 1 220px;
  }

  &__reset {
    padding: 8px 14px;
    border-radius: 8px;
    border: 1px solid #3b82f6;
    background: transparent;
    color: #93c5fd;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background: rgba(59, 130, 246, 0.15);
    }
  }
}
</style>
