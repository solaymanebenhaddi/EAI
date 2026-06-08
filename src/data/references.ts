import type { Locale } from '@/data/site';

export type ReferenceCategory =
  | 'all'
  | 'residential'
  | 'agricultural'
  | 'agroIndustrial'
  | 'studies'
  | 'training';

export interface ReferenceFact {
  label: string;
  value: string;
}

export interface ReferenceProject {
  slug: string;
  title: string;
  location: string;
  category: Exclude<ReferenceCategory, 'all'>;
  categoryLabel: string;
  type: string;
  image?: string;
  alt: string;
  description: string;
  facts: ReferenceFact[];
  missions: string[];
  missingImageNote?: string;
}

export interface ReferenceFilter {
  key: ReferenceCategory;
  label: string;
}

export interface ReferencePageContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  sourceLabel: string;
  filters: ReferenceFilter[];
  factsTitle: string;
  missionsTitle: string;
  ctaLabel: string;
  missingImageLabel: string;
  projects: ReferenceProject[];
}

const filters: ReferenceFilter[] = [
  { key: 'all', label: 'Tous' },
  { key: 'residential', label: 'Résidentiel' },
  { key: 'agricultural', label: 'Agricole' },
  { key: 'agroIndustrial', label: 'Agro-industriel' },
  { key: 'studies', label: 'Études & suivi' },
  { key: 'training', label: 'Formation' },
];

