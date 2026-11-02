"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { appHomeHref, type AppHomeDictionary } from "@/lib/i18n/app-home";
import { AppHomeShell } from "./AppHomeShell";

/** Page Confidentialité : volontairement vide pour l'instant (contenu à venir). */
export function AppHomePrivacy({ locale, dict }: { locale: Locale; dict: AppHomeDictionary }) {
  return (
    <AppHomeShell locale={locale} dict={dict} page="privacy">
      <div className="flex-1 w-full max-w-3xl py-16 space-y-8">
        <h1 className="ah-serif text-3xl md:text-4xl text-white tracking-tight">{dict.privacy}</h1>
        <Link
          href={appHomeHref(locale)}
          className="inline-flex items-center gap-1.5 text-[10px] text-gray-600 hover:text-[#b8985a] font-bold uppercase tracking-[0.12em] transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          {dict.back}
        </Link>
      </div>
    </AppHomeShell>
  );
}
