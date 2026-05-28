"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";
import {
  Battery,
  EyeOff,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * SpatialProductShowcase — showcase produit à 2 entrées avec switcher.
 *
 * Adaptations Patrimos (la mécanique de la source est préservée, seul le
 * thème et le placement changent) :
 *   - Repeint intégralement en or antique #C9A55C (gradients, glow, anneaux,
 *     barres, switcher actif). Plus aucune référence à bleu/vert/Bluetooth.
 *   - Switcher passé de `fixed bottom-12` à un placement en flux centré
 *     sous le visuel (compatible homepage à 12 sections).
 *   - Background gradient passé de `fixed` à `absolute` (contenu dans la
 *     section parente, pas globalement appliqué).
 *   - Plus de min-h-screen : la hauteur est dictée par le contenu.
 *   - "% batterie" remplacé par une ligne `footer` libre (les puces RFID
 *     n'ont pas de batterie).
 */

export type SpatialProduct = {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly connectionStatus: string;
  readonly features: ReadonlyArray<{ readonly label: string; readonly value: number }>;
  readonly footer: string;
};

// Mapping label de feature → icône Lucide. Les libellés viennent du
// dictionnaire FR ; étendre cette map si de nouvelles features arrivent.
const featureIcons: Record<string, LucideIcon> = {
  "Vitesse de scan": Zap,
  Autonomie: Battery,
  Durabilité: ShieldCheck,
  Discrétion: EyeOff,
};

/* -------------------------------------------------------------------------- */
/*  Variants Framer Motion                                                    */
/* -------------------------------------------------------------------------- */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
  exit: { opacity: 0, y: -10, filter: "blur(5px)" },
};

const imageVariants = (isLeft: boolean): Variants => ({
  initial: {
    opacity: 0,
    scale: 1.5,
    filter: "blur(15px)",
    rotate: isLeft ? -30 : 30,
    x: isLeft ? -80 : 80,
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    rotate: 0,
    x: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
  exit: {
    opacity: 0,
    scale: 0.6,
    filter: "blur(20px)",
    transition: { duration: 0.25 },
  },
});

/* -------------------------------------------------------------------------- */
/*  Sous-composants                                                           */
/* -------------------------------------------------------------------------- */

const SectionBackgroundGradient = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0">
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(201, 165, 92, 0.10), transparent 60%)",
      }}
    />
  </div>
);

const ProductVisual = ({
  product,
  isLeft,
}: {
  product: SpatialProduct;
  isLeft: boolean;
}) => (
  <motion.div layout="position" className="relative shrink-0">
    {/* Anneau pointillé qui tourne lentement */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute inset-[-20%] rounded-full border border-dashed border-[#C9A55C]/40"
    />
    {/* Halo or qui respire */}
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 rounded-full bg-gradient-to-br from-[#C9A55C]/40 to-[#07111F] opacity-40 blur-2xl"
    />

    {/* Cercle conteneur */}
    <div className="relative flex h-80 w-80 items-center justify-center overflow-hidden rounded-full border border-white/5 bg-black/20 shadow-2xl backdrop-blur-sm md:h-[450px] md:w-[450px]">
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="relative z-10 flex h-full w-full items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={product.id}
            src={product.image}
            alt={product.title}
            variants={imageVariants(isLeft)}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full w-full object-contain p-4 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            draggable={false}
          />
        </AnimatePresence>
      </motion.div>
    </div>

    {/* Pastille de statut */}
    <motion.div
      layout="position"
      className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
    >
      <div className="flex items-center gap-2 rounded-full border border-[#C9A55C]/20 bg-surface/80 px-4 py-2 text-xs uppercase tracking-widest text-ink-secondary backdrop-blur">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C9A55C]" />
        {product.connectionStatus}
      </div>
    </motion.div>
  </motion.div>
);

const ProductDetails = ({
  product,
  isLeft,
}: {
  product: SpatialProduct;
  isLeft: boolean;
}) => {
  const alignClass = isLeft ? "items-start text-left" : "items-end text-right";
  const flexDirClass = isLeft ? "flex-row" : "flex-row-reverse";
  const barPosClass = isLeft ? "left-0" : "right-0";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex flex-col ${alignClass}`}
    >
      <motion.h3
        variants={itemVariants}
        className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-gold/80"
      >
        {product.label}
      </motion.h3>
      <motion.h2
        variants={itemVariants}
        className="mb-3 font-serif text-3xl leading-tight text-ink-primary md:text-4xl"
      >
        {product.title}
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className={`mb-8 max-w-sm text-sm leading-relaxed text-ink-secondary ${isLeft ? "mr-auto" : "ml-auto"}`}
      >
        {product.description}
      </motion.p>

      {/* Panneau de specs */}
      <motion.div
        variants={itemVariants}
        className="w-full space-y-6 rounded-2xl border border-[#C9A55C]/20 bg-[#0D1524]/60 p-6 backdrop-blur-sm"
      >
        {product.features.map((feature, idx) => {
          const Icon = featureIcons[feature.label];
          return (
            <div key={feature.label}>
              <div
                className={`mb-3 flex items-center justify-between text-sm ${flexDirClass}`}
              >
                <div className="flex items-center gap-2 text-ink-primary">
                  {Icon && <Icon size={16} aria-hidden="true" />}
                  <span>{feature.label}</span>
                </div>
                <span className="font-mono text-xs text-ink-tertiary">
                  {feature.value}%
                </span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${feature.value}%` }}
                  transition={{ duration: 1, delay: 0.4 + idx * 0.15 }}
                  className={`absolute top-0 bottom-0 ${barPosClass} bg-[#C9A55C] opacity-80`}
                />
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Ligne neutre en bas (remplace le % de batterie d'origine) */}
      <motion.p
        variants={itemVariants}
        className={`mt-6 text-sm text-ink-tertiary ${isLeft ? "text-left" : "text-right"}`}
      >
        {product.footer}
      </motion.p>
    </motion.div>
  );
};

