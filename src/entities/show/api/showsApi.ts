import type { TvShow, TvShowSearchItem } from "../model/types";

const BASE_URL = "https://api.tvmaze.com";

export async function fetchShows(signal?: AbortSignal): Promise<TvShow[]> {
  const response = await fetch(`${BASE_URL}/shows`, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch shows: ${response.status}`);
  }
  return response.json() as Promise<TvShow[]>;
}

export async function searchShows(
  query: string,
  signal?: AbortSignal,
): Promise<TvShow[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    return fetchShows(signal);
  }
  const response = await fetch(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(trimmed)}`,
    { signal },
  );
  if (!response.ok) {
    throw new Error(`Failed to search shows: ${response.status}`);
  }
  const data = (await response.json()) as TvShowSearchItem[];
  return data.map((item) => item.show);
}
