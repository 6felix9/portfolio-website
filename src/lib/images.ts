import type { ImageMetadata } from "astro";

/**
 * Every image under src/assets, keyed by its path.
 * The JSON files in src/data refer to images by their path relative to
 * src/assets (e.g. "projects/vibeplan-photo-1.png"), and `asset()` turns that
 * string into something Astro can optimise at build time.
 */
const files = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/**/*.{png,jpg,jpeg,webp,avif,gif,svg,PNG,JPG,JPEG,WEBP}",
  { eager: true },
);

export function asset(path: string): ImageMetadata {
  const key = `/src/assets/${path.replace(/^\/+/, "")}`;
  const mod = files[key];
  if (!mod) {
    throw new Error(
      `Image "${path}" was not found in src/assets. Check the path in your src/data/*.json files (paths are case-sensitive).`,
    );
  }
  return mod.default;
}
