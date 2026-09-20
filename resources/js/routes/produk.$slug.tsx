import { RentalDetails } from "@/components/RentalDetails";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useState, type CSSProperties } from "react";

import { CatalogHeader } from "@/components/CatalogHeader";
import { StorageImage } from "@/components/StorageImage";
import {
  discountPercent,
  fetchCategories,
  fetchProductBySlug,
  fetchProductImages,
  fetchSettings,
  formatRupiah,
  whatsappLink,
} from "@/lib/catalog";

export const Route = createFileRoute("/produk/$slug")({
  head: () => ({
    meta: [
      { title: "Detail Produk | Sancea Kebaya & Makeup" },
      {
        name: "description",
        content:
          "Lihat detail koleksi kebaya Sancea: foto, harga, deskripsi, dan konsultasi langsung via WhatsApp.",
      },
      { property: "og:title", content: "Detail Produk | Sancea Kebaya & Makeup" },
      {
        property: "og:description",
        content: "Detail koleksi kebaya premium Sancea di Denpasar, Bali.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
  });
  const { data: gallery = [] } = useQuery({
    queryKey: ["product-images", product?.id],
    queryFn: () => fetchProductImages(product!.id),
    enabled: Boolean(product?.id),
  });
  const { data: categories = [] } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const { data: settings } = useQuery({ queryKey: ["settings"], queryFn: fetchSettings });

  const appearance = settings?.catalog_appearance;
  const theme = {
    "--detail-bg": appearance?.background ?? "#f3e4cc",
    "--detail-text": appearance?.text ?? "#302b25",
    "--detail-accent": appearance?.accent ?? "#865283",
  } as CSSProperties;
  if (!isLoading && !product) {
    return (
      <main style={theme} className="product-detail-page min-h-screen">
        <CatalogHeader businessName={settings?.business_name ?? "Sancea Kebaya"} />
        <div className="mx-auto max-w-2xl px-5 py-32 text-center">
          <h1 className="font-display text-4xl text-ink">Produk tidak ditemukan</h1>
          <Link
            to="/katalog"
            className="mt-6 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-gold-dark"
          >
            <ArrowLeft size={14} /> Kembali ke katalog
          </Link>
        </div>
      </main>
    );
  }

  const category = categories.find((item) => item.id === product?.category_id);
  const images = [product?.main_image, ...gallery.map((image) => image.image_url)].filter(
    Boolean,
  ) as string[];
  const mainImage = activeImage ?? images[0] ?? null;
  const percent = product ? discountPercent(Number(product.price), product.discount_price) : null;

  return (
    <main style={theme} className="product-detail-page min-h-screen">
      <CatalogHeader businessName={settings?.business_name ?? "Sancea Kebaya"} />

      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <Link
            to="/katalog"
            className="inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-muted-foreground transition hover:text-gold-dark"
          >
            <ArrowLeft size={14} /> Katalog
          </Link>

          {isLoading || !product ? (
            <div className="mt-8 grid gap-10 lg:grid-cols-2">
              <div className="aspect-[4/5] animate-pulse bg-cream" />
              <div className="h-40 animate-pulse bg-cream" />
            </div>
          ) : (
            <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
              <div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream">
                  <StorageImage
                    path={mainImage}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                  {percent && (
                    <span className="absolute left-0 top-5 bg-gold px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink">
                      Diskon {percent}%
                    </span>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {images.map((image) => (
                      <button
                        key={image}
                        type="button"
                        onClick={() => setActiveImage(image)}
                        className={`aspect-square overflow-hidden border transition ${
                          mainImage === image ? "border-gold" : "border-border hover:border-gold/60"
                        }`}
                      >
                        <StorageImage
                          path={image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <RentalDetails key={product.id} product={product} category={category?.name ?? "Koleksi"} settings={settings} onImage={setActiveImage} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
