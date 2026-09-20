import { DriveCollection } from "@/components/AccessoriesCollection";
import makeup from "@/data/makeup.json";

export function MakeupCollection({ language = "id" }: { language?: "id" | "en" }) {
    return (
        <DriveCollection catalogCategory="makeup"
            collectionNumber="05"
            title="Makeup"
            description={language === "id" ? "Lihat contoh hasil makeup Sancea untuk momen spesial Anda." : "See examples of Sancea makeup looks for your special occasion."}
            language={language}
            root={makeup}
            layoutClassName="lg:col-span-5"
            coverPhotoIds={[
                "1WQTUXrFakyqK3g3kOi9RpHOPU1C-cw7G",
                "1fY5qxz-dKtN7qt7dkxLs-eQHe1-rFv7a",
                "1cKdoiTxfp6hgL-3nP3Ba3LHI3DoB75xs",
            ]}
        />
    );
}
