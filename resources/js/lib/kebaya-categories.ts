import type { Category } from "@/lib/catalog";

const otherKebayaSlugs = new Set(["kebaya-wisuda", "kebaya-lamaran", "kebaya-pernikahan"]);

export function isKebayaColor(category: Category) {
  return category.slug.startsWith("kebaya-") && !otherKebayaSlugs.has(category.slug);
}
