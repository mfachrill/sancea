import { DriveCollection } from "@/components/AccessoriesCollection";
import fotoIjazah from "@/data/foto-ijazah.json";

export function FotoIjazahCollection({ language = "id" }: { language?: "id" | "en" }) {
    return (
        <DriveCollection catalogCategory="foto-ijazah"
            collectionNumber="04"
            title="Foto Ijazah"
            description={language === "id" ? "Inspirasi kebaya, makeup, dan styling untuk foto ijazah yang berkesan." : "Kebaya, makeup, and styling inspiration for memorable graduation portraits."}
            language={language}
            root={fotoIjazah}
            layoutClassName="lg:col-span-7"
            coverPhotoIds={[
                "1k4YzsGkHGZJ0Zhm-yXFFSNVZN6H0OHCI",
                "18G_6DgKH8StDwyMirYLcl3a4tpHrPZwh",
                "1hXh-UdWZFlPmfQBnSK_njl8mADJ0lpU1",
            ]}
            labels={{ "Foto Ijazah Exclusive 450k": "Foto Ijazah Exclusive" }}
        />
    );
}