const Switcher = ({
  activeId,
  options,
  onToggle,
}: {
  activeId: string;
  options: ReadonlyArray<{ id: string; label: string }>;
  onToggle: (id: string) => void;
}) => {
  return (
    <div className="mt-16 flex justify-center md:mt-20">
      <motion.div
        layout
        className="flex items-center gap-1 rounded-full border border-[#C9A55C]/20 bg-[#0D1524]/80 p-1.5 shadow-2xl backdrop-blur-2xl"
      >
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            type="button"
            onClick={() => onToggle(opt.id)}
            whileTap={{ scale: 0.96 }}
            className="relative flex h-12 items-center justify-center rounded-full px-6 text-sm font-medium focus:outline-none"
          >
            {activeId === opt.id && (
              <motion.div
                layoutId="patrimos-mobileapp-switcher-active"
                className="absolute inset-0 rounded-full bg-gradient-to-b from-[#C9A55C]/15 to-[#C9A55C]/5"
                style={{ boxShadow: "inset 0 1px 0 rgba(201, 165, 92, 0.3)" }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors duration-300 ${
                activeId === opt.id
                  ? "text-gold"
                  : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              {opt.label}
            </span>
            {activeId === opt.id && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -bottom-1 h-1 w-6 rounded-full bg-gradient-to-r from-transparent via-[#C9A55C] to-transparent"
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Composant principal                                                       */
/* -------------------------------------------------------------------------- */

export function SpatialProductShowcase({
  products,
}: {
  products: ReadonlyArray<SpatialProduct>;
}) {
  const [activeId, setActiveId] = useState<string>(products[0].id);
  const current = products.find((p) => p.id === activeId) ?? products[0];
  // Premier produit → visuel à gauche, texte à droite. Switch → miroir.
  const isLeft = products[0].id === current.id;
  const options = products.map((p) => ({ id: p.id, label: p.label }));

  return (
    <div className="relative">
      <SectionBackgroundGradient />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          layout
          transition={{ type: "spring", bounce: 0, duration: 0.9 }}
          className={`flex w-full flex-col items-center justify-center gap-16 md:gap-24 lg:gap-32 ${
            isLeft ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <ProductVisual product={current} isLeft={isLeft} />

          <motion.div layout="position" className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <ProductDetails
                key={current.id}
                product={current}
                isLeft={isLeft}
              />
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <Switcher
          activeId={activeId}
          options={options}
          onToggle={setActiveId}
        />
      </div>
    </div>
  );
}
