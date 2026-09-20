import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronRight, ImageIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import accessories from "@/data/accessories.json";
type CollectionPhoto = { id: string; name: string; src: string };
type CollectionFolder = {
    id: string;
    name: string;
    folders: CollectionFolder[];
    images: CollectionPhoto[];
};

function firstPhoto(folder: CollectionFolder): CollectionPhoto | undefined {
    return folder.images[0] ?? folder.folders.map(firstPhoto).find(Boolean);
}
function photoCount(folder: CollectionFolder): number {
    return (
        folder.images.length + folder.folders.reduce((count, child) => count + photoCount(child), 0)
    );
}

export type DriveCollectionProps = {
    collectionNumber: string;
    title: string;
    description: string;
    root: CollectionFolder;
    labels?: Record<string, string>;
    layoutClassName?: string;
    coverPhotoIds?: string[];
    language?: "id" | "en";
};

export function DriveCollection({
    collectionNumber,
    title,
    description,
    root,
    labels = {},
    layoutClassName = "sm:col-span-2 lg:col-span-12 lg:max-h-[25rem]",
    coverPhotoIds,
    language = "id",
}: DriveCollectionProps) {
    const [trail, setTrail] = useState<CollectionFolder[]>([root]);
    const [selected, setSelected] = useState<CollectionPhoto | null>(null);
    const viewport = useRef<HTMLDivElement>(null);
    const heading = useRef<HTMLHeadingElement>(null);
    const folder = trail[trail.length - 1] ?? root;
    const folderName = (entry: CollectionFolder) => labels[entry.name] ?? entry.name;
    const defaultCoverPhotos = [root.folders[0], root.folders[1], root.folders[2]]
        .filter((entry): entry is CollectionFolder => Boolean(entry))
        .map(firstPhoto)
        .filter((photo): photo is CollectionPhoto => Boolean(photo));
    const allPhotos: CollectionPhoto[] = [];
    const collectPhotos = (entry: CollectionFolder) => {
        allPhotos.push(...entry.images);
        entry.folders.forEach(collectPhotos);
    };
    collectPhotos(root);
    const coverPhotos =
        coverPhotoIds
            ?.map((id) => allPhotos.find((photo) => photo.id === id))
            .filter((photo): photo is CollectionPhoto => Boolean(photo)) ?? defaultCoverPhotos;

    function navigate(next: CollectionFolder[], photo: CollectionPhoto | null = null) {
        setTrail(next);
        setSelected(photo);
        viewport.current?.scrollTo({ top: 0 });
        heading.current?.focus();
    }

    return (
        <Dialog
            onOpenChange={(open) => {
                if (open) {
                    setTrail([root]);
                    setSelected(null);
                }
            }}
        >
            <article className={"group relative overflow-hidden bg-cream " + layoutClassName}>
                <div className="grid h-full grid-cols-3 gap-px">
                    {coverPhotos.map((photo) => (
                        <img
                            key={photo.id}
                            src={photo.src}
                            alt={photo.name}
                            width={1200}
                            height={1200}
                            loading="lazy"
                            className="h-full min-h-0 w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                        />
                    ))}
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-ivory md:p-8">
                    <p className="text-[0.6rem] uppercase tracking-[0.2em] text-gold">
                        {language === "id" ? "Koleksi" : "Collection"} {collectionNumber}
                    </p>
                    <h3 className="mt-2 font-display text-3xl">{title}</h3>
                    <div className="mt-3 flex items-end justify-between gap-4">
                        <p className="max-w-md text-sm text-ivory/80">{description}</p>
                        <span className="flex shrink-0 items-center gap-2 text-[0.62rem] uppercase tracking-[0.15em]">
                            {language === "id" ? "Lihat katalog" : "View catalog"} <ArrowRight size={14} />
                        </span>
                    </div>
                </div>
                <a
                    href="/katalog"
                    aria-label={(language === "id" ? "Buka katalog digital: " : "Open digital catalog: ") + title}
                    className="absolute inset-0 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-gold"
                />
            </article>

            <DialogContent className="flex h-[90dvh] max-h-[900px] w-[calc(100%_-_1rem)] max-w-6xl flex-col gap-0 overflow-hidden rounded-none border-gold/20 p-0">
                <div className="shrink-0 border-b border-border px-5 pb-5 pt-7 md:px-8">
                    <p className="text-[0.6rem] uppercase tracking-[0.24em] text-gold-dark">
                        The Collection
                    </p>
                    <DialogTitle
                        ref={heading}
                        tabIndex={-1}
                        className="mt-2 pr-7 font-display text-3xl font-normal outline-none md:text-4xl"
                    >
                        {title}
                    </DialogTitle>
                    <DialogDescription className="mt-2">{description}</DialogDescription>
                    <nav aria-label={"Navigasi " + title} className="mt-4">
                        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                            {trail.map((entry, index) => (
                                <li key={entry.id} className="flex items-center gap-2">
                                    {index > 0 && <ChevronRight size={12} aria-hidden="true" />}
                                    <button
                                        type="button"
                                        onClick={() => navigate(trail.slice(0, index + 1))}
                                        aria-current={
                                            index === trail.length - 1 && !selected
                                                ? "page"
                                                : undefined
                                        }
                                        className="py-1 text-gold-dark underline-offset-4 hover:underline focus-visible:outline-gold"
                                    >
                                        {index === 0 ? "Semua koleksi" : folderName(entry)}
                                    </button>
                                </li>
                            ))}
                            {selected && (
                                <li className="flex items-center gap-2 text-muted-foreground">
                                    <ChevronRight size={12} />
                                    Foto
                                </li>
                            )}
                        </ol>
                    </nav>
                </div>

                <div
                    ref={viewport}
                    className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 md:px-8"
                >
                    {selected ? (
                        <div>
                            <button
                                type="button"
                                onClick={() => navigate(trail)}
                                className="mb-5 inline-flex items-center gap-2 text-sm text-gold-dark"
                            >
                                <ArrowLeft size={16} /> Kembali ke {folderName(folder)}
                            </button>
                            <figure className="mx-auto max-w-4xl">
                                <img
                                    src={selected.src}
                                    alt={selected.name}
                                    className="max-h-[58dvh] w-full object-contain"
                                />
                                <figcaption className="mt-4 text-center font-display text-xl">
                                    {selected.name}
                                </figcaption>
                            </figure>
                        </div>
                    ) : (
                        <>
                            <div className="mb-5 flex items-baseline justify-between gap-4">
                                <h2 className="font-display text-2xl">{folderName(folder)}</h2>
                                <p className="shrink-0 text-xs text-muted-foreground">
                                    {photoCount(folder)} foto
                                </p>
                            </div>
                            {folder.folders.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                    {folder.folders.map((child) => {
                                        const photo = firstPhoto(child);
                                        return (
                                            <button
                                                key={child.id}
                                                type="button"
                                                onClick={() => navigate([...trail, child])}
                                                className="group/folder overflow-hidden border border-border bg-cream text-left transition hover:border-gold focus-visible:outline-gold"
                                            >
                                                <div className="aspect-[4/3] overflow-hidden">
                                                    {photo ? (
                                                        <img
                                                            src={photo.src}
                                                            alt={folderName(child)}
                                                            width={1200}
                                                            height={900}
                                                            loading="lazy"
                                                            className="h-full w-full object-cover transition duration-500 group-hover/folder:scale-105"
                                                        />
                                                    ) : (
                                                        <ImageIcon className="m-auto h-full text-gold-dark" />
                                                    )}
                                                </div>
                                                <div className="p-3 md:p-4">
                                                    <h3 className="font-display text-xl leading-tight">
                                                        {folderName(child)}
                                                    </h3>
                                                    <p className="mt-2 text-xs text-muted-foreground">
                                                        {child.folders.length > 0
                                                            ? child.folders.length + " kelompok · "
                                                            : ""}
                                                        {photoCount(child)} foto
                                                    </p>
                                                    <span className="mt-3 inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-gold-dark">
                                                        Lihat koleksi <ArrowRight size={13} />
                                                    </span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                            {folder.images.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
                                    {folder.images.map((photo) => (
                                        <button
                                            key={photo.id}
                                            type="button"
                                            onClick={() => navigate(trail, photo)}
                                            aria-label={"Perbesar foto " + photo.name}
                                            className="overflow-hidden border border-border bg-cream text-left transition hover:border-gold focus-visible:outline-gold"
                                        >
                                            <div className="aspect-square">
                                                <img
                                                    src={photo.src}
                                                    alt={photo.name}
                                                    width={1200}
                                                    height={1200}
                                                    loading="lazy"
                                                    className="h-full w-full object-contain"
                                                />
                                            </div>
                                            <p className="border-t border-border px-3 py-3 text-sm leading-relaxed">
                                                {photo.name}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export function AccessoriesCollection({ language = "id" }: { language?: "id" | "en" }) {
    return (
        <DriveCollection
            collectionNumber="07"
            title={language === "id" ? "Koleksi Lainnya" : "Other Collections"}
            description={language === "id" ? "Bros, aksesori rambut, tas, obi, dan sentuhan akhir untuk penampilan Anda." : "Brooches, hair accessories, bags, obi, and finishing touches for your look."}
            language={language}
            root={accessories}
            labels={{
                "ALPAKA / Set Bros": "Alpaka & Set Bros",
                "BUSTIER/Longtorso & Angkin": "Bustier, Longtorso & Angkin",
                "Clutch/Tas Tangan": "Clutch & Tas Tangan",
                "HAIR PIECE/Aksesoris Rambut": "Aksesori Rambut",
                OBI: "Obi & Selendang",
                "SELOP & Wedgest": "Selop & Wedges",
            }}
        />
    );
}
