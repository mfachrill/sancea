export const storeFontGroups = [
  { label: "Tulisan tangan", fallback: "cursive", names: ["Playball", "Great Vibes", "Dancing Script", "Allura", "Parisienne", "Sacramento", "Satisfy", "Pacifico"] },
  { label: "Serif elegan", fallback: "serif", names: ["Cormorant Garamond", "Playfair Display", "Bodoni Moda", "Libre Baskerville", "Lora", "Cinzel"] },
  { label: "Modern", fallback: "sans-serif", names: ["Manrope", "Montserrat", "Poppins", "Raleway", "Nunito", "Quicksand"] },
];
export function getStoreFont(name: string) {
  for (const group of storeFontGroups) if (group.names.includes(name)) return { name, family: `"${name}", ${group.fallback}` };
  return { name: "Playball", family: '"Playball", cursive' };
}
export function storeFontStylesheet(name: string) {
  return `https://fonts.googleapis.com/css2?family=${encodeURIComponent(getStoreFont(name).name).replace(/%20/g, "+")}&display=swap`;
}