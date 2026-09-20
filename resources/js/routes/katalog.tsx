import { collectionFilters, isCollectionFilter, matchesCollection } from "@/lib/collection-filters";
import { useAdminPreview } from "@/hooks/useAdminPreview";
import { AdminReturnLink } from "@/components/AdminReturnLink";
import { getStoreFont, storeFontStylesheet } from "@/lib/store-fonts";
import { defaultAppearance } from "@/components/AppearanceEditor";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Search, Instagram, MapPin, MessageCircle } from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

import bannerPhoto from "@/assets/sancea-hero.jpg";
import { StorageImage } from "@/components/StorageImage";
import {
  KEBAYA_WHATSAPP,
  discountPercent,
  fetchCategories,
  fetchPublicProducts,
  fetchSettings,
  formatRupiah,
} from "@/lib/catalog";

export const Route = createFileRoute("/katalog")({
  head: () => ({
    meta: [
      { title: "Katalog Kebaya & Dress | Sancea Kebaya & Makeup" },
      {
        name: "description",
        content:
          "Jelajahi katalog digital Sancea Kebaya & Makeup: kebaya wisuda, lamaran, pernikahan, dan dress premium di Denpasar, Bali.",
      },
      { property: "og:title", content: "Katalog Kebaya & Dress | Sancea Kebaya & Makeup" },
      {
        property: "og:description",
        content: "Etalase digital koleksi kebaya dan dress premium Sancea di Bali.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KatalogPage,
});

function KatalogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategoryState] = useState<string>(() => new URLSearchParams(window.location.search).get("category") || "all");
  function setCategory(next: string) {
    setCategoryState(next);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", next);
    window.history.replaceState(window.history.state, "", url);
  }
  useEffect(() => {
    const sync = () => setCategoryState(new URLSearchParams(window.location.search).get("category") || "all");
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const canPreview = useAdminPreview();
  const preview = new URLSearchParams(canPreview ? window.location.search : "");
  const previewName = preview.get("store_name");
  const previewTagline = preview.get("tagline");
  const previewVisible = preview.get("visible");

  const { data: categories = [] } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const { data: settings } = useQuery({ queryKey: ["settings"], queryFn: fetchSettings });
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["public-products"],
    queryFn: fetchPublicProducts,
  });

  let appearance = { ...defaultAppearance, ...settings?.catalog_appearance };
  try { const draft = preview.get("appearance"); if (draft) appearance = { ...appearance, ...JSON.parse(draft) }; } catch { /* Keep saved appearance if preview is invalid. */ }
  const [slide, setSlide] = useState(0);
  const slides = Array.isArray(appearance.slides) && appearance.slides.length ? appearance.slides : [bannerPhoto];
  useEffect(() => {
    if (!appearance.autoplay || slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setSlide(current => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [appearance.autoplay, slides.length]);
  const theme = { "--catalog-background": appearance.background, "--catalog-text": appearance.text, "--catalog-accent": appearance.accent, backgroundColor: appearance.background, color: appearance.text } as CSSProperties;
  const value = (key: string, saved: string | null | undefined) => preview.get(key) ?? saved ?? "";
  const instagram = value("instagram", settings?.instagram).trim();
  const instagramHandle = instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/^@/, "").split(/[/?#]/)[0];
  const address = value("store_address", settings?.store_address);
  const maps = value("maps_url", settings?.maps_url);
  const phone = KEBAYA_WHATSAPP;
  const logo = value("logo_url", settings?.logo_url);
  const font = value("store_name_font", settings?.store_name_font) || "Playball";
  const iconOnly = value("social_link_style", settings?.social_link_style) === "icon";
  const socialClass = "inline-flex max-w-full items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs text-white shadow-sm backdrop-blur-md transition hover:bg-white/30";
  const categoryName = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.name])),
    [categories],
  );

  const filtered = products.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(search.trim().toLowerCase());
    const assigned = categories.find(item => item.id === product.category_id);
    const matchCategory = category === "all" || (isCollectionFilter(category)
      ? Boolean(assigned && matchesCollection(category, assigned))
      : Boolean(assigned && (assigned.id === category || assigned.slug === category)));
    return matchSearch && matchCategory;
  });

  return (
    <main style={theme} className="catalog-storefront min-h-screen">
      <AdminReturnLink />
      <link rel="stylesheet" href={storeFontStylesheet(font)} />

      {(previewVisible === "false" || (previewVisible === null && settings?.catalog_visible === false)) ? (
        <section className="grid min-h-[60vh] place-items-center px-5 text-center">
          <div><p className="font-display text-3xl text-ink">Katalog sedang tidak tersedia</p><p className="mt-3 text-sm text-muted-foreground">Preview status katalog disembunyikan.</p></div>
        </section>
      ) : <>

      <section className="relative isolate min-h-[360px] overflow-hidden px-5 pb-24 pt-16 text-center md:min-h-[420px] md:pt-20">
        <StorageImage path={slides[slide % slides.length]} alt="Koleksi kebaya Sancea" className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_22%]" />
        <div className="absolute inset-0 -z-10 bg-black/35" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-[var(--catalog-background)] to-transparent" />
        {logo && <StorageImage path={logo} alt={`Logo ${previewName ?? settings?.business_name ?? "toko"}`} className="mx-auto mb-4 h-24 max-w-56 object-contain drop-shadow-md" />}
        <h1 className="text-4xl leading-tight text-white drop-shadow-md md:text-5xl" style={{ fontFamily: getStoreFont(font).family }}>{previewName ?? settings?.business_name ?? "Sancea Kebaya"}</h1>
        <div className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          {instagramHandle && <a href={`https://www.instagram.com/${encodeURIComponent(instagramHandle)}/`} target="_blank" rel="noreferrer" aria-label={`Instagram @${instagramHandle}`} className={socialClass}><Instagram size={14} />{!iconOnly && <span>Instagram · @{instagramHandle}</span>}</a>}
          {address && <a href={/^https?:\/\//i.test(maps) ? maps : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noreferrer" aria-label={address} className={socialClass}><MapPin size={14} />{!iconOnly && <span className="max-w-64 truncate">{address}</span>}</a>}
          {phone && <a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer" aria-label="WhatsApp toko" className={socialClass}><MessageCircle size={14} />{!iconOnly && "WhatsApp"}</a>}
        </div>
        {(previewTagline ?? settings?.tagline) && <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/90">{previewTagline ?? settings?.tagline}</p>}
        {slides.length > 1 && <div className="mt-5 flex justify-center gap-2">{slides.map((_, index) => <button type="button" key={index} aria-label={`Banner ${index + 1}`} aria-pressed={slide % slides.length === index} onClick={() => setSlide(index)} className={`h-3 w-3 rounded-full border border-white ${slide % slides.length === index ? "bg-white" : "bg-white/30"}`} />)}</div>}
      </section>
      <section className="relative -mt-16 pb-16">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <div className="flex flex-col gap-5">
            <div className="relative w-full">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari produk..."
                className="h-12 w-full rounded-xl border border-white/60 bg-white/60 pl-11 pr-4 text-sm text-ink outline-none transition focus:border-gold"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
                Semua
              </FilterChip>
              {isCollectionFilter(category) && <FilterChip active onClick={() => setCategory(category)}>{collectionFilters[category].label}</FilterChip>}
              {categories.map((item) => (
                <FilterChip
                  key={item.id}
                  active={category === item.id}
                  onClick={() => setCategory(item.id)}
                >
                  {item.name}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {isLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="aspect-[4/5] animate-pulse bg-cream" />
              ))}

            {!isLoading &&
              filtered.map((product) => {
                const percent = discountPercent(Number(product.price), product.discount_price);
                return (
                  <article key={product.id} className="group">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-cream shadow-sm">
                      <StorageImage
                        path={product.main_image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                      {percent && (
                        <span className="absolute left-0 top-4 bg-gold px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink">
                          -{percent}%
                        </span>
                      )}
                    </div>
                    <div className="border-b border-border py-4">
                      <p className="text-[0.58rem] uppercase tracking-[0.18em] text-gold-dark">
                        {product.category_id ? categoryName[product.category_id] ?? "Koleksi" : "Koleksi"}
                      </p>
                      <h2 className="mt-2 font-display text-xl text-ink">{product.name}</h2>
                      <div className="mt-2 flex flex-wrap items-baseline gap-2">
                        {product.discount_price ? (
                          <>
                            <span className="text-sm font-semibold text-ink">
                              {formatRupiah(product.discount_price)}
                            </span>
                            <span className="text-xs text-muted-foreground line-through">
                              {formatRupiah(product.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-semibold text-ink">
                            {formatRupiah(product.price)}
                          </span>
                        )}
                      </div>
                      <Link
                        to="/produk/$slug"
                        params={{ slug: product.slug }}
                        className="mt-4 inline-flex items-center gap-2 text-[0.63rem] font-semibold uppercase tracking-[0.15em] text-ink transition hover:text-gold-dark"
                      >
                        Lihat Detail <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                );
              })}
          </div>

          {!isLoading && filtered.length === 0 && (
            <div className="border border-dashed border-border py-20 text-center">
              <p className="font-display text-2xl text-ink">Belum ada produk</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Silakan ubah kata kunci atau pilih kategori lain.
              </p>
            </div>
          )}
        </div>
      </section>
      </>}
    </main>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition ${
        active
          ? "border-gold bg-gold text-ink"
          : "border-border text-muted-foreground hover:border-gold hover:text-gold-dark"
      }`}
    >
      {children}
    </button>
  );
}
