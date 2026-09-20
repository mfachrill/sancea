import { DriveCollection } from "@/components/AccessoriesCollection";
import catalogKebaya from "@/data/catalog-kebaya.json";

export function CatalogKebayaCollection({ language = "id" }: { language?: "id" | "en" }) {
    return (
        <DriveCollection
            collectionNumber="02"
            title={language === "id" ? "Katalog Kebaya" : "Kebaya Catalogue"}
            description={language === "id" ? "Temukan kebaya berdasarkan warna, ukuran, gaya hijab, dan pilihan koleksi Sancea." : "Find kebaya by colour, size, hijab style, and the Sancea collection."}
            language={language}
            root={catalogKebaya}
            layoutClassName="lg:col-span-5"
            coverPhotoIds={[
                "1HaogYFkyOjxVD0tySwv4jB_2h4DJ3IUA",
                "1vYbZreSRPUUgRK2EKLlYfmk9zgnEtmOP",
                "1pFCZWvnRtIQ9UgMH0Qt-yT24vAosU5Hj",
            ]}
            labels={{
                "A.Koleksi Big Size 2XL-5XL": "Koleksi Big Size 2XL–5XL",
                "A.Koleksi Xtra Small (XS)": "Koleksi Xtra Small (XS)",
                "B. Refrensi Kebaya Hijab": "Referensi Kebaya Hijab",
                "Hijau-Sage-Emerald-Turkis": "Hijau, Sage, Emerald & Turquoise",
                "Gold-Kuning-Orange": "Gold, Kuning & Orange",
                "Skin-Nude-Coklat": "Skin, Nude & Coklat",
                "Ungu-Burgundy-Lavender": "Ungu, Burgundy & Lavender",
                "Z.All Testimoni": "Testimoni",
            }}
        />
    );
}
