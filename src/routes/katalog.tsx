import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { CatalogHeader } from "@/components/CatalogHeader";
import { StorageImage } from "@/components/StorageImage";
import {
  discountPercent,
  fetchCategories,
  fetchPublicProducts,
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
  const [category, setCategory] = useState<string>("all");

  const { data: categories = [] } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["public-products"],
    queryFn: fetchPublicProducts,
  });

  const categoryName = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.name])),
    [categories],
  );

  const filtered = products.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(search.trim().toLowerCase());
    const matchCategory = category === "all" || product.category_id === category;
    return matchSearch && matchCategory;
  });

  return (
    <main className="min-h-screen bg-background">
      <CatalogHeader />

      <section className="border-b border-border bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <p className="eyebrow">
            <span />
            Katalog Digital
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.08] text-ink md:text-6xl">
            Koleksi kebaya untuk <em className="font-normal text-gold-dark">momen istimewa</em> Anda
          </h1>
          <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
            Telusuri koleksi Sancea, pilih yang paling Anda sukai, lalu konsultasikan langsung melalui
            WhatsApp.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <div className="flex flex-col gap-5">
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari produk..."
                className="h-12 w-full border border-border bg-background pl-11 pr-4 text-sm text-ink outline-none transition focus:border-gold"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
                Semua
              </FilterChip>
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

          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {isLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="aspect-[4/5] animate-pulse bg-cream" />
              ))}

            {!isLoading &&
              filtered.map((product) => {
                const percent = discountPercent(Number(product.price), product.discount_price);
                return (
                  <article key={product.id} className="group">
                    <div className="relative aspect-[4/5] overflow-hidden bg-cream">
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
      className={`border px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition ${
        active
          ? "border-gold bg-gold text-ink"
          : "border-border text-muted-foreground hover:border-gold hover:text-gold-dark"
      }`}
    >
      {children}
    </button>
  );
}
