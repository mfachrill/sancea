import { useEntranceMotion } from "@/components/useEntranceMotion";
import { createFileRoute } from "@tanstack/react-router";
import {
    ArrowDown,
    ArrowRight,
    Instagram,
    MapPin,
    Menu,
    MessageCircle,
    Ruler,
    Scissors,
    Sparkles,
    X,
} from "lucide-react";
import { useState } from "react";
import { AccessoriesCollection } from "@/components/AccessoriesCollection";
import { CatalogKebayaCollection } from "@/components/CatalogKebayaCollection";
import { FotoIjazahCollection } from "@/components/FotoIjazahCollection";
import { KamenRokCollection } from "@/components/KamenRokCollection";
import { MakeupCollection } from "@/components/MakeupCollection";
import { SafariSetCoupleCollection } from "@/components/SafariSetCoupleCollection";

import heroImage from "../assets/sancea-hero.jpg";
import collectionsImage from "../assets/sancea-collections.jpg";
import servicesImage from "../assets/sancea-services.jpg";
import editorialImage from "../assets/sancea-editorial.jpg";

type Language = "id" | "en";

const featuredEditorialImage =
    "/images/collections/catalog-kebaya/1B9kb_pg-U9RFXiKOlcazsvOgelUyR5nB.webp";
const featuredEditorialSideImages = [
    {
        src: "/images/collections/catalog-kebaya/1TQYoTR-H_Iq93dawjKcJkku-cNfwvcKu.webp",
        alt: "Kebaya orange dalam editorial Sancea",
    },
    {
        src: "/images/collections/catalog-kebaya/1cpCYEv-KKL6AKzYFGhnEOgSqkAkd1v0d.webp",
        alt: "Koleksi kebaya emerald Sancea",
    },
];

export const Route = createFileRoute("/")({
    head: () => ({
        meta: [
            { title: "Sancea Kebaya & Makeup | Bali" },
            {
                name: "description",
                content:
                    "Explore premium kebaya rental, makeup, bridal, wedding, and graduation styling by Sancea in Denpasar, Bali.",
            },
            { property: "og:title", content: "Sancea Kebaya & Makeup | Bali" },
            {
                property: "og:description",
                content:
                    "A premium digital showroom for kebaya, makeup, and bridal styling in Bali.",
            },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary_large_image" },
        ],
    }),
    component: Index,
});

const collections = [
    {
        name: "Catalog Kamen/Rok",
        note: "Kamen dan rok Bali untuk melengkapi kebaya pilihan Anda",
        pos: "left-top",
    },
    {
        name: "Catalog Kebaya",
        note: "Jelajahi kebaya berdasarkan warna, ukuran, dan gaya pilihan Anda",
        pos: "right-top",
    },
    {
        name: "Safari & Set Couple",
        note: "Pilihan serasi untuk momen bersama yang istimewa",
        pos: "right-bottom",
    },
    {
        name: "Foto Ijazah",
        note: "Inspirasi styling kebaya dan makeup untuk momen wisuda Anda",
        pos: "right-top",
    },
    {
        name: "Makeup",
        note: "Contoh hasil makeup untuk tampilan yang berkesan",
        pos: "left-top",
    },
    { name: "Other Collections", note: "Discover more signature Sancea looks", pos: "left-bottom" },
];

