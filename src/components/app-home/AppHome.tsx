"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, BarChart3, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { appLoginUrl, type AppHomeDictionary } from "@/lib/i18n/app-home";
import { AppHomeShell } from "./AppHomeShell";

function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  decimals = 0,
  locale,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  /** Séparateurs de la langue affichée (0,02 / 0.02). */
  locale: Locale;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) =>
    decimals > 0
      ? v.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : Math.round(v).toLocaleString(locale),
  );

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, value, { duration, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [isInView, value, duration, motionVal]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${v}${suffix}`;
    });
    return unsub;
  }, [rounded, prefix, suffix]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Page d'accueil de la plateforme, servie sur la racine de patrimos.ai.
 * Reprise de l'ancienne page d'accueil d'app.patrimos.ai ; un seul appel à
 * l'action, « Se connecter », vers la connexion de la plateforme.
 */
export function AppHome({ locale, dict }: { locale: Locale; dict: AppHomeDictionary }) {
  const metrics = [
    { value: 150, prefix: "+", suffix: "", label: dict.metrics.tags, decimals: 0 },
    { value: 99.9, prefix: "", suffix: "%", label: dict.metrics.accuracy, decimals: 1 },
    { value: 0.02, prefix: "", suffix: "s", label: dict.metrics.latency, decimals: 2 },
  ];
  const features = [
    { icon: ShieldCheck, title: dict.features.securityTitle, desc: dict.features.securityDesc },
    { icon: BarChart3, title: dict.features.aiTitle, desc: dict.features.aiDesc },
    { icon: Zap, title: dict.features.liveTitle, desc: dict.features.liveDesc },
  ];

  return (
    <AppHomeShell locale={locale} dict={dict} page="home">
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#b8985a]/[0.08] border border-[#b8985a]/15 px-5 py-2 rounded-full"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#b8985a]" />
            <span className="text-[10px] font-bold text-[#b8985a] uppercase tracking-[0.2em]">{dict.badge}</span>
          </motion.div>

          <h1 className="ah-serif text-4xl sm:text-5xl md:text-7xl text-white tracking-tight leading-[1.08]">
            {dict.titleLine1}
            <br />
            <span className="text-[#b8985a] italic">{dict.titleLine2}</span>
          </h1>

          <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">{dict.subtitle}</p>

          <div className="flex items-center justify-center pt-4">
            <motion.a
              href={appLoginUrl(locale)}
              whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(184,152,90,0.25)" }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#b8985a] text-white px-10 py-4 rounded-xl font-bold text-[11px] tracking-[0.2em] uppercase shadow-[0_4px_30px_rgba(184,152,90,0.2)] transition-all flex items-center gap-2.5 group"
            >
              {dict.login}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </div>

      <Reveal className="w-full max-w-4xl mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06]">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="bg-[#0c0c0d] px-8 py-10 text-center group hover:bg-[#0f0f10] transition-colors duration-500"
            >
              <div className="ah-serif text-4xl md:text-5xl text-white mb-3 tabular-nums">
                <AnimatedNumber
                  value={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  duration={2 + i * 0.3}
                  decimals={m.decimals}
                  locale={locale}
                />
              </div>
              <p className="text-[9px] text-gray-600 uppercase tracking-[0.2em] font-bold group-hover:text-gray-500 transition-colors">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="w-full max-w-5xl mb-24">
        <Reveal className="text-center mb-12">
          <p className="text-[10px] text-[#b8985a] uppercase tracking-[0.3em] font-bold mb-3">{dict.architecture}</p>
          <h2 className="ah-serif text-2xl md:text-3xl text-white tracking-tight">{dict.architectureTitle}</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <Reveal key={feat.title} delay={i * 0.1}>
              <div className="group bg-[#0c0c0d] border border-white/[0.05] rounded-2xl p-8 hover:border-[#b8985a]/20 transition-all duration-500 h-full">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-6 group-hover:bg-[#b8985a]/10 group-hover:border-[#b8985a]/20 transition-all duration-500">
                  <feat.icon className="w-5 h-5 text-[#b8985a]" />
                </div>
                <h3 className="ah-serif text-white text-lg mb-3">{feat.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed group-hover:text-gray-500 transition-colors duration-500">
                  {feat.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="w-full max-w-3xl mb-24">
        <div className="relative bg-[#0c0c0d] border border-white/[0.05] rounded-2xl p-10 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#b8985a]/[0.03] to-transparent pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[10px] text-[#b8985a] uppercase tracking-[0.3em] font-bold mb-4">{dict.infrastructure}</p>
            <h2 className="ah-serif text-xl md:text-2xl text-white mb-4">
              {dict.infraTitle1}
              <br />
              <span className="text-[#b8985a] italic">{dict.infraTitle2}</span>
            </h2>
            <p className="text-xs text-gray-600 max-w-lg mx-auto leading-relaxed">{dict.infraDesc}</p>
          </div>
        </div>
      </Reveal>
    </AppHomeShell>
  );
}
