import { validateProductImage } from "./image-validation";
import { supabase } from "@/integrations/supabase/client";

export const PRODUCT_BUCKET = "product-images";
export const KEBAYA_WHATSAPP = "6289505644663";

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  main_image: string | null;
  price: number;
  discount_price: number | null;
  description: string | null;
  status: boolean;
  minimum_rental_days: number | null;
  pinned: boolean;
  has_multiple_skus: boolean;
  rental_worth: number | null;
  deposit: number | null;
  created_at: string;
};

export type ProductImage = {
  id: string;
  product_id: string;
  image_url: string;
};

export function formatRupiah(value: number | null | undefined) {
  if (value === null || value === undefined) return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export function discountPercent(price: number, discount: number | null) {
  if (!discount || !price || discount >= price) return null;
  return Math.round(((price - discount) / price) * 100);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function getSignedUrl(path: string | null | undefined) {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("/")) return path;
  const { data } = await supabase.storage.from(PRODUCT_BUCKET).createSignedUrl(path, 60 * 60 * 24 * 7);
  return data?.signedUrl ?? null;
}

export async function uploadProductImage(file: File) {
  const ext = await validateProductImage(file);
  const path = `products/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(PRODUCT_BUCKET).upload(path, file, {
    contentType: file.type,
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return path;
}

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from("categories").select("id,name,slug").order("name");
  if (error) throw error;
  return (data ?? []) as Category[];
}

export async function fetchPublicProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("status", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function fetchAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function fetchProductBySlug(slug: string) {
  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data ?? null) as Product | null;
}

export async function fetchProductImages(productId: string): Promise<ProductImage[]> {
  const { data, error } = await supabase
    .from("product_images")
    .select("id,product_id,image_url")
    .eq("product_id", productId)
    .order("created_at");
  if (error) throw error;
  return (data ?? []) as ProductImage[];
}

export type Settings = { catalog_appearance?: import("@/components/AppearanceEditor").Appearance;
  id: string;
  business_name: string;
  whatsapp_number: string;
  catalog_slug: string;
  logo_url: string | null;
  store_address: string | null;
  maps_url: string | null;
  tagline: string | null;
  instagram: string | null;
  tiktok: string | null;
  show_rental_dates: boolean;
  minimum_rental_days: number;
  catalog_visible: boolean;
  social_link_style: string;
  store_name_font: string;
  default_product_order: string;
};

export async function fetchSettings(): Promise<Settings | null> {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return (data ?? null) as Settings | null;
}

export function whatsappLink(number: string | undefined | null, productName: string) {
  const digits = (number ?? "").replace(/\D/g, "");
  const text = `Halo Kak, saya tertarik dengan produk ${productName}. Boleh minta informasi lebih lanjut?`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