const services = [
    {
        title: "Kebaya Rental",
        text: {
            id: "Pilih kebaya untuk wisuda, acara adat, pesta, dan momen spesial Anda.",
            en: "Choose a kebaya for graduation, traditional ceremonies, parties, and special moments.",
        },
        image: "/images/collections/catalog-kebaya/1B9kb_pg-U9RFXiKOlcazsvOgelUyR5nB.webp",
        whatsapp: "089505644663",
        message: {
            id: "Halo Kak, saya ingin konsultasi layanan Kebaya Rental Sancea. Bisa dibantu informasi koleksi, ukuran, dan harga sewanya?",
            en: "Hello, I would like to consult about Sancea Kebaya Rental. Could you please share the collection, sizing, and rental price information?",
        },
    },
    {
        title: "Makeup",
        text: {
            id: "Makeup halus dan tahan lama yang disesuaikan dengan karakter Anda.",
            en: "Refined, long-lasting makeup tailored to your personal style.",
        },
        image: "/images/collections/makeup/1WQTUXrFakyqK3g3kOi9RpHOPU1C-cw7G.webp",
        whatsapp: "089685644663",
        message: {
            id: "Halo Kak, saya ingin konsultasi layanan Makeup Sancea. Bisa dibantu informasi paket, jadwal, dan harganya?",
            en: "Hello, I would like to consult about Sancea Makeup. Could you please share the packages, availability, and prices?",
        },
    },
    {
        title: "Bridal Shoes",
        text: {
            id: "Sepatu bridal pilihan untuk melengkapi tampilan kebaya dan acara spesial.",
            en: "Selected bridal shoes to complete your kebaya look and special occasion.",
        },
        image: "/images/collections/accessories/1NhNxgpEGx2CMg5k7U7zBdp2VdGW37AF8.webp",
        whatsapp: "08978084741",
        message: {
            id: "Halo Kak, saya ingin konsultasi koleksi Bridal Shoes Sancea. Bisa dibantu informasi ukuran, warna, ketersediaan, dan harga sewanya?",
            en: "Hello, I would like to consult about Sancea Bridal Shoes. Could you please share the sizes, colours, availability, and rental prices?",
        },
    },
];

function whatsappLink(number: string, message: string) {
    const internationalNumber = number.replace(/\D/g, "").replace(/^0/, "62");

    return `https://wa.me/${internationalNumber}?text=${encodeURIComponent(message)}`;
}

const CONSULTATION_WHATSAPP_URL = whatsappLink(
    "089685644663",
    "Halo Kak, saya ingin konsultasi layanan Sancea.",
);

function Wordmark({ inverse = false }: { inverse?: boolean }) {
    return (
        <div className={inverse ? "text-ivory" : "text-ink"}>
            <div className="font-display text-[1.65rem] leading-none tracking-[0.22em]">SANCEA</div>
            <div className="mt-1 text-center text-[0.58rem] uppercase tracking-[0.34em] text-gold">
                Kebaya & Makeup
            </div>
        </div>
    );
}

function SectionHeading({
    eyebrow,
    title,
    copy,
    light = false,
}: {
    eyebrow: string;
    title: string;
    copy?: string;
    light?: boolean;
}) {
    return (
        <div className="max-w-2xl">
            <p className="eyebrow">
                <span />
                {eyebrow}
            </p>
            <h2
                className={`mt-5 font-display text-4xl leading-[1.08] md:text-6xl ${light ? "text-ivory" : "text-ink"}`}
            >
                {title}
            </h2>
            {copy && (
                <p
                    className={`mt-5 max-w-xl leading-7 ${light ? "text-ivory/65" : "text-muted-foreground"}`}
                >
                    {copy}
                </p>
            )}
        </div>
    );
}

function CatalogImage({ pos, alt }: { pos: string; alt: string }) {
    return (
        <img
            src={collectionsImage}
            alt={alt}
            width={1600}
            height={1600}
            loading="lazy"
            className={`h-full w-full object-cover transition duration-700 group-hover:scale-[1.03] object-${pos}`}
        />
    );
}

