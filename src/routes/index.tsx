import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Instagram,
  MapPin,
  MessageCircle,
  Ruler,
  Scissors,
  Sparkles,
} from "lucide-react";

import heroImage from "../assets/sancea-hero.jpg";
import collectionsImage from "../assets/sancea-collections.jpg";
import servicesImage from "../assets/sancea-services.jpg";
import editorialImage from "../assets/sancea-editorial.jpg";

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
        content: "A premium digital showroom for kebaya, makeup, and bridal styling in Bali.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const collections = [
  { name: "Wisuda", note: "Poised looks for your proudest chapter", pos: "left-top" },
  { name: "Wedding", note: "Timeless silhouettes for sacred moments", pos: "right-top" },
  { name: "Bridesmaid", note: "A considered palette for your closest circle", pos: "left-bottom" },
  { name: "Traditional / Adat", note: "Heritage details, styled with reverence", pos: "right-bottom" },
  { name: "Engagement", note: "Romantic pieces for an intimate celebration", pos: "right-top" },
  { name: "Event", note: "Elegant statements for every invitation", pos: "left-top" },
  { name: "Other Collections", note: "Discover more signature Sancea looks", pos: "left-bottom" },
];

const services = [
  { title: "Kebaya Rental", text: "A considered collection spanning modern, classic, and ceremonial styles.", pos: "collections-left-top" },
  { title: "Makeup", text: "Refined beauty that feels polished, luminous, and unmistakably you.", pos: "services-left-top" },
  { title: "Bridal", text: "Complete bridal styling shaped around your story and traditions.", pos: "services-right-top" },
  { title: "Wedding", text: "Thoughtful looks for the bride, family, and wedding party.", pos: "collections-right-top" },
  { title: "Graduation", text: "A confident, camera-ready look for your milestone day.", pos: "services-right-bottom" },
  { title: "Shoes & Accessories", text: "The finishing details, selected to complete your ensemble.", pos: "services-left-bottom" },
];

function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className={inverse ? "text-ivory" : "text-ink"}>
      <div className="font-display text-[1.65rem] leading-none tracking-[0.22em]">SANCEA</div>
      <div className="mt-1 text-center text-[0.58rem] uppercase tracking-[0.34em] text-gold">Kebaya & Makeup</div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow"><span />{eyebrow}</p>
      <h2 className={`mt-5 font-display text-4xl leading-[1.08] md:text-6xl ${light ? "text-ivory" : "text-ink"}`}>{title}</h2>
      {copy && <p className={`mt-5 max-w-xl leading-7 ${light ? "text-ivory/65" : "text-muted-foreground"}`}>{copy}</p>}
    </div>
  );
}

function CatalogImage({ pos, alt }: { pos: string; alt: string }) {
  return <img src={collectionsImage} alt={alt} width={1600} height={1600} loading="lazy" className={`h-full w-full object-cover transition duration-700 group-hover:scale-[1.03] object-${pos}`} />;
}

