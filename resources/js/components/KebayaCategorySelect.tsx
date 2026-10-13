import type { Category } from "@/lib/catalog";

const colorSlugs = new Set([
  "kebaya-marun", "kebaya-hitam", "kebaya-biru", "kebaya-hijau",
  "kebaya-pink", "kebaya-ungu", "kebaya-gold", "kebaya-silver",
  "kebaya-putih", "kebaya-coklat",
]);

export function isKebayaColor(category: Category) {
  return colorSlugs.has(category.slug);
}

export function KebayaCategorySelect({ categories, value, onChange, className }: {
  categories: Category[];
  value: string;
  onChange: (id: string) => void;
  className: string;
}) {
  const colors = categories.filter(isKebayaColor);
  const selected = categories.find(category => category.id === value);
  const kebaya = categories.find(category => category.slug === "kebaya");
  const group = selected && isKebayaColor(selected) ? "kebaya" : selected?.id ?? "";

  return <div className="space-y-3">
    <select className={className} value={group} onChange={event => onChange(event.target.value === "kebaya" ? kebaya?.id ?? "" : event.target.value)}>
      <option value="">Pilih kategori</option>
      {categories.filter(category => !isKebayaColor(category)).map(category =>
        <option key={category.id} value={category.slug === "kebaya" ? "kebaya" : category.id}>{category.name}</option>
      )}
    </select>
    {group === "kebaya" && <select aria-label="Warna kebaya" className={className} value={selected && isKebayaColor(selected) ? value : ""} onChange={event => onChange(event.target.value || kebaya?.id || "")}>
      <option value="">Pilih warna kebaya</option>
      {colors.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
    </select>}
  </div>;
}
