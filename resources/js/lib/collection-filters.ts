export const collectionFilters = {
  "kamen-rok": { label: "Kamen / Rok", words: ["kamen", "rok", "kain", "sarong", "skirt"] },
  kebaya: { label: "Kebaya", words: ["kebaya"] },
  "safari-couple": { label: "Safari & Set Couple", words: ["safari", "couple"] },
  "foto-ijazah": { label: "Foto Ijazah", words: ["ijazah"] },
  makeup: { label: "Makeup", words: ["makeup", "make-up", "make up", "rias"] },
  lainnya: { label: "Koleksi Lainnya", words: ["aksesoris", "aksesori", "accessories", "sepatu", "shoes", "dress", "lainnya", "other"] },
} as const;
export type CollectionFilter = keyof typeof collectionFilters;
export function isCollectionFilter(value: string): value is CollectionFilter {
  return Object.prototype.hasOwnProperty.call(collectionFilters, value);
}
export function matchesCollection(filter: CollectionFilter, category: { name: string; slug: string }) {
  const normalize = (value: string) => " " + value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() + " ";
  const text = normalize(category.name + " " + category.slug);
  return collectionFilters[filter].words.some(word => text.includes(normalize(word)));
}