function Index() {
    const entranceRef = useEntranceMotion();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [language, setLanguage] = useState<Language>("id");
    const isIndonesian = language === "id";
    const navItems = [
        [isIndonesian ? "Koleksi" : "Collections", "#collections"],
        [isIndonesian ? "Layanan" : "Services", "#services"],
        [isIndonesian ? "Paket" : "Packages", "#packages"],
        [isIndonesian ? "Portofolio" : "Portfolio", "#portfolio"],
        [isIndonesian ? "Lokasi" : "Location", "#location"],
    ];

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <main ref={entranceRef} className="overflow-hidden bg-background">
            <header className="absolute inset-x-0 top-0 z-20 border-b border-ivory/20">
                <div className="mx-auto grid h-24 max-w-[90rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:px-10 lg:flex lg:justify-between">
                    <a href="#top" aria-label="Sancea home">
                        <Wordmark inverse />
                    </a>
                    <nav className="hidden items-center gap-8 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ivory/75 lg:flex">
                        {navItems.map(([label, href]) => (
                            <a key={href} className="transition hover:text-gold" href={href}>
                                {label}
                            </a>
                        ))}
                    </nav>
                    <div className="hidden items-center border border-ivory/35 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ivory lg:flex">
                        {(["id", "en"] as Language[]).map((option) => (
                            <button key={option} type="button" onClick={() => setLanguage(option)} className={`px-3 py-3 transition ${language === option ? "bg-gold text-ink" : "hover:text-gold"}`} aria-pressed={language === option}>
                                {option === "id" ? "ID" : "EN"}
                            </button>
                        ))}
                    </div>
                    <a
                        href={CONSULTATION_WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                        className="hidden items-center gap-2 border border-gold px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ivory transition hover:bg-gold hover:text-ink lg:inline-flex"
                    >
                        <MessageCircle size={15} />{" "}
                        <span className="hidden sm:inline">WhatsApp</span>
                    </a>
                    <button
                        type="button"
                        aria-label={
                            mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
                        }
                        aria-expanded={mobileMenuOpen}
                        onClick={() => setMobileMenuOpen((open) => !open)}
                        className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold text-ivory transition hover:bg-gold hover:text-ink lg:hidden"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
                <div
                    className={`absolute inset-x-0 top-24 overflow-hidden bg-ink transition-all duration-300 lg:hidden ${mobileMenuOpen ? "max-h-[32rem] border-b border-gold/30 opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}
                >
                    <nav className="grid px-5 py-6 text-sm text-ivory">
                        {navItems.map(([label, href], index) => (
                            <a
                                key={href}
                                href={href}
                                onClick={closeMobileMenu}
                                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b border-ivory/10 py-4 transition hover:text-gold"
                            >
                                <span className="text-[0.58rem] text-gold">0{index + 1}</span>
                                <span className="min-w-0 font-display text-2xl">{label}</span>
                                <ArrowRight size={15} className="shrink-0" />
                            </a>
                        ))}
                        <a
                            href={CONSULTATION_WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                            onClick={closeMobileMenu}
                            className="mt-6 inline-flex h-12 items-center justify-center gap-3 bg-gold px-5 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-ink"
                        >
                            <MessageCircle size={16} /> {isIndonesian ? "Konsultasi via WhatsApp" : "Consult via WhatsApp"}
                        </a>
                        <div className="mt-5 flex border border-ivory/20 text-xs font-semibold uppercase tracking-[0.14em]">
                            {(["id", "en"] as Language[]).map((option) => (
                                <button key={option} type="button" onClick={() => setLanguage(option)} className={`flex-1 py-3 ${language === option ? "bg-gold text-ink" : "text-ivory"}`} aria-pressed={language === option}>{option === "id" ? "Bahasa Indonesia" : "English"}</button>
                            ))}
                        </div>
                    </nav>
                </div>
            </header>

            <section id="top" className="relative min-h-[92svh] bg-ink text-ivory">
                <img
                    src={heroImage}
                    alt="Ivory kebaya from the Sancea collection"
                    width={1200}
                    height={1600}
                    className="absolute inset-0 h-full w-full object-cover object-[58%_center] md:left-auto md:w-[60%]"
                />
                <div className="absolute inset-0 bg-hero-wash" />
                <div className="relative mx-auto flex min-h-[92svh] max-w-[90rem] items-end px-5 pb-16 pt-36 md:items-center md:px-10 md:pb-0">
                    <div className="max-w-3xl">
                        <p className="mb-6 flex items-center gap-3 text-[0.66rem] uppercase tracking-[0.28em] text-gold">
                            <span className="h-px w-10 bg-gold" /> Bali · Denpasar
                        </p>
                        <h1 className="font-display text-5xl leading-[0.98] md:text-7xl lg:text-[5.8rem]">
                            {isIndonesian ? "Elegan di Setiap" : "Elegance for Every"}
                            <br />
                            <em className="font-normal text-gold">{isIndonesian ? "Momen Istimewa" : "Special Moment"}</em>
                        </h1>
                        <p className="mt-7 max-w-lg text-sm leading-7 text-ivory/70 md:text-base">
                            {isIndonesian ? "Sewa Kebaya, Makeup & Bridal Premium di Bali" : "Premium Kebaya Rental, Makeup & Bridal Services in Bali"}
                        </p>
                        <div className="mt-9 flex flex-wrap gap-3">
                            <a
                                href="#collections"
                                className="inline-flex h-12 items-center gap-3 bg-gold px-6 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-ink transition hover:bg-gold-light"
                            >
                                {isIndonesian ? "Lihat Koleksi" : "Explore Collection"} <ArrowRight size={15} />
                            </a>
                            <a
                                href={CONSULTATION_WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                                className="inline-flex h-12 items-center gap-3 border border-ivory/50 px-6 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-ivory transition hover:border-gold hover:text-gold"
                            >
                                {isIndonesian ? "Konsultasi via WhatsApp" : "Consult via WhatsApp"}
                            </a>
                        </div>
                    </div>
                </div>
                <a
                    href="#intro"
                    aria-label="Scroll to introduction"
                    className="absolute bottom-8 right-8 hidden h-12 w-12 items-center justify-center rounded-full border border-ivory/30 text-ivory md:flex"
                >
                    <ArrowDown size={17} />
                </a>
            </section>

            <section id="intro" className="bg-cream py-24 md:py-36">
                <div className="mx-auto grid max-w-[84rem] gap-16 px-5 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
                    <div>
                        <p className="eyebrow">
                            <span />
                            {isIndonesian ? "Rumah Sancea" : "The Sancea House"}
                        </p>
                        <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.1] text-ink md:text-6xl">
                            {isIndonesian ? "Pilihan untuk setiap " : "A destination for every beautiful "}
                            <em className="font-normal text-gold-dark">{isIndonesian ? "perayaan indah." : "celebration."}</em>
                        </h2>
                    </div>
                    <p className="max-w-xl text-base leading-8 text-muted-foreground">
                        From graduation and engagement to wedding and adat ceremonies, Sancea brings
                        an extensive kebaya collection together with thoughtful beauty and bridal
                        services—all under one roof in Denpasar.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-[84rem] border-y border-border px-5 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
                    {[
                        ["500+", "Kebaya Collections"],
                        ["XS–5XL", "Inclusive Sizing"],
                        ["03", "Beauty & Bridal"],
                        ["Bali", "Based in Denpasar"],
                    ].map(([big, small]) => (
                        <div
                            key={small}
                            className="border-b border-border py-8 sm:nth-[2n+1]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 lg:px-8 first:lg:pl-0"
                        >
                            <p className="font-display text-4xl text-ink md:text-5xl">{big}</p>
                            <p className="mt-2 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
                                {small}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="collections" className="py-24 md:py-36">
                <div className="mx-auto max-w-[84rem] px-5 md:px-10">
                    <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
                        <SectionHeading
                            eyebrow="The Collection"
                            title="Find a look for your moment"
                            copy="Explore silhouettes, colors, and details curated for every kind of celebration."
                        />
                        <p className="font-display text-xl italic text-gold-dark">
                            500+ pieces to discover
                        </p>
                    </div>
                    <div className="mt-14 grid auto-rows-[22rem] gap-4 sm:grid-cols-2 lg:grid-cols-12">
                        {collections.map((item, index) =>
                            item.name === "Catalog Kamen/Rok" ? (
                                <KamenRokCollection key={item.name} language={language} />
                            ) : item.name === "Catalog Kebaya" ? (
                                <CatalogKebayaCollection key={item.name} language={language} />
                            ) : item.name === "Safari & Set Couple" ? (
                                <SafariSetCoupleCollection key={item.name} language={language} />
                            ) : item.name === "Foto Ijazah" ? (
                                <FotoIjazahCollection key={item.name} language={language} />
                            ) : item.name === "Makeup" ? (
                                <MakeupCollection key={item.name} language={language} />
                            ) : item.name === "Other Collections" ? (
                                <AccessoriesCollection key={item.name} language={language} />
                            ) : (
                                <article
                                    key={item.name}
                                    className={`group relative overflow-hidden bg-ink ${index === 0 || index === 3 ? "lg:col-span-7" : "lg:col-span-5"} ${index === 6 ? "sm:col-span-2 lg:col-span-12 lg:max-h-[25rem]" : ""}`}
                                >
                                    <CatalogImage
                                        pos={item.pos}
                                        alt={`${item.name} kebaya collection`}
                                    />
                                    <div className="absolute inset-0 bg-card-wash" />
                                    <div className="absolute inset-x-0 bottom-0 p-6 text-ivory md:p-8">
                                        <p className="text-[0.6rem] uppercase tracking-[0.2em] text-gold">
                                            Collection {String(index + 1).padStart(2, "0")}
                                        </p>
                                        <h3 className="mt-2 font-display text-3xl">{item.name}</h3>
                                        <div className="mt-3 flex items-end justify-between gap-4">
                                            <p className="max-w-xs text-sm text-ivory/65">
                                                {item.note}
                                            </p>
                                            <span className="flex shrink-0 items-center gap-2 text-[0.62rem] uppercase tracking-[0.15em]">
                                                View <ArrowRight size={14} />
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ),
                        )}
                    </div>
                </div>
            </section>

            <section className="bg-ink py-24 text-ivory md:py-36">
                <div className="mx-auto max-w-[90rem] px-5 md:px-10">
                    <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
                        <SectionHeading
                            eyebrow="Featured Editorial"
                            title="The Art of Kebaya"
                            light
                        />
                        <p className="max-w-sm text-sm leading-7 text-ivory/55">
                            Heritage craft meets a contemporary point of view in our signature edit.
                        </p>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-[1.5fr_0.7fr]">
                        <div className="relative aspect-[16/10] overflow-hidden">
                            <img
                                src={featuredEditorialImage}
                                alt="Kebaya putih dan rok biru dalam editorial Sancea"
                                width={1600}
                                height={1008}
                                loading="lazy"
                                className="h-full w-full object-cover object-center"
                            />
                            <div className="absolute bottom-0 left-0 border-l border-gold bg-ink/85 px-6 py-5 backdrop-blur">
                                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-gold">
                                    Signature Story
                                </p>
                                <p className="mt-1 font-display text-2xl">Kebaya, Reimagined</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
                            {featuredEditorialSideImages.map((image) => (
                                <div key={image.src} className="overflow-hidden">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        width={1200}
                                        height={1200}
                                        loading="lazy"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" className="bg-cream py-24 md:py-36">
                <div className="mx-auto max-w-[84rem] px-5 md:px-10">
                    <SectionHeading
                        eyebrow={isIndonesian ? "Layanan Kami" : "Our Services"}
                        title={isIndonesian ? "Tampil sempurna dari awal hingga akhir" : "Styled from beginning to end"}
                        copy={isIndonesian ? "Layanan sewa, kecantikan, dan bridal untuk menyempurnakan penampilan Anda." : "A considered suite of rental, beauty, and bridal services for your complete look."}
                    />
                    <div className="mt-14 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, index) => (
                            <article key={service.title} className="group">
                                <div className="aspect-[4/5] overflow-hidden bg-muted">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        width={1600}
                                        height={2000}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                                    />
                                </div>
                                <div className="border-b border-border py-5">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-[0.58rem] uppercase tracking-[0.2em] text-gold-dark">
                                                0{index + 1}
                                            </p>
                                            <h3 className="mt-2 font-display text-2xl text-ink">
                                                {service.title}
                                            </h3>
                                        </div>
                                        <ArrowRight className="mt-2 text-gold-dark" size={17} />
                                    </div>
                                    <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                                        {service.text[language]}
                                    </p>
                                    <a
                                        href={whatsappLink(service.whatsapp, service.message[language])}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-5 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-ink transition hover:text-gold-dark"
                                    >
                                        {isIndonesian ? "Hubungi admin" : "Contact admin"}
                                        <MessageCircle size={15} aria-hidden="true" />
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="packages" className="py-24 md:py-36">
                <div className="mx-auto max-w-[84rem] px-5 md:px-10">
                    <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
                        <SectionHeading
                            eyebrow={isIndonesian ? "Paket" : "Packages"}
                            title={isIndonesian ? "Dirancang untuk acara Anda" : "Made for your occasion"}
                            copy={isIndonesian ? "Setiap tampilan bersifat personal. Pilih paket awal, lalu konsultasikan kebutuhan Anda dengan tim kami." : "Every look is personal. Select a starting point, then consult with our team for the right fit and finish."}
                        />
                        <div className="grid border-t border-border sm:grid-cols-2">
                            {[
                                "Kebaya Rental",
                                "Graduation Package",
                                "Makeup",
                                "Bridal Package",
                            ].map((name, index) => (
                                <article
                                    key={name}
                                    className="border-b border-border py-8 sm:px-7 sm:nth-[2n+1]:border-r"
                                >
                                    <p className="text-[0.6rem] uppercase tracking-[0.18em] text-gold-dark">
                                        {isIndonesian ? "Mulai dari" : "Starting From"}
                                    </p>
                                    <h3 className="mt-4 font-display text-2xl text-ink">{name}</h3>
                                    <p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">
                                        {isIndonesian ? "Pilihan yang disesuaikan dengan gaya, acara, dan preferensi Anda." : "A tailored selection to suit your style, event, and preferences."}
                                    </p>
                                    <a
                                        href={CONSULTATION_WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                                        className="mt-6 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-ink"
                                    >
                                        {isIndonesian ? "Tanyakan harga" : "Ask for Price"} <ArrowRight size={14} />
                                    </a>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-border bg-cream">
                <div className="mx-auto grid max-w-[84rem] sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        [Sparkles, "500+ Collections"],
                        [Ruler, "XS–5XL Available"],
                        [Scissors, "Complete Bridal Services"],
                        [MessageCircle, "Professional Service"],
                    ].map(([Icon, label], i) => {
                        const C = Icon as typeof Sparkles;
                        return (
                            <div
                                key={String(label)}
                                className="flex min-h-44 flex-col justify-between border-b border-border p-7 sm:border-r lg:border-b-0 lg:last:border-r-0"
                            >
                                <C size={20} strokeWidth={1.2} className="text-gold-dark" />
                                <div>
                                    <p className="font-display text-4xl text-gold-light">
                                        0{i + 1}
                                    </p>
                                    <h3 className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] text-ink">
                                        {String(label)}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section id="portfolio" className="py-24 md:py-36">
                <div className="mx-auto max-w-[84rem] px-5 md:px-10">
                    <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
                        <SectionHeading eyebrow={isIndonesian ? "Momen Nyata" : "Real Moments"} title="The Sancea Portfolio" />
                        <p className="max-w-sm text-sm leading-7 text-muted-foreground">
                            {isIndonesian ? "Setiap klien tampil cantik dengan gayanya sendiri. Sekilas momen yang ditata oleh Sancea." : "Every client, beautifully themselves. A glimpse into celebrations styled by Sancea."}
                        </p>
                    </div>
                    <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
                        {[
                            { src: "/images/collections/catalog-kebaya/1mRsLJIcSDv769RjuEwWgg4AezbPahmrq.webp", label: "Kebaya Rental", alt: "Kebaya biru dengan selendang perak untuk wisuda", featured: true },
                            { src: "/images/collections/makeup/1nCnbrxnFCqPJNrC4leKyusvrtihWEjkJ.webp", label: "Makeup", alt: "Riasan soft glam dengan kebaya cokelat di dekat jendela", featured: false },
                            { src: "/images/collections/accessories/1NnL6YKfgvf1_d41knYo83ZGnkQonRLxc.webp", label: "Bridal Shoes", alt: "Sepatu bridal gold dengan hiasan kristal dan mutiara", featured: false },
                            { src: "/images/collections/catalog-kebaya/1HaogYFkyOjxVD0tySwv4jB_2h4DJ3IUA.webp", label: "Kebaya Rental", alt: "Kebaya merah dengan kamen bermotif hitam putih", featured: false },
                            { src: "/images/collections/makeup/1cKdoiTxfp6hgL-3nP3Ba3LHI3DoB75xs.webp", label: "Makeup", alt: "Riasan natural dengan kebaya krem dan selendang ungu", featured: false },
                        ].map((photo) => (
                            <figure key={photo.src} className={`group overflow-hidden bg-cream ${photo.featured ? "col-span-2 md:row-span-2" : ""}`}>
                                <div className={photo.featured ? "aspect-[2/3] overflow-hidden" : "aspect-[3/4] overflow-hidden"}>
                                    <img src={photo.src} alt={photo.alt} width={1000} height={photo.featured ? 1500 : 1333} loading="lazy" className="h-full w-full object-cover object-center" />
                                </div>
                                <figcaption className="border-b border-border px-3 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink">{photo.label}</figcaption>
                            </figure>
                        ))}
                    </div>                </div>
            </section>

            <section className="bg-ink py-24 text-ivory md:py-32">
                <div className="mx-auto max-w-[84rem] px-5 md:px-10">
                    <SectionHeading eyebrow={isIndonesian ? "Cerita Klien" : "Client Notes"} title={isIndonesian ? "Dikenakan dengan cinta" : "Worn with love"} light />
                    <div className="mt-12 grid gap-px bg-ivory/15 md:grid-cols-3">
                        {[
                            [
                                "“The collection was beautiful and the team helped me find a kebaya that felt completely right for my graduation.”",
                                "Ayu Maharani",
                                "Graduation Styling",
                            ],
                            [
                                "“Every detail, from the fitting to the makeup, felt calm and considered. I felt so confident on the day.”",
                                "Citra Dewi",
                                "Bridal Package",
                            ],
                            [
                                "“Sancea made styling our bridesmaids effortless. The colors looked stunning together in every photograph.”",
                                "Nadia Putri",
                                "Wedding Party",
                            ],
                        ].map(([quote, name, service]) => (
                            <blockquote key={name} className="bg-ink p-7 md:p-9">
                                <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-full bg-gold-muted font-display text-xl text-gold-dark">
                                    {name?.charAt(0)}
                                </div>
                                <p className="font-display text-2xl leading-9 text-ivory/90">
                                    {quote}
                                </p>
                                <footer className="mt-8 border-t border-ivory/15 pt-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                                        {name}
                                    </p>
                                    <p className="mt-1 text-[0.62rem] uppercase tracking-[0.14em] text-gold">
                                        {service}
                                    </p>
                                </footer>
                            </blockquote>
                        ))}
                    </div>
                </div>
            </section>

            <section id="location" className="bg-cream py-24 md:py-36">
                <div className="mx-auto grid max-w-[84rem] gap-12 px-5 md:px-10 lg:grid-cols-2 lg:items-stretch">
                    <div className="flex flex-col justify-between py-4">
                        <SectionHeading
                            eyebrow={isIndonesian ? "Kunjungi Atelier" : "Visit the Atelier"}
                            title="Sancea Kebaya Cantik"
                            copy={isIndonesian ? "Kunjungi koleksi kami secara langsung dan biarkan tim kami membantu menemukan tampilan yang tepat untuk acara Anda." : "Discover our collection in person and let our team help you find the right look for your occasion."}
                        />
                        <div className="mt-12">
                            <div className="flex items-start gap-4">
                                <MapPin className="mt-1 text-gold-dark" size={19} />
                                <div>
                                    <p className="font-display text-2xl text-ink">SANCEA KEBAYA CANTIK</p>
                                    <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">Jl. Suli No.68, Dangin Puri Kangin, Kec. Denpasar Utara, Kota Denpasar, Bali 80234</p>
                                </div>
                            </div>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=SANCEA%20KEBAYA%20CANTIK%2C%20Jl.%20Suli%20No.68%2C%20Dangin%20Puri%20Kangin%2C%20Denpasar%20Utara%2C%20Bali%2080234" target="_blank" rel="noreferrer"
                                className="mt-8 inline-flex items-center gap-3 border-b border-ink pb-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink"
                            >
                                {isIndonesian ? "Lihat lokasi" : "View Location"} <ArrowRight size={14} />
                            </a>
                        </div>
                    </div>
                    <div className="relative min-h-[25rem] overflow-hidden border border-border">
                        <iframe
                            title="Lokasi Sancea Kebaya Cantik, Jalan Suli No.68 Denpasar"
                            src="https://www.google.com/maps?q=SANCEA%20KEBAYA%20CANTIK%2C%20Jl.%20Suli%20No.68%2C%20Dangin%20Puri%20Kangin%2C%20Denpasar%20Utara%2C%20Bali%2080234&output=embed"
                            className="absolute inset-0 h-full w-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>

            <section
                id="contact"
                className="relative bg-ink px-5 py-28 text-center text-ivory md:py-40"
            >
                <div className="mx-auto max-w-3xl">
                    <p className="eyebrow justify-center">
                        <span />
                        {isIndonesian ? "Momen Sancea Anda" : "Your Sancea Moment"}
                        <span />
                    </p>
                    <h2 className="mt-7 font-display text-5xl leading-none md:text-7xl">
                        {isIndonesian ? "Temukan Tampilan Terbaik Anda" : "Find Your Perfect Look"}
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl leading-7 text-ivory/60">
                        {isIndonesian ? "Jelajahi koleksi kami dan konsultasikan kebutuhan acara spesial Anda bersama tim kami." : "Explore our collection and consult with our team for your special occasion."}
                    </p>
                    <a
                        href={CONSULTATION_WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                        className="mt-9 inline-flex h-13 items-center gap-3 bg-gold px-7 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-ink transition hover:bg-gold-light"
                    >
                        <MessageCircle size={17} /> {isIndonesian ? "Konsultasi via WhatsApp" : "Consult via WhatsApp"}
                    </a>
                </div>
            </section>

            <footer className="border-t border-ivory/10 bg-ink px-5 py-12 text-ivory md:px-10">
                <div className="mx-auto grid max-w-[84rem] gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
                    <div>
                        <img
                            src="/logo.1.png?v=20260922"
                            alt="Sancea Kebaya & Makeup"
                            className="h-auto w-44 max-w-full object-contain object-left"
                        />
                        <p className="mt-5 max-w-xs text-sm leading-6 text-ivory/45">
                            {isIndonesian ? "Layanan sewa kebaya, makeup, dan bridal premium di Denpasar, Bali." : "Premium kebaya rental, makeup, and bridal services in Denpasar, Bali."}
                        </p>
                    </div>
                    <div>
                        <p className="footer-title">{isIndonesian ? "Jelajahi" : "Explore"}</p>
                        <div className="mt-4 grid gap-3 text-sm text-ivory/55">
                            {navItems.slice(0, 4).map(([label, href]) => <a key={href} href={href}>{label}</a>)}
                        </div>
                    </div>
                    <div>
                        <p className="footer-title">{isIndonesian ? "Hubungi" : "Connect"}</p>
                        <div className="mt-4 grid gap-3 text-sm text-ivory/55">
                            <a href="#contact" className="flex items-center gap-2">
                                <Instagram size={15} />
                                Instagram
                            </a>
                            <a href={CONSULTATION_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <MessageCircle size={15} />
                                WhatsApp
                            </a>
                            <a href="#location" className="flex items-center gap-2">
                                <MapPin size={15} />
                                Denpasar, Bali
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mx-auto mt-12 flex max-w-[84rem] flex-col gap-2 border-t border-ivory/10 pt-6 text-[0.58rem] uppercase tracking-[0.16em] text-ivory/30 sm:flex-row sm:justify-between">
                    <p>© 2026 Sancea Kebaya & Makeup</p>
                    <p>{isIndonesian ? "Elegan untuk setiap momen istimewa" : "Elegance for every special moment"}</p>
                </div>
            </footer>
        </main>
    );
}
