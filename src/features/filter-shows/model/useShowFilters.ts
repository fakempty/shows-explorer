import { computed, ref, type Ref } from "vue";
import type { TvShow } from "@/entities/show";

export interface ShowFiltersState {
  query: string;
  genre: string;
  minRating: number;
}

export function useShowFilters(shows: Ref<TvShow[]>) {
  const query = ref("");
  const genre = ref("");
  const minRating = ref(0);

  const availableGenres = computed(() => {
    const set = new Set<string>();
    for (const show of shows.value) {
      for (const g of show.genres) {
        set.add(g);
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  });

  const filteredShows = computed(() => {
    const normalizedQuery = query.value.trim().toLowerCase();

    return shows.value.filter((show) => {
      const matchesQuery =
        !normalizedQuery ||
        show.name.toLowerCase().includes(normalizedQuery);

      const matchesGenre =
        !genre.value || show.genres.includes(genre.value);

      const rating = show.rating?.average ?? 0;
      const matchesRating = rating >= minRating.value;

      return matchesQuery && matchesGenre && matchesRating;
    });
  });

  const hasActiveFilters = computed(
    () =>
      query.value.trim().length > 0 ||
      genre.value.length > 0 ||
      minRating.value > 0,
  );

  function resetFilters() {
    query.value = "";
    genre.value = "";
    minRating.value = 0;
  }

  return {
    query,
    genre,
    minRating,
    availableGenres,
    filteredShows,
    hasActiveFilters,
    resetFilters,
  };
}
