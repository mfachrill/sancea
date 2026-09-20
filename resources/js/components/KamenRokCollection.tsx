import { DriveCollection } from "@/components/AccessoriesCollection";
import kamenRok from "@/data/kamen-rok.json";

export function KamenRokCollection({ language = "id" }: { language?: "id" | "en" }) {
    return (
        <DriveCollection
            collectionNumber="01"
            title={language === "id" ? "Katalog Kamen/Rok" : "Kamen/Skirt Catalogue"}
            description={language === "id" ? "Jelajahi kamen dan rok Bali untuk menyempurnakan kebaya pilihan Anda." : "Explore Balinese kamen and skirts to complete your chosen kebaya."}
            language={language}
            root={kamenRok}
            layoutClassName="lg:col-span-7"
        />
    );
}
