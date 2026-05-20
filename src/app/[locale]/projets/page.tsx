import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ProjetsHero } from '@/components/projets/ProjetsHero';
import { PortfolioPhilosophy } from '@/components/projets/PortfolioPhilosophy';
import { ProjectsSection } from '@/components/projets/ProjectsSection';
import { FeaturedProject } from '@/components/projets/FeaturedProject';
import { CaseStudyPreview } from '@/components/projets/CaseStudyPreview';
import { GalleryStrip } from '@/components/projets/GalleryStrip';
import { ProjectTypes } from '@/components/projets/ProjectTypes';
import { ProjectsCTA } from '@/components/projets/ProjectsCTA';
import { Footer } from '@/components/Footer';

type FilterKey = 'all' | 'residential' | 'interior' | 'commercial' | 'urban' | 'hospitality' | 'public' | 'bim';

interface ProjectData {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  status: string;
  concept: string;
  tags: string[];
  image: string;
  alt: string;
  filterKey: FilterKey;
  featured?: boolean;
}

const projects: ProjectData[] = [
  {
    slug: 'villa-privee-casablanca',
    title: 'Villa privée — Casablanca',
    category: 'Architecture résidentielle',
    location: 'Casablanca, Maroc',
    year: '2025',
    status: 'Étude conceptuelle / mission architecturale',
    concept: 'Cette villa privée est pensée comme une composition entre intimité, lumière naturelle et continuité des espaces. L\'architecture organise une relation fluide entre intérieur et extérieur, tout en préservant la confidentialité des espaces de vie.',
    tags: ['Architecture', 'Résidentiel', 'Lumière', 'Matière'],
    image: '/images/projects/villa-privee-casablanca.webp',
    alt: 'Villa privée contemporaine à Casablanca avec volumes sobres, lumière naturelle et relation intérieur extérieur.',
    filterKey: 'residential',
    featured: true,
  },
  {
    slug: 'projet-residentiel-marrakech',
    title: 'Projet résidentiel — Marrakech',
    category: 'Résidentiel premium',
    location: 'Marrakech, Maroc',
    year: '2024',
    status: 'Concept architectural',
    concept: 'Une résidence pensée autour du confort, de l\'élégance et de la relation au climat. Le projet met en valeur les volumes, l\'ombre, la lumière et les transitions entre espaces intérieurs et extérieurs.',
    tags: ['Architecture', 'Résidentiel', 'Lumière', 'Matière'],
    image: '/images/projects/residentiel-marrakech.webp',
    alt: 'Projet résidentiel premium à Marrakech avec architecture contemporaine et espaces lumineux.',
    filterKey: 'residential',
  },
  {
    slug: 'espace-professionnel-rabat',
    title: 'Espace professionnel — Rabat',
    category: 'Design intérieur / Tertiaire',
    location: 'Rabat, Maroc',
    year: '2024',
    status: 'Aménagement intérieur',
    concept: 'Un environnement de travail conçu pour renforcer l\'image de marque, fluidifier les circulations et offrir une expérience professionnelle plus claire, plus confortable et plus cohérente.',
    tags: ['Design intérieur', 'Tertiaire', 'Ergonomie', 'Image de marque'],
    image: '/images/projects/espace-professionnel-rabat.webp',
    alt: 'Espace professionnel à Rabat avec design intérieur contemporain et ambiance premium.',
    filterKey: 'interior',
  },
  {
    slug: 'amenagement-urbain-tanger',
    title: 'Aménagement urbain — Tanger',
    category: 'Urbanisme & aménagement',
    location: 'Tanger, Maroc',
    year: '2023',
    status: 'Étude d\'aménagement',
    concept: 'Une réflexion territoriale orientée vers la qualité des espaces publics, la mobilité, la lisibilité des parcours et l\'intégration du projet dans son environnement urbain.',
    tags: ['Urbanisme', 'Aménagement', 'Mobilité', 'Espace public'],
    image: '/images/projects/amenagement-urbain-tanger.webp',
    alt: 'Étude d\'aménagement urbain à Tanger avec organisation des espaces publics et mobilité.',
    filterKey: 'urban',
  },
  {
    slug: 'hotel-boutique-marrakech',
    title: 'Hôtel Boutique — Marrakech',
    category: 'Hospitality / Design intérieur',
    location: 'Marrakech, Maroc',
    year: '2025',
    status: 'Concept hospitality',
    concept: 'Un lieu d\'accueil pensé comme une expérience sensorielle : matière, lumière, parcours, intimité et identité locale se combinent pour créer une atmosphère mémorable.',
    tags: ['Hospitality', 'Design intérieur', 'Expérience', 'Matériaux'],
    image: '/images/projects/hotel-boutique-marrakech.webp',
    alt: 'Hôtel boutique à Marrakech avec design intérieur premium et atmosphère chaleureuse.',
    filterKey: 'hospitality',
  },
  {
    slug: 'centre-culturel-essaouira',
    title: 'Centre Culturel — Essaouira',
    category: 'Équipement public',
    location: 'Essaouira, Maroc',
    year: '2024',
    status: 'Étude architecturale',
    concept: 'Un équipement conçu comme un lieu de rencontre, d\'apprentissage et d\'expression culturelle, avec une attention portée à l\'accessibilité, aux usages collectifs et à l\'identité du territoire.',
    tags: ['Équipement public', 'Culture', 'Architecture', 'Usage collectif'],
    image: '/images/projects/centre-culturel-essaouira.webp',
    alt: 'Centre culturel à Essaouira avec architecture publique et espaces collectifs.',
    filterKey: 'public',
  },
  {
    slug: 'coordination-bim-projet-mixte',
    title: 'Coordination BIM — Projet mixte',
    category: 'BIM & études techniques',
    location: 'Maroc',
    year: '2025',
    status: 'Mission de coordination',
    concept: 'Une mission de coordination numérique destinée à améliorer la lecture du projet, anticiper les incohérences techniques et faciliter les échanges entre les différents intervenants.',
    tags: ['BIM', 'Coordination', 'Études techniques', 'Synthèse'],
    image: '/images/projects/bim-coordination.webp',
    alt: 'Maquette BIM et coordination technique pour projet architectural mixte.',
    filterKey: 'bim',
  },
];

function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projets EAI | Portfolio Architecture, Design Intérieur & Urbanisme au Maroc',
    description: 'Découvrez les projets d\'ELAOUAD Architecture & Ingénierie : architecture résidentielle, design intérieur, urbanisme, hospitality, BIM et études techniques au Maroc.',
    url: 'https://eai-construction.com/projets',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'CreativeWork',
        position: index + 1,
        name: project.title,
        description: project.concept,
        url: `https://eai-construction.com/projets/${project.slug}`,
        image: `https://eai-construction.com${project.image}`,
      })),
    },
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Projets EAI | Portfolio Architecture, Design Intérieur & Urbanisme au Maroc',
    description: 'Découvrez les projets d\'ELAOUAD Architecture & Ingénierie : architecture résidentielle, design intérieur, urbanisme, hospitality, BIM et études techniques au Maroc.',
  };
}

export default function ProjetsPage() {
  return (
    <main className="bg-eai-paper min-h-screen">
      <Script
        id="projets-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />
      <ProjetsHero />
      <PortfolioPhilosophy />
      <FeaturedProject />
      <ProjectsSection projects={projects} />
      <CaseStudyPreview />
      <GalleryStrip />
      <ProjectTypes />
      <ProjectsCTA />
      <Footer />
    </main>
  );
}
