import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Beranda", to: "/" as const },
  { label: "Katalog", to: "/katalog" as const },
];

export function CatalogHeader({ businessName = "Sancea Kebaya", tagline = "Kebaya & Makeup" }: { businessName?: string; tagline?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[84rem] items-center justify-between px-5 md:px-10">
        <Link to="/" aria-label="Sancea home" className="text-ink">
          <div className="font-display text-[1.4rem] leading-none tracking-[0.12em]">{businessName}</div>
          <div className="mt-1 text-[0.52rem] uppercase tracking-[0.3em] text-gold-dark">{tagline}</div>
        </Link>
        <nav className="hidden items-center gap-8 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "text-gold-dark" }}
              className="transition hover:text-gold-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center border border-border text-ink md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <nav className="grid border-t border-border px-5 py-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="border-b border-border py-3 font-display text-xl text-ink last:border-b-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
