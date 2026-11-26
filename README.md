# Shows Explorer

A Vue 3 + TypeScript web application for browsing and filtering TV shows powered by the TVmaze API, structured around Feature-Sliced Design (FSD).

## Tech Stack

- **Framework:** Vue 3 (`<script setup lang="ts">`), Vue Router
- **Language & Tooling:** TypeScript, Vite, SCSS
- **Code Quality:** ESLint, `vue-tsc`
- **Architecture:** Feature-Sliced Design (`app`, `pages`, `widgets`, `features`, `entities`, `shared`)

## Project Structure

- `src/app` — router, global styles, root component
- `src/pages` — route views (`catalog`, `show-details`, `watchlist`, `not-found`)
- `src/widgets` — composite UI blocks (`header-nav`, `shows-catalog`, `show-details`)
- `src/features` — user actions and filtering logic (`filter-shows`)
- `src/entities` — domain models, API access, and cards (`show`)
- `src/shared` — shared utilities and base helpers

## Getting Started

```bash
npm install
npm run dev