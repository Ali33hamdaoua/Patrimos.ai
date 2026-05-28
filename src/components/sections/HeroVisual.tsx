/**
 * Placeholder du mockup dashboard (Hero).
 *
 * Cadre sombre, accents or, formes abstraites volontairement neutres : aucun
 * chiffre ni donnée fictive, c'est un aperçu d'interface. À remplacer par un
 * vrai screenshot du dashboard une fois fourni.
 */
export function HeroVisual() {
  return (
    <div
      role="img"
      aria-label="Aperçu du tableau de bord Patrimos.ai"
      className="relative w-full max-w-xl"
    >
      {/* Halo or diffus derrière l'écran */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-3xl bg-gold/5 blur-2xl"
      />

      <div className="overflow-hidden rounded-xl border border-line bg-surface-elevated shadow-2xl shadow-black/50">
        {/* Barre de fenêtre */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-tertiary/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-tertiary/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-tertiary/30" />
          <span className="ml-3 h-3 w-40 rounded-sm bg-white/5" />
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="hidden w-32 flex-col gap-3 border-r border-line p-4 sm:flex">
            <span className="h-2.5 w-full rounded-sm bg-gold/70" />
            <span className="h-2.5 w-4/5 rounded-sm bg-white/5" />
            <span className="h-2.5 w-3/4 rounded-sm bg-white/5" />
            <span className="h-2.5 w-4/5 rounded-sm bg-white/5" />
            <span className="mt-2 h-2.5 w-2/3 rounded-sm bg-white/5" />
          </div>

          {/* Contenu */}
          <div className="flex-1 p-5">
            {/* Cartes stats */}
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="rounded-lg border border-line p-3"
                >
                  <span className="block h-1.5 w-8 rounded-sm bg-gold/60" />
                  <span className="mt-3 block h-3 w-12 rounded-sm bg-white/10" />
                </div>
              ))}
            </div>

            {/* Zone graphique abstraite */}
            <div className="mt-4 rounded-lg border border-line p-4">
              <svg
                viewBox="0 0 300 100"
                className="h-28 w-full"
                fill="none"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9A55C" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#C9A55C" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 80 L40 64 L80 70 L120 46 L160 52 L200 30 L240 38 L300 18 L300 100 L0 100 Z"
                  fill="url(#heroArea)"
                />
                <path
                  d="M0 80 L40 64 L80 70 L120 46 L160 52 L200 30 L240 38 L300 18"
                  stroke="#C9A55C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Lignes de tableau */}
            <div className="mt-4 flex flex-col gap-2.5">
              {[0, 1, 2].map((index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-gold/50" />
                  <span className="h-2.5 flex-1 rounded-sm bg-white/[0.06]" />
                  <span className="h-2.5 w-12 rounded-sm bg-white/[0.04]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
