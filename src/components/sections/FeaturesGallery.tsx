import Link from "next/link";
import {
  ArrowLeftRight,
  Bell,
  ClipboardCheck,
  Cpu,
  FileText,
  LayoutDashboard,
  Lock,
  MapPin,
  ScanLine,
  Smartphone,
  Tag,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
} from "@/components/ui/animated-gallery";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Section 7 — Fonctionnalités clés. Galerie 3 colonnes avec tilt 3D + parallax
 * au scroll natif. id="features" : cible des liens footer / nav.
 *
 * ⚠️ Tuiles = PLACEHOLDERS TEXTE en attendant les screenshots réels. Aucune
 * stock photo, aucune image hors-sujet. À remplacer par <Image src=...> dès
 * que les captures du dashboard / mobile / terrain seront déposées dans
 * /public/images/.
 */

type PlaceholderTile = {
  category: string;
  label: string;
  icon: LucideIcon;
};

// Colonne 1 — Dashboard web
const COL_DASHBOARD: PlaceholderTile[] = [
  { category: "Dashboard", label: "Vue d'ensemble actifs", icon: LayoutDashboard },
  { category: "Dashboard", label: "Alertes Kanban", icon: Bell },
  { category: "Dashboard", label: "Rapports PDF / Excel", icon: FileText },
  { category: "Dashboard", label: "Mouvements & historique", icon: ArrowLeftRight },
];

// Colonne 2 — Application mobile / scanner Zebra
const COL_MOBILE: PlaceholderTile[] = [
  { category: "Mobile", label: "Application PATRIMOS", icon: Smartphone },
  { category: "Mobile", label: "Scan d'un actif", icon: ScanLine },
  { category: "Mobile", label: "Mode hors-ligne", icon: WifiOff },
  { category: "Mobile", label: "Authentification staff", icon: Lock },
];

// Colonne 3 — Terrain (puces, marquage, audit)
const COL_FIELD: PlaceholderTile[] = [
  { category: "Terrain", label: "Puce RFID posée", icon: Cpu },
  { category: "Terrain", label: "Marquage actif", icon: Tag },
  { category: "Terrain", label: "Zones autorisées", icon: MapPin },
  { category: "Terrain", label: "Audit inventaire", icon: ClipboardCheck },
];

function Tile({ tile }: { tile: PlaceholderTile }) {
  const Icon = tile.icon;
  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-xl border border-[#C9A55C]/20 bg-[#141414] p-4 shadow-2xl shadow-black/50">
      <Icon
        className="h-7 w-7 text-gold"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <div className="text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-gold/70">
          {tile.category}
        </p>
        <p className="mt-1 text-sm text-ink-secondary">{tile.label}</p>
      </div>
    </div>
  );
}

export function FeaturesGallery({
  locale,
  features: dict,
}: {
  locale: Locale;
  features: Dictionary["features"];
}) {
  const ctaContact = localizeHref("/#contact", locale);
  const ctaMobileApp = localizeHref("/#mobile-app", locale);

  return (
    <section
      id="features"
      aria-label="Fonctionnalités clés"
      className="relative overflow-hidden bg-surface"
    >
      {/* Radial or très subtil en haut de section. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(201, 165, 92, 0.08), transparent 60%)",
        }}
      />

      {/* Header */}
      <Container className="relative z-10">
        <ContainerStagger className="pt-section text-center">
          <ContainerAnimated>
            <p className="text-xs uppercase tracking-[0.3em] text-gold/80">
              {dict.overline}
            </p>
          </ContainerAnimated>

          <ContainerAnimated>
            <h2 className="mt-5 font-serif text-4xl leading-[1.15] text-ink-primary md:text-5xl">
              {dict.titleLine1Pre}
              <span className="text-gold">{dict.titleLine1Accent}</span>
              <br />
              {dict.titleLine2}
            </h2>
          </ContainerAnimated>

          <ContainerAnimated>
            <p className="mx-auto mt-6 max-w-[600px] text-lg leading-relaxed text-ink-secondary">
              {dict.subtitle}
            </p>
          </ContainerAnimated>

          <ContainerAnimated>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={ctaContact}
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 font-sans text-sm font-medium tracking-wide text-surface transition-colors duration-300 hover:bg-gold-hover"
              >
                {dict.ctaPrimary}
              </Link>
              <Link
                href={ctaMobileApp}
                className="inline-flex items-center justify-center rounded-full border border-gold px-8 py-3 font-sans text-sm font-medium tracking-wide text-gold transition-colors duration-300 hover:bg-gold/10"
              >
                {dict.ctaSecondary}
              </Link>
            </div>
          </ContainerAnimated>
        </ContainerStagger>
      </Container>

      {/* Galerie 3 colonnes — tilt 3D + parallax au scroll. */}
      <ContainerScroll className="relative z-10 mt-16 h-[180vh] md:mt-24">
        <ContainerSticky className="h-svh px-4 md:px-8">
          <GalleryContainer>
            <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
              {COL_DASHBOARD.map((tile) => (
                <Tile key={tile.label} tile={tile} />
              ))}
            </GalleryCol>

            <GalleryCol
              yRange={["15%", "5%"]}
              className="mt-0 md:mt-[-20%]"
            >
              {COL_MOBILE.map((tile) => (
                <Tile key={tile.label} tile={tile} />
              ))}
            </GalleryCol>

            {/* Colonne 3 masquée sur mobile (grid passe à 2 colonnes). */}
            <GalleryCol
              yRange={["-10%", "2%"]}
              className="-mt-2 hidden md:flex"
            >
              {COL_FIELD.map((tile) => (
                <Tile key={tile.label} tile={tile} />
              ))}
            </GalleryCol>
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
    </section>
  );
}