const projects: ReferenceProject[] = [
  {
    slug: 'residence-casablanca',
    title: 'Construction d’une résidence — Casablanca',
    location: 'Casablanca',
    category: 'residential',
    categoryLabel: 'Résidentiel',
    type: 'Résidence / bâtiment résidentiel',
    image: '/images/references/residence-casablanca.png',
    alt: 'Bâtiment résidentiel contemporain à Casablanca avec façades en pierre, balcons et rez-de-chaussée actif.',
    description:
      'Projet de construction d’une résidence privée à Casablanca, avec accompagnement des études, du suivi de chantier et des aménagements intérieurs et extérieurs.',
    facts: [
      { label: 'Client', value: 'Privé' },
      { label: 'Surface habitable', value: '400 m²' },
      { label: 'Délai', value: '8 mois' },
    ],
    missions: [
      'Études architecturales et techniques',
      'Suivi des travaux',
      'Aménagements extérieurs',
      'Aménagements intérieurs',
    ],
  },
  {
    slug: 'parking-ferme-agadir',
    title: 'Aménagement des différents parkings d’une ferme — Agadir',
    location: 'Agadir',
    category: 'agricultural',
    categoryLabel: 'Agricole',
    type: 'Aménagement de site agricole',
    image: '/images/references/parking-ferme-agadir.png',
    alt: 'Parkings agricoles aménagés avec ombrières, circulations techniques et intégration paysagère à Agadir.',
    description:
      'Mission d’aménagement de parkings pour une ferme, pensée pour les usages agricoles, les circulations, la performance des équipements et l’optimisation jusqu’à réception.',
    facts: [
      { label: 'Site', value: 'Ferme agricole' },
      { label: 'Mission', value: 'Études, conception 3D et suivi' },
      { label: 'Approche', value: 'Technique, économique et durable' },
    ],
    missions: [
      'Analyse des besoins spécifiques du site',
      'Études techniques et financières',
      'Adaptation aux pratiques agricoles',
      'Conception 3D des aménagements',
      'Assistance au choix des équipements écoénergétiques',
      'Recommandation des matériaux et fournisseurs',
      'Visites régulières de chantier',
      'Optimisation du projet jusqu’à la réception finale',
    ],
  },
  {
    slug: 'residence-marrakech',
    title: 'Construction d’une résidence — Marrakech',
    location: 'Marrakech',
    category: 'residential',
    categoryLabel: 'Résidentiel',
    type: 'Résidence / bâtiment résidentiel',
    image: '/images/references/residence-marrakech.png',
    alt: 'Résidence collective contemporaine à Marrakech avec façades minérales, balcons et jardin d’entrée.',
    description:
      'Projet de construction d’une résidence privée à Marrakech, avec études, suivi des travaux et coordination des aménagements intérieurs et extérieurs.',
    facts: [
      { label: 'Client', value: 'Privé' },
      { label: 'Usage', value: 'Résidentiel' },
      { label: 'Surface habitable', value: '550 m²' },
      { label: 'Délai', value: '18 mois' },
    ],
    missions: [
      'Études',
      'Suivi des travaux',
      'Aménagements extérieurs',
      'Aménagements intérieurs',
    ],
  },
  {
    slug: 'serre-agricole-ben-guerir',
    title: 'Projet de serre agricole — Ben Guérir',
    location: 'Ben Guérir',
    category: 'agroIndustrial',
    categoryLabel: 'Agro-industriel',
    type: 'Infrastructure agricole technique',
    image: '/images/references/serre-agricole-ben-guerir.png',
    alt: 'Projet de serre agricole à Ben Guérir avec grandes serres, zones techniques, voiries internes et bâtiment administratif.',
    description:
      'Projet d’infrastructure agricole technique intégrant hygiène, sécurité, stockage, gestion environnementale des déchets et optimisation des flux opérationnels.',
    facts: [
      { label: 'Localisation', value: 'Ben Guérir' },
      { label: 'Nature', value: 'Serre agricole / infrastructure technique' },
      { label: 'Mission', value: 'Conception fonctionnelle et réglementaire' },
    ],
    missions: [
      'Conception respectant les normes d’hygiène et de sécurité',
      'Organisation des zones de réception, chambres froides et espaces de stockage',
      'Intégration d’un système de gestion des déchets respectueux de l’environnement',
      'Aménagement fonctionnel pour optimiser le flux des opérations',
      'Respect des réglementations locales et internationales',
    ],
  },
  {
    slug: 'abattoir-alf-sahel',
    title: 'Projet d’abattoir Alf Sahel',
    location: 'Maroc',
    category: 'agroIndustrial',
    categoryLabel: 'Agro-industriel',
    type: 'Abattoir moderne / infrastructure agro-industrielle',
    image: '/images/references/abattoir-alf-sahel.png',
    alt: 'Infrastructure agro-industrielle moderne pour le projet d’abattoir Alf Sahel avec zones logistiques et réception.',
    description:
      'Conception d’un abattoir moderne répondant aux standards internationaux, avec organisation des flux, zones spécialisées et exigences sanitaires renforcées.',
    facts: [
      { label: 'Programme', value: 'Abattoir moderne' },
      { label: 'Standards', value: 'Hygiène, sécurité et traçabilité' },
      { label: 'Approche', value: 'Flux, conformité et distribution' },
    ],
    missions: [
      'Conception d’un abattoir répondant aux standards internationaux',
      'Zones dédiées à la réception des animaux, l’abattage, le froid, la découpe et le conditionnement',
      'Système de gestion des déchets écoresponsable',
      'Flux opérationnel optimisé pour hygiène, sécurité et efficacité',
      'Infrastructures adaptées au bien-être animal',
      'Conformité aux réglementations sanitaires',
      'Localisation pensée pour faciliter la distribution régionale',
    ],
  },
  {
    slug: 'elevage-had-soualem',
    title: 'Projet d’élevage Had Soualem',
    location: 'Had Soualem',
    category: 'agricultural',
    categoryLabel: 'Agricole',
    type: 'Ferme d’élevage moderne',
    image: '/images/references/elevage-had-soualem.png',
    alt: 'Ferme d’élevage moderne à Had Soualem avec bâtiments agricoles, zones animales et aménagements paysagers.',
    description:
      'Projet de ferme d’élevage moderne combinant bâtiments adaptés, espaces de soins, systèmes environnementaux et intégration paysagère en contexte rural.',
    facts: [
      { label: 'Localisation', value: 'Had Soualem' },
      { label: 'Programme', value: 'Élevage bovin, ovin ou avicole' },
      { label: 'Objectif', value: 'Production durable et rendement local' },
    ],
    missions: [
      'Conception d’une ferme d’élevage moderne',
      'Infrastructures adaptées pour bovins, ovins ou volailles',
      'Espaces optimisés pour hébergement, alimentation et soins vétérinaires',
      'Gestion de l’eau et des déchets respectueuse de l’environnement',
      'Aménagement paysager intégré au contexte rural',
      'Recherche d’une production durable et d’un meilleur rendement agricole local',
    ],
  },
  {
    slug: 'ouled-saleh-etudes-suivi',
    title: 'Études, conception et suivi des travaux — Ouled Saleh',
    location: 'Ouled Saleh',
    category: 'studies',
    categoryLabel: 'Études & suivi',
    type: 'Mission architecturale, technique, administrative et chantier',
    image: '/images/references/ouled-saleh-etudes-suivi.png',
    alt: 'Projet à Ouled Saleh avec équipe technique consultant des plans sur site devant une architecture contemporaine.',
    description:
      'Mission complète d’étude, de conception, d’ingénierie, de suivi administratif et de gestion de chantier pour structurer le projet de manière cohérente.',
    facts: [
      { label: 'Localisation', value: 'Ouled Saleh' },
      { label: 'Mission', value: 'Études, conception et suivi' },
      { label: 'Pilotage', value: 'Délais, budget et qualité' },
    ],
    missions: [
      'Études préliminaires des besoins, de la faisabilité et des contraintes',
      'Conception architecturale adaptée au site et au client',
      'Ingénierie technique, calculs structuraux et dimensionnement des réseaux',
      'Suivi administratif, autorisations et conformité réglementaire',
      'Gestion de chantier, coordination et contrôle qualité',
      'Suivi des délais et du budget',
      'Solutions durables et optimisation de l’efficacité du projet',
    ],
  },
  {
    slug: 'formation-logiciels-architecture',
    title: 'Formation sur les logiciels de construction et d’architecture modernes',
    location: 'Maroc',
    category: 'training',
    categoryLabel: 'Formation',
    type: 'Formation professionnelle',
    image: '/images/formations/category-software.webp',
    alt: 'Formation aux logiciels de construction et d’architecture modernes avec interface numérique et atelier professionnel.',
    description:
      'Formation destinée aux acteurs de l’architecture, du génie civil et de la construction pour renforcer la maîtrise des outils numériques essentiels aux projets modernes.',
    facts: [
      { label: 'Public', value: 'Architectes, ingénieurs, étudiants, techniciens' },
      { label: 'Objectif', value: 'Compétences numériques appliquées' },
      { label: 'Positionnement', value: 'Innovation, efficacité et pratique professionnelle' },
    ],
    missions: [
      'Former les architectes, ingénieurs civils, étudiants, techniciens et professionnels',
      'Développer la maîtrise des outils numériques de construction et d’architecture',
      'Relier apprentissage logiciel, innovation et efficacité opérationnelle',
      'Préparer les participants à des projets de construction modernes',
    ],
  },
];

const content: ReferencePageContent = {
  eyebrow: 'Quelques références',
  title: 'Nos Références',
  subtitle:
    'Des projets résidentiels, agricoles, industriels et techniques accompagnés par ELAOUAD Architecture & Ingénierie, de l’étude à la réalisation.',
  sourceLabel: 'Données issues du dossier SERVICES.pdf',
  filters,
  factsTitle: 'Repères',
  missionsTitle: 'Missions EAI',
  ctaLabel: 'Découvrir la référence',
  missingImageLabel: 'Image à ajouter',
  projects,
};

export function getReferencePageContent(_locale: Locale): ReferencePageContent {
  return content;
}
