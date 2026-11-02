"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import NeuralBackground from "./FlowFieldBackground";
import type { Locale } from "@/lib/i18n/config";
import { appHomeHref, appLoginUrl, type AppHomeDictionary } from "@/lib/i18n/app-home";

// Nombre pseudo-aléatoire 0..1 déterministe ; rendu seulement après montage
// pour que serveur et navigateur ne comparent jamais deux flottants différents.
function seeded01(index: number, salt: number): number {
  const x = Math.sin(index * 12.9898 + salt * 78.233 + 42.1234) * 43758.5453;
  return x - Math.floor(x);
}

const noSubscribe = () => () => {};

function ParticleField() {
  // Vrai côté navigateur, faux au rendu serveur : pas d'effet ni de second rendu.
  const ready = useSyncExternalStore(noSubscribe, () => true, () => false);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {ready &&
        Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-[#b8985a]/20 rounded-full"
            style={{
              left: `${(seeded01(i, 1) * 100).toFixed(2)}%`,
              top: `${(seeded01(i, 2) * 100).toFixed(2)}%`,
            }}
            animate={{ opacity: [0, 0.6, 0], scale: [0, 1.5, 0] }}
            transition={{
              duration: 3 + seeded01(i, 3) * 4,
              delay: seeded01(i, 4) * 3,
              repeat: Infinity,
              repeatDelay: seeded01(i, 5) * 5,
            }}
          />
        ))}
    </div>
  );
}

/**
 * Cadre commun de la page d'accueil et de la page Confidentialité : fond de
 * particules dorées, en-tête (logo + FR / EN), pied de page (Support,
 * Confidentialité).
 */
export function AppHomeShell({
  locale,
  dict,
  page,
  children,
}: {
  locale: Locale;
  dict: AppHomeDictionary;
  page: "home" | "privacy";
  children: React.ReactNode;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const footerLink =
    "text-[9px] text-gray-700 hover:text-[#b8985a] font-bold uppercase tracking-[0.12em] transition-colors";

  return (
    <div className="relative min-h-screen bg-[#080808] flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <NeuralBackground color="#B8985A" trailOpacity={0.12} particleCount={500} speed={0.7} />
      </div>

      <div
        className="absolute top-[-20%] right-[-10%] w-[50%] h-[60%] rounded-full pointer-events-none transition-transform duration-[2000ms]"
        style={{
          background: "radial-gradient(ellipse, rgba(184,152,90,0.06) 0%, transparent 70%)",
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[50%] rounded-full pointer-events-none transition-transform duration-[2000ms]"
        style={{
          background: "radial-gradient(ellipse, rgba(184,152,90,0.04) 0%, transparent 70%)",
          transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
        }}
      />
      <ParticleField />

      <header className="relative z-10 px-8 py-8 max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
        <Link href={appHomeHref(locale)} className="flex items-center gap-3">
          <Image src="/logo.png" alt="Patrimos.AI" width={36} height={36} priority />
          <Image src="/wordmark.png" alt="PATRIMOS.AI" width={140} height={32} className="opacity-80" priority />
        </Link>
        <div
          role="group"
          aria-label={dict.language}
          className="inline-flex items-center gap-0.5 rounded-full border border-white/[0.08] bg-white/[0.03] p-0.5"
        >
          {(["fr", "en"] as const).map((l) => {
            const active = l === locale;
            return (
              <Link
                key={l}
                href={appHomeHref(l, page)}
                aria-current={active ? "page" : undefined}
                hrefLang={l}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.12em] transition-colors ${
                  active ? "bg-[#b8985a] text-white" : "text-gray-500 hover:text-[#b8985a]"
                }`}
              >
                {l}
              </Link>
            );
          })}
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center px-6">{children}</main>

      <footer className="relative z-10 py-8 px-8 border-t border-white/[0.04]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Patrimos.AI" width={20} height={20} className="opacity-50" />
            <span className="text-[9px] text-gray-700 font-bold uppercase tracking-[0.15em]">
              {dict.copyright.replace("{year}", String(new Date().getFullYear()))}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-[#b8985a]/30" />
              <span className="text-[9px] text-gray-700 uppercase tracking-[0.12em] font-bold">{dict.ssl}</span>
            </div>
            {/* Formulaire de ticket de la plateforme, ouvert directement. */}
            <a href={appLoginUrl(locale, true)} className={footerLink}>
              {dict.support}
            </a>
            <Link href={appHomeHref(locale, "privacy")} className={footerLink}>
              {dict.privacy}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
