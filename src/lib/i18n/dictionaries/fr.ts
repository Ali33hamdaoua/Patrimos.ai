/**
 * Dictionnaire FR — source de vérité du contenu (langue par défaut).
 *
 * Chaque section de la homepage ajoute sa clé ici au fur et à mesure qu'on la
 * construit. Le type `Dictionary` en est dérivé : EN devra fournir les mêmes
 * clés. On ne met aucun contenu fictif (chiffres, citations) — les zones non
 * confirmées restent en placeholder explicite côté composant.
 */
export const fr = {
  metadata: {
    title: "Patrimos.ai — L'inventaire de votre palace, en temps réel",
    description:
      "Patrimos.ai connecte chaque actif de votre établissement de luxe via la technologie RFID : visibilité totale, alertes en temps réel et inventaires automatisés.",
  },
  nav: {
    links: [
      { label: "Solution", href: "/#solution" },
      { label: "Application", href: "/application" },
      { label: "Fonctionnalités", href: "/#features" },
      { label: "Déploiement", href: "/#deployment" },
      { label: "Sécurité", href: "/#security" },
      { label: "À propos", href: "/a-propos" },
    ],
    cta: "Demander une démo",
  },
  hero: {
    h1: "L'inventaire de votre palace, en temps réel.",
    subtitle:
      "Patrimos.ai connecte chaque actif de votre établissement — du mobilier signature aux équipements techniques — via la technologie RFID, pour que rien ne disparaisse jamais sans laisser de trace.",
    ctaPrimary: "Demander une démo",
    ctaSecondary: "Voir la solution",
    reference:
      "Conçu pour les établissements de prestige. Déjà déployé dans des palaces 5 étoiles de référence au Maroc.",
  },
  heroAnimated: {
    prefix: "L'inventaire de votre palace, en temps réel — pour vos",
    words: [
      "mobiliers signature",
      "équipements techniques",
      "œuvres d'art",
      "objets précieux",
    ],
    ctaPrimary: "Demander une démo",
    ctaSecondary: "Voir la solution",
  },
  showcase: {
    overline: "VOTRE TABLEAU DE BORD",
    titleLine1: "Tout votre patrimoine,",
    titleLine2: "d'un seul coup d'œil.",
    subtitle:
      "Suivez chaque actif, chaque mouvement, chaque alerte en temps réel depuis une interface pensée pour les directions d'établissements de prestige.",
    placeholderText: "Capture du dashboard à venir.",
  },
  footer: {
    giant: "PATRIMOS.AI",
    tagline: "L'inventaire en temps réel des actifs de prestige.",
    columns: [
      {
        title: "Solution",
        links: [
          { label: "Fonctionnalités", href: "/#features" },
          { label: "Application mobile", href: "/#mobile-app" },
          { label: "Sécurité", href: "/#security" },
          { label: "Déploiement", href: "/#deployment" },
        ],
      },
      {
        title: "Entreprise",
        links: [
          { label: "À propos", href: "/a-propos" },
          { label: "Nobilis Digital Systems", href: "/a-propos" },
          { label: "Contact", href: "/#contact" },
        ],
      },
      {
        title: "Légal",
        links: [
          { label: "Mentions légales", href: "/mentions-legales" },
          { label: "Politique de confidentialité", href: "/confidentialite" },
          { label: "CGU", href: "/cgu" },
        ],
      },
    ],
    contact: {
      title: "Contact",
      email: "contact@nobilisds.com",
      // TODO footer: numéro de téléphone exact à fournir.
      phone: "+212 — — — — —",
      location: "Maroc",
    },
    social: {
      linkedinLabel: "LinkedIn",
      // TODO footer: URL LinkedIn officielle à fournir.
      linkedinHref: "https://www.linkedin.com/",
      emailLabel: "Email",
    },
    copyright: "© 2026 Nobilis Digital Systems. Tous droits réservés.",
    trademark: "Patrimos.ai est une marque de Nobilis Digital Systems.",
  },
  application: {
    hero: {
      overline: "L'APPLICATION & LE MATÉRIEL",
      titlePrefix: "PATRIMOS — vos équipes",
      titleWords: ["housekeeping", "maintenance", "sécurité", "terrain"],
      titleSuffix: " aux commandes.",
      subtitle:
        "L'application mobile qui transforme un scanner Zebra en outil de gestion. Pensée pour le terrain, conçue pour les palaces.",
    },
    video: {
      overline: "LE MATÉRIEL EN MAIN",
      title: "Un geste, un actif tracé.",
      description:
        "Le scanner Zebra TC22 lit chaque puce RFID en quelques millisecondes. Vos équipes balaient une chambre, tous les actifs marqués sont identifiés simultanément. Pas de saisie manuelle, pas de papier.",
      bullets: [
        "Lecture multi-tags simultanée",
        "Jusqu'à 200 actifs en moins de 2 minutes",
        "Synchronisation immédiate avec le dashboard",
      ],
    },
    hardware: {
      overline: "LE MATÉRIEL",
      title: "Robuste. Discret. Conçu pour l'usage intensif.",
      items: [
        {
          title: "Terminal Zebra TC22",
          description:
            "Scanner industriel, robuste et autonome. Lecture RFID longue portée, jusqu'à 200 actifs en moins de 2 minutes. Conçu pour résister à l'environnement hôtelier intensif.",
          bullets: [
            "Lecture RFID multi-tags simultanée",
            "Autonomie : usage intensif sur une journée complète",
            "Interface en français, prise en main en 15 minutes",
          ],
          images: ["/zebra.png", "/zebra1.png", "/zebra2.png"],
        },
        {
          title: "Puce RFID Patrimos",
          description:
            "Discrète, durable, sans batterie ni maintenance. Apposée sur chaque actif à tracer, elle assure une identification unique et un suivi à vie.",
          bullets: [
            "Sans batterie · sans maintenance",
            "Durable dans le temps, résistante aux conditions hôtelières",
            "Identification unique par actif",
          ],
          images: [
            "/tag.png",
            "/tagrfid2.png",
            "/tagrfid3.png",
            "/tagmetal.png",
            "/rouleautag.png",
          ],
        },
      ],
    },
    appCarousel: {
      overline: "L'APPLICATION MOBILE",
      title: "Patrimos au creux de la main.",
      subtitle:
        "Une interface pensée pour le terrain, claire, rapide, sans formation lourde.",
      // TODO captures: remplacer les 6 logos par les vrais screenshots de l'app.
      images: [
        { src: "/logo.png", alt: "Capture app — écran d'accueil" },
        { src: "/logo.png", alt: "Capture app — scan d'un actif" },
        { src: "/logo.png", alt: "Capture app — liste d'actifs" },
        { src: "/logo.png", alt: "Capture app — détail d'un actif" },
        { src: "/logo.png", alt: "Capture app — alertes" },
        { src: "/logo.png", alt: "Capture app — rapports" },
      ],
    },
    features: {
      overline: "CE QUE FAIT L'APP",
      title: "Conçue pour le terrain.",
      items: [
        {
          title: "Scan RFID multi-tags",
          description:
            "Scanner plusieurs actifs en un seul geste, en moins de 2 minutes.",
        },
        {
          title: "Fonctionne hors-ligne",
          description:
            "Vos équipes scannent même sans connexion. Synchronisation automatique dès le retour du réseau.",
        },
        {
          title: "Alertes en temps réel",
          description:
            "Objet manquant, déplacé, ou hors zone : notification immédiate sur le dashboard et l'app.",
        },
        {
          title: "Interface en français",
          description:
            "Conçue pour la prise en main en 15 minutes par vos équipes housekeeping, maintenance et sécurité.",
        },
        {
          title: "Synchronisation fluide",
          description:
            "Les données de l'app remontent instantanément vers le dashboard web. Aucune intervention manuelle.",
        },
      ],
    },
    ecosystem: {
      overline: "L'ÉCOSYSTÈME",
      title: "Une seule plateforme, deux interfaces.",
      subtitle:
        "Vos équipes terrain et votre direction travaillent sur le même flux de données, en temps réel.",
      mobileLabel: "App mobile",
      dashboardLabel: "Dashboard web",
    },
    finalCta: {
      title: "Voir Patrimos en condition réelle.",
      subtitle: "30 minutes en visio avec notre équipe.",
      cta: "Demander une démo",
    },
  },
  faq: {
    overline: "QUESTIONS FRÉQUENTES",
    title: "Tout ce que vous devez savoir.",
    items: [
      {
        question: "Combien de temps prend le déploiement ?",
        answer:
          "Environ cinq semaines, de l'audit initial à la mise en service, sans interruption de votre activité. Le marquage RFID est réalisé en horaires creux.",
      },
      {
        question: "Faut-il remplacer notre matériel existant ?",
        answer:
          "Non. Patrimos s'appuie sur des terminaux Zebra standards et des puces RFID posées sur vos actifs existants. Aucune refonte de votre infrastructure n'est nécessaire.",
      },
      {
        question: "Nos équipes vont-elles devoir être formées longtemps ?",
        answer:
          "Non. L'application est conçue pour être prise en main en quelques minutes. Nous formons vos équipes housekeeping, maintenance et sécurité en sessions courtes de 15 à 30 minutes.",
      },
      {
        question: "Où sont hébergées nos données ?",
        answer:
          "Au choix : sur une infrastructure souveraine au Maroc (N+One), garantissant que vos données ne quittent pas le territoire, ou sur cloud international (AWS) pour les groupes qui le préfèrent.",
      },
      {
        question: "Patrimos fonctionne-t-il sans connexion internet ?",
        answer:
          "L'application mobile continue de fonctionner sur le terrain et synchronise les données avec le tableau de bord dès que la connexion est rétablie.",
      },
      {
        question: "Quel type d'établissement peut utiliser Patrimos ?",
        answer:
          "Patrimos est conçu pour les établissements de prestige : palaces, hôtels 5 étoiles, resorts et résidences de luxe qui gèrent un patrimoine d'actifs de valeur.",
      },
    ],
    closing: "Une autre question ? Notre équipe vous répond directement.",
    cta: "Nous contacter",
  },
  security: {
    overline: "SÉCURITÉ & SOUVERAINETÉ",
    title: "Vos données restent les vôtres.",
    subtitle:
      "Un hébergement souverain, des accès maîtrisés, une transparence totale sur le traitement de vos données.",
    pillars: [
      {
        title: "Hébergement souverain, au Maroc ou ailleurs",
        text: "Vos données peuvent être hébergées au Maroc, sur une infrastructure locale (N+One), garantissant qu'elles ne quittent pas le territoire. Pour les groupes internationaux, un hébergement sur cloud international (AWS) est également disponible. Le choix vous appartient.",
      },
      {
        title: "Communications sécurisées",
        text: "Toutes les communications entre vos terminaux, l'application et la plateforme sont chiffrées. L'accès à votre tableau de bord est protégé et réservé aux personnes que vous autorisez.",
      },
      {
        title: "Transparence et contrôle",
        text: "Vos données ne servent qu'à votre service. Elles ne sont ni revendues ni partagées. Vous gardez la maîtrise de qui accède à quoi, et vous pouvez en demander l'export ou la suppression.",
      },
    ],
    closing:
      "Une question précise sur la sécurité ou la conformité de vos données ? Notre équipe technique y répond directement.",
    cta: "Poser une question",
  },
  contact: {
    overline: "CONTACT",
    title:
      "Voyons ensemble comment Patrimos peut servir votre établissement.",
    subtitle:
      "30 minutes en visioconférence avec notre équipe. Nous étudions vos besoins, nous vous montrons la plateforme en conditions réelles, nous vous remettons une proposition adaptée.",
    bullets: [
      "Démo personnalisée selon vos types d'actifs",
      "Étude technique de votre établissement",
      "Devis transparent sous 5 jours ouvrés",
    ],
    coordinates: {
      company: "Nobilis Digital Systems",
      email: "contact@nobilisds.com",
      location: "Maroc",
    },
    form: {
      nameLabel: "Nom complet",
      roleLabel: "Fonction",
      establishmentLabel: "Établissement / Groupe hôtelier",
      emailLabel: "Email professionnel",
      phoneLabel: "Téléphone",
      roomsLabel: "Nombre de chambres",
      roomsPlaceholder: "Sélectionner",
      roomsOptions: [
        { value: "<50", label: "Moins de 50" },
        { value: "50-150", label: "50 à 150" },
        { value: "150-300", label: "150 à 300" },
        { value: "300+", label: "Plus de 300" },
      ],
      messageLabel: "Message",
      messagePlaceholder: "Quelques mots sur votre besoin (facultatif)",
      submit: "Demander ma démo",
      submitting: "Envoi…",
      success:
        "Merci, votre demande est envoyée. Nous vous recontactons sous 48 heures ouvrées.",
      error:
        "Impossible d'envoyer la demande. Réessayez ou écrivez-nous à contact@nobilisds.com.",
      consent:
        "En soumettant ce formulaire, vous acceptez que vos données soient utilisées par Nobilis Digital Systems pour vous recontacter.",
      requiredField: "Tous les champs obligatoires doivent être remplis.",
      invalidEmail: "Adresse email invalide.",
    },
  },
  deployment: {
    overline: "LE DÉPLOIEMENT",
    titlePre: "Opérationnel en",
    titleAccent: "cinq semaines.",
    subtitle:
      "Un déploiement encadré, sans interruption de votre activité. De l'audit initial à la mise en service, notre équipe vous accompagne à chaque étape.",
    steps: [
      {
        timing: "Semaine 1",
        title: "Audit",
        description:
          "Visite de votre établissement, inventaire des actifs à tracer, définition des zones et des alertes.",
      },
      {
        timing: "Semaines 2-3",
        title: "Marquage RFID",
        description:
          "Pose des puces RFID par notre équipe. Aucune interruption de votre activité : travail effectué en horaires creux.",
      },
      {
        timing: "Semaine 4",
        title: "Formation",
        description:
          "Formation des équipes housekeeping, maintenance et sécurité. Sessions de 15 à 30 minutes par groupe.",
      },
      {
        timing: "Semaine 5",
        title: "Mise en service",
        description:
          "Activation du dashboard, premier inventaire automatisé, accompagnement permanent pendant 30 jours.",
      },
    ],
    cta: "Planifier votre déploiement",
  },
  features: {
    overline: "LA PLATEFORME",
    titleLine1Pre: "Une plateforme ",
    titleLine1Accent: "complète",
    titleLine2: "pour vos actifs de prestige.",
    subtitle:
      "Du dashboard centralisé à l'application mobile sur scanner Zebra, en passant par le marquage RFID terrain — découvrez Patrimos.ai en action.",
    ctaPrimary: "Demander une démo",
    ctaSecondary: "Voir l'application",
  },
  mobileApp: {
    overline: "L'APPLICATION & LE MATÉRIEL",
    titlePre: "PATRIMOS —",
    titleAccent: "votre staff aux commandes.",
    subtitle:
      "L'application mobile qui transforme un scanner Zebra en outil de gestion d'actifs intelligent, connecté en permanence à votre tableau de bord.",
    products: [
      {
        id: "tc22",
        label: "Terminal TC22",
        title: "Le scanner sur le terrain",
        description:
          "Le terminal Zebra TC22 équipé de l'application PATRIMOS. Vos équipes scannent les actifs en quelques secondes, avec une synchronisation en temps réel vers le tableau de bord. Robuste, ergonomique, conçu pour un usage intensif en établissement.",
        image: "/ScannerApplication.png",
        connectionStatus: "Synchronisé",
        features: [
          // TODO: valeur à valider — performance annoncée.
          { label: "Vitesse de scan", value: 95 },
          // TODO: valeur à valider — autonomie annoncée par Zebra.
          { label: "Autonomie", value: 88 },
        ],
        footer: "Usage intensif",
      },
      {
        id: "tag",
        label: "Puce RFID",
        title: "Le marqueur invisible",
        description:
          "Une puce RFID passive, discrète et durable, apposée sur chaque actif de valeur. Sans batterie, sans maintenance, elle identifie l'objet de manière unique et permet son suivi tout au long de sa vie dans l'établissement.",
        image: "/TAGRFID.png",
        connectionStatus: "Passive · sans batterie",
        features: [
          // TODO: valeur à valider — durée de vie annoncée du tag.
          { label: "Durabilité", value: 98 },
          // TODO: valeur à valider — visibilité du tag posé.
          { label: "Discrétion", value: 92 },
        ],
        footer: "Sans batterie · sans maintenance",
      },
    ],
    benefits: [
      "Connexion native aux scanners Zebra (TC22, TC27, MC3300+)",
      "Scan d'une chambre en moins de 2 minutes",
      "Mode hors-ligne : scannez sans réseau, synchronisez plus tard",
      "Formation < 15 min par employé",
    ],
    detailsCta: "Découvrir l'application en détail",
  },
  whyPatrimos: {
    overline: "POURQUOI PATRIMOS",
    titlePre: "Conçu pour les problèmes que",
    titleAccent: "vous connaissez déjà.",
    pillars: [
      {
        title: "Visibilité totale",
        problem:
          "Vous découvrez la disparition d'un actif lors de l'inventaire annuel. Trop tard pour agir.",
        response: {
          text: "Patrimos vous alerte dès qu'un actif quitte une zone autorisée.",
          accent: " En temps réel, sur mobile, par email.",
        },
      },
      {
        title: "Adoption terrain",
        problem:
          "Vos équipes housekeeping et maintenance n'utiliseront pas un logiciel complexe. Vous le savez.",
        response: {
          text: "L'app PATRIMOS fonctionne comme un scanner de supermarché : on pointe, on scanne, c'est fini.",
          accent: " Formation de 15 minutes par employé.",
        },
      },
      {
        title: "Conformité & reporting",
        problem:
          "Vos audits comptables exigent un inventaire physique vérifiable. Le préparer prend trois semaines.",
        response: {
          text: "Tous vos rapports d'inventaire, mouvements et alertes générés automatiquement, exportables en PDF ou Excel.",
          accent: " Conformes aux exigences comptables.",
        },
      },
    ],
  },
  whatIsPatrimos: {
    overline: "LA SOLUTION",
    titlePre: "Une plateforme. Trois éléments.",
    titleAccent: "Zéro perte.",
    description:
      "Patrimos.ai est une plateforme de gestion d'actifs par identification RFID, conçue exclusivement pour les établissements hôteliers de luxe. Chaque objet de valeur est marqué d'une puce passive, scanné par vos équipes via un terminal Zebra connecté à notre application mobile, et synchronisé en temps réel avec votre tableau de bord centralisé.",
    steps: [
      { title: "Puce RFID", subtitle: "Marquer chaque actif" },
      { title: "App mobile + Zebra", subtitle: "Scanner sur place" },
      { title: "Dashboard Patrimos", subtitle: "Voir, alerter, décider" },
    ],
  },
  stats: {
    overline: "PATRIMOS EN CHIFFRES",
    items: [
      // TODO: chiffre à valider — caractéristique produit, pas résultat mesuré.
      { value: "100%", label: "Des actifs critiques tracés en temps réel" },
      // TODO: chiffre à valider — temps de scan annoncé, à confirmer en conditions réelles.
      {
        value: "< 2 min",
        label:
          "Pour scanner une chambre complète avec un terminal Zebra",
      },
      // TODO: chiffre à valider — disponibilité affichée, à confirmer côté infra.
      { value: "24/7", label: "Surveillance et alertes automatiques" },
      // TODO: chiffre à valider — promesse de synchro, à confirmer (latence < x ms).
      {
        value: "Temps réel",
        label: "Synchronisation entre l'app mobile et le dashboard",
      },
    ],
  },
} as const;

export type Dictionary = typeof fr;