function Index() {
  return (
    <main className="overflow-hidden bg-background">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-ivory/20">
        <div className="mx-auto flex h-24 max-w-[90rem] items-center justify-between px-5 md:px-10">
          <a href="#top" aria-label="Sancea home"><Wordmark inverse /></a>
          <nav className="hidden items-center gap-8 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ivory/75 lg:flex">
            <a className="transition hover:text-gold" href="#collections">Collections</a>
            <a className="transition hover:text-gold" href="#services">Services</a>
            <a className="transition hover:text-gold" href="#packages">Packages</a>
            <a className="transition hover:text-gold" href="#portfolio">Portfolio</a>
            <a className="transition hover:text-gold" href="#location">Location</a>
          </nav>
          <a href="#contact" className="inline-flex items-center gap-2 border border-gold px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ivory transition hover:bg-gold hover:text-ink">
            <MessageCircle size={15} /> <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </header>

      <section id="top" className="relative min-h-[92svh] bg-ink text-ivory">
        <img src={heroImage} alt="Ivory kebaya from the Sancea collection" width={1200} height={1600} className="absolute inset-0 h-full w-full object-cover object-[58%_center] md:left-auto md:w-[60%]" />
        <div className="absolute inset-0 bg-hero-wash" />
        <div className="relative mx-auto flex min-h-[92svh] max-w-[90rem] items-end px-5 pb-16 pt-36 md:items-center md:px-10 md:pb-0">
          <div className="max-w-3xl">
            <p className="mb-6 flex items-center gap-3 text-[0.66rem] uppercase tracking-[0.28em] text-gold"><span className="h-px w-10 bg-gold" /> Bali · Denpasar</p>
            <h1 className="font-display text-5xl leading-[0.98] md:text-7xl lg:text-[5.8rem]">Elegance for Every<br /><em className="font-normal text-gold">Special Moment</em></h1>
            <p className="mt-7 max-w-lg text-sm leading-7 text-ivory/70 md:text-base">Premium Kebaya Rental, Makeup & Bridal Services in Bali</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#collections" className="inline-flex h-12 items-center gap-3 bg-gold px-6 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-ink transition hover:bg-gold-light">Explore Collection <ArrowRight size={15} /></a>
              <a href="#contact" className="inline-flex h-12 items-center gap-3 border border-ivory/50 px-6 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-ivory transition hover:border-gold hover:text-gold">Consult via WhatsApp</a>
            </div>
          </div>
        </div>
        <a href="#intro" aria-label="Scroll to introduction" className="absolute bottom-8 right-8 hidden h-12 w-12 items-center justify-center rounded-full border border-ivory/30 text-ivory md:flex"><ArrowDown size={17} /></a>
      </section>

      <section id="intro" className="bg-cream py-24 md:py-36">
        <div className="mx-auto grid max-w-[84rem] gap-16 px-5 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow"><span />The Sancea House</p>
            <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.1] text-ink md:text-6xl">A destination for every beautiful <em className="font-normal text-gold-dark">celebration.</em></h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-muted-foreground">From graduation and engagement to wedding and adat ceremonies, Sancea brings an extensive kebaya collection together with thoughtful beauty and bridal services—all under one roof in Denpasar.</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-[84rem] border-y border-border px-5 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
          {[['500+', 'Kebaya Collections'], ['XS–5XL', 'Inclusive Sizing'], ['03', 'Beauty & Bridal'], ['Bali', 'Based in Denpasar']].map(([big, small]) => (
            <div key={small} className="border-b border-border py-8 sm:nth-[2n+1]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 lg:px-8 first:lg:pl-0">
              <p className="font-display text-4xl text-ink md:text-5xl">{big}</p><p className="mt-2 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">{small}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="collections" className="py-24 md:py-36">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><SectionHeading eyebrow="The Collection" title="Find a look for your moment" copy="Explore silhouettes, colors, and details curated for every kind of celebration." /><p className="font-display text-xl italic text-gold-dark">500+ pieces to discover</p></div>
          <div className="mt-14 grid auto-rows-[22rem] gap-4 sm:grid-cols-2 lg:grid-cols-12">
            {collections.map((item, index) => (
              <article key={item.name} className={`group relative overflow-hidden bg-ink ${index === 0 || index === 3 ? "lg:col-span-7" : "lg:col-span-5"} ${index === 6 ? "sm:col-span-2 lg:col-span-12 lg:max-h-[25rem]" : ""}`}>
                <CatalogImage pos={item.pos} alt={`${item.name} kebaya collection`} />
                <div className="absolute inset-0 bg-card-wash" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-ivory md:p-8">
                  <p className="text-[0.6rem] uppercase tracking-[0.2em] text-gold">Collection {String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 font-display text-3xl">{item.name}</h3>
                  <div className="mt-3 flex items-end justify-between gap-4"><p className="max-w-xs text-sm text-ivory/65">{item.note}</p><span className="flex shrink-0 items-center gap-2 text-[0.62rem] uppercase tracking-[0.15em]">View <ArrowRight size={14} /></span></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-ivory md:py-36">
        <div className="mx-auto max-w-[90rem] px-5 md:px-10">
          <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end"><SectionHeading eyebrow="Featured Editorial" title="The Art of Kebaya" light /><p className="max-w-sm text-sm leading-7 text-ivory/55">Heritage craft meets a contemporary point of view in our signature edit.</p></div>
          <div className="grid gap-4 lg:grid-cols-[1.5fr_0.7fr]">
            <div className="relative aspect-[16/10] overflow-hidden"><img src={editorialImage} alt="Sancea featured kebaya editorial" width={1600} height={1008} loading="lazy" className="h-full w-full object-cover" /><div className="absolute bottom-0 left-0 border-l border-gold bg-ink/85 px-6 py-5 backdrop-blur"><p className="text-[0.6rem] uppercase tracking-[0.2em] text-gold">Signature Story</p><p className="mt-1 font-display text-2xl">Kebaya, Reimagined</p></div></div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
              <div className="overflow-hidden"><CatalogImage pos="right-bottom" alt="Traditional black and gold kebaya" /></div><div className="overflow-hidden"><CatalogImage pos="left-bottom" alt="Sage bridesmaid kebaya" /></div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-cream py-24 md:py-36">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <SectionHeading eyebrow="Our Services" title="Styled from beginning to end" copy="A considered suite of rental, beauty, and bridal services for your complete look." />
          <div className="mt-14 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <article key={service.title} className="group">
                <div className="aspect-[4/5] overflow-hidden bg-muted">{service.pos.startsWith('services') ? <img src={servicesImage} alt={service.title} width={1600} height={1600} loading="lazy" className={`h-full w-full object-cover transition duration-700 group-hover:scale-[1.03] object-${service.pos.replace('services-', '')}`} /> : <CatalogImage pos={service.pos.replace('collections-', '')} alt={service.title} />}</div>
                <div className="border-b border-border py-5"><div className="flex items-start justify-between"><div><p className="text-[0.58rem] uppercase tracking-[0.2em] text-gold-dark">0{index + 1}</p><h3 className="mt-2 font-display text-2xl text-ink">{service.title}</h3></div><ArrowRight className="mt-2 text-gold-dark" size={17} /></div><p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{service.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="py-24 md:py-36">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]"><SectionHeading eyebrow="Packages" title="Made for your occasion" copy="Every look is personal. Select a starting point, then consult with our team for the right fit and finish." />
            <div className="grid border-t border-border sm:grid-cols-2">
              {['Kebaya Rental', 'Graduation Package', 'Makeup', 'Bridal Package'].map((name, index) => (
                <article key={name} className="border-b border-border py-8 sm:px-7 sm:nth-[2n+1]:border-r"><p className="text-[0.6rem] uppercase tracking-[0.18em] text-gold-dark">Starting From</p><h3 className="mt-4 font-display text-2xl text-ink">{name}</h3><p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">A tailored selection to suit your style, event, and preferences.</p><a href="#contact" className="mt-6 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-ink">Ask for Price <ArrowRight size={14} /></a></article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-cream">
        <div className="mx-auto grid max-w-[84rem] sm:grid-cols-2 lg:grid-cols-4">
          {[[Sparkles, '500+ Collections'], [Ruler, 'XS–5XL Available'], [Scissors, 'Complete Bridal Services'], [MessageCircle, 'Professional Service']].map(([Icon, label], i) => {
            const C = Icon as typeof Sparkles; return <div key={String(label)} className="flex min-h-44 flex-col justify-between border-b border-border p-7 sm:border-r lg:border-b-0 lg:last:border-r-0"><C size={20} strokeWidth={1.2} className="text-gold-dark" /><div><p className="font-display text-4xl text-gold-light">0{i + 1}</p><h3 className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] text-ink">{String(label)}</h3></div></div>
          })}
        </div>
      </section>

      <section id="portfolio" className="py-24 md:py-36">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><SectionHeading eyebrow="Real Moments" title="The Sancea Portfolio" /><p className="max-w-sm text-sm leading-7 text-muted-foreground">Every client, beautifully themselves. A glimpse into celebrations styled by Sancea.</p></div>
          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
            <div className="col-span-2 row-span-2 aspect-square overflow-hidden md:aspect-auto"><img src={editorialImage} alt="Sancea wedding clients" width={1600} height={1008} loading="lazy" className="h-full w-full object-cover object-left" /></div>
            <div className="aspect-[4/5] overflow-hidden"><img src={servicesImage} alt="Sancea bridal makeup" width={1600} height={1600} loading="lazy" className="h-full w-full object-cover object-left-top" /></div>
            <div className="aspect-[4/5] overflow-hidden"><CatalogImage pos="left-top" alt="Graduation styling by Sancea" /></div>
            <div className="aspect-[4/5] overflow-hidden"><img src={servicesImage} alt="Sancea bridal styling" width={1600} height={1600} loading="lazy" className="h-full w-full object-cover object-right-top" /></div>
            <div className="aspect-[4/5] overflow-hidden"><CatalogImage pos="right-bottom" alt="Traditional Balinese styling" /></div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-ivory md:py-32">
        <div className="mx-auto max-w-[84rem] px-5 md:px-10"><SectionHeading eyebrow="Client Notes" title="Worn with love" light />
          <div className="mt-12 grid gap-px bg-ivory/15 md:grid-cols-3">
            {[
              ['“The collection was beautiful and the team helped me find a kebaya that felt completely right for my graduation.”', 'Ayu Maharani', 'Graduation Styling'],
              ['“Every detail, from the fitting to the makeup, felt calm and considered. I felt so confident on the day.”', 'Citra Dewi', 'Bridal Package'],
              ['“Sancea made styling our bridesmaids effortless. The colors looked stunning together in every photograph.”', 'Nadia Putri', 'Wedding Party'],
            ].map(([quote, name, service]) => <blockquote key={name} className="bg-ink p-7 md:p-9"><div className="mb-8 flex h-11 w-11 items-center justify-center rounded-full bg-gold-muted font-display text-xl text-gold-dark">{name.charAt(0)}</div><p className="font-display text-2xl leading-9 text-ivory/90">{quote}</p><footer className="mt-8 border-t border-ivory/15 pt-5"><p className="text-xs font-semibold uppercase tracking-[0.14em]">{name}</p><p className="mt-1 text-[0.62rem] uppercase tracking-[0.14em] text-gold">{service}</p></footer></blockquote>)}
          </div>
        </div>
      </section>

      <section id="location" className="bg-cream py-24 md:py-36">
        <div className="mx-auto grid max-w-[84rem] gap-12 px-5 md:px-10 lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col justify-between py-4"><SectionHeading eyebrow="Visit the Atelier" title="Sancea Kebaya & Makeup" copy="Discover our collection in person and let our team help you find the right look for your occasion." /><div className="mt-12"><div className="flex items-start gap-4"><MapPin className="mt-1 text-gold-dark" size={19} /><div><p className="font-display text-2xl text-ink">Denpasar, Bali</p><p className="mt-1 text-sm text-muted-foreground">Indonesia</p></div></div><a href="#contact" className="mt-8 inline-flex items-center gap-3 border-b border-ink pb-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink">View Location <ArrowRight size={14} /></a></div></div>
          <div className="map-art relative min-h-[25rem] overflow-hidden border border-border"><div className="absolute inset-8 border border-gold/30" /><div className="absolute left-[52%] top-[47%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-gold shadow-soft"><MapPin size={21} /></div><p className="absolute bottom-7 left-7 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink">Denpasar · Bali</p></div>
        </div>
      </section>

      <section id="contact" className="relative bg-ink px-5 py-28 text-center text-ivory md:py-40"><div className="mx-auto max-w-3xl"><p className="eyebrow justify-center"><span />Your Sancea Moment<span /></p><h2 className="mt-7 font-display text-5xl leading-none md:text-7xl">Find Your Perfect Look</h2><p className="mx-auto mt-6 max-w-xl leading-7 text-ivory/60">Explore our collection and consult with our team for your special occasion.</p><a href="#contact" className="mt-9 inline-flex h-13 items-center gap-3 bg-gold px-7 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-ink transition hover:bg-gold-light"><MessageCircle size={17} /> Consult via WhatsApp</a></div></section>

      <footer className="border-t border-ivory/10 bg-ink px-5 py-12 text-ivory md:px-10"><div className="mx-auto grid max-w-[84rem] gap-10 md:grid-cols-[1.4fr_1fr_1fr]"><div><Wordmark inverse /><p className="mt-5 max-w-xs text-sm leading-6 text-ivory/45">Premium kebaya rental, makeup, and bridal services in Denpasar, Bali.</p></div><div><p className="footer-title">Explore</p><div className="mt-4 grid gap-3 text-sm text-ivory/55"><a href="#collections">Collections</a><a href="#services">Services</a><a href="#packages">Packages</a><a href="#portfolio">Portfolio</a></div></div><div><p className="footer-title">Connect</p><div className="mt-4 grid gap-3 text-sm text-ivory/55"><a href="#contact" className="flex items-center gap-2"><Instagram size={15} />Instagram</a><a href="#contact" className="flex items-center gap-2"><MessageCircle size={15} />WhatsApp</a><a href="#location" className="flex items-center gap-2"><MapPin size={15} />Denpasar, Bali</a></div></div></div><div className="mx-auto mt-12 flex max-w-[84rem] flex-col gap-2 border-t border-ivory/10 pt-6 text-[0.58rem] uppercase tracking-[0.16em] text-ivory/30 sm:flex-row sm:justify-between"><p>© 2026 Sancea Kebaya & Makeup</p><p>Elegance for every special moment</p></div></footer>
    </main>
  );
}