import { TVMAZE_BASE_URL } from "@/shared/config/api";

export async function httpGet<T>(endpoint: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${TVMAZE_BASE_URL}${endpoint}`, { signal });
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
  }
  return (await response.json()) as T;
}
