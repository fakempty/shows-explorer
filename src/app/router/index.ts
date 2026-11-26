import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "catalog",
      component: () => import("@/pages/catalog").then((m) => m.CatalogPage)
    },
    {
      path: "/shows/:id",
      name: "show-details",
      component: () => import("@/pages/show-details").then((m) => m.ShowDetailsPage)
    },
    {
      path: "/watchlist",
      name: "watchlist",
      component: () => import("@/pages/watchlist").then((m) => m.WatchlistPage)
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/pages/not-found").then((m) => m.NotFoundPage)
    }
  ]
});
