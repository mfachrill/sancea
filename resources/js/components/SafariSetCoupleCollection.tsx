import { DriveCollection } from "@/components/AccessoriesCollection";
import safariSetCouple from "@/data/safari-set-couple.json";

export function SafariSetCoupleCollection({ language = "id" }: { language?: "id" | "en" }) {
    return (
        <DriveCollection catalogCategory="safari-couple"
            collectionNumber="04"
            title="Safari & Set Couple"
            description={language === "id" ? "Pilihan safari dan set couple untuk tampil serasi pada momen istimewa." : "Safari and matching couple sets for a coordinated look on special occasions."}
            language={language}
            root={safariSetCouple}
            layoutClassName="sm:col-span-2 lg:col-span-12 lg:max-h-[25rem]"
        />
    );
}
