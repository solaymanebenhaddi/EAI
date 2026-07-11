export type VideoRatio = '16:9' | '9:16' | '4:3' | '1:1';
export type VideoProvider = 'youtube' | 'vimeo' | 'direct';

export interface VideoConfigData {
  id: string;
  section: string;
  title: string;
  description?: string;
  url: string;
  provider: VideoProvider;
  aspectRatio: VideoRatio;
  poster?: string;
  ctaLabel?: string;
  ctaDestination?: string;
  active: boolean;
}

export const videoConfig: Record<string, VideoConfigData> = {
  interiorDesign: {
    id: 'interior-design-intro',
    section: 'interior-design',
    title: 'Découvrez notre univers de design intérieur',
    url: '/assets/videos/1.mp4',
    provider: 'direct',
    aspectRatio: '9:16',
    active: true,
  },
  conception3D: {
    id: 'conception-3d-video',
    section: 'conception-3d',
    title: 'Visualisez votre projet avant sa réalisation',
    url: '/assets/videos/2.mp4',
    provider: 'direct',
    aspectRatio: '9:16',
    active: true,
  },
  turnkey: {
    id: 'turnkey-services-video',
    section: 'turnkey-services',
    title: 'De la conception à la livraison',
    url: '/assets/videos/clemain.mp4',
    provider: 'direct',
    aspectRatio: '9:16',
    active: true,
  },
  process: {
    id: 'process-approach-video',
    section: 'process-approach',
    title: 'Notre méthode, de l’idée à la réalisation',
    url: 'https://youtube.com/shorts/FikAQv89vVQ?si=ayxo1daDDRf_ueMx',
    provider: 'youtube',
    aspectRatio: '9:16',
    active: true,
  },
  training: {
    id: 'training-video',
    section: 'training-courses',
    title: 'Formez-vous aux métiers du design intérieur',
    url: '/assets/videos/formations.mp4',
    provider: 'direct',
    aspectRatio: '9:16',
    ctaLabel: 'Découvrir nos formations',
    ctaDestination: 'https://courses.eai-construction.com', // Placeholder URL
    active: true,
  },
  mayush: {
    id: 'mayush-design-video',
    section: 'mayush-design',
    title: 'Découvrez notre sélection pour vos espaces',
    url: '/assets/videos/mayush.mp4',
    provider: 'direct',
    aspectRatio: '16:9',
    ctaLabel: 'Explorer Mayush Design',
    ctaDestination: 'https://mayushdesign.com',
    active: true,
  },
  currentEvent: {
    id: 'current-event-video',
    section: 'events-showcase',
    title: 'Découvrez notre prochain événement',
    url: '/assets/videos/forum.mp4',
    provider: 'direct',
    aspectRatio: '9:16',
    ctaLabel: 'Voir l’événement',
    ctaDestination: '#contact', // Placeholder URL
    active: true,
  },
};

export interface ProjectVideo {
  id: string;
  title: string;
  category: string;
  location?: string;
  url: string;
  provider: VideoProvider;
  aspectRatio: VideoRatio;
  poster?: string;
  description: string;
  beforeLabel?: string;
  afterLabel?: string;
  detailsLink?: string;
}

export const beforeAfterVideos: ProjectVideo[] = [
  {
    id: 'project-1',
    title: 'Villa Premium',
    category: 'Résidentiel',
    location: 'Casablanca',
    url: '/assets/videos/villa.mp4',
    provider: 'direct',
    aspectRatio: '9:16',
    poster: '/assets/villa_thumbnail.png',
    description: 'Transformation complète d\'une villa premium avec suivi de chantier.',
    beforeLabel: 'Avant',
    afterLabel: 'Après',
  },
  {
    id: 'project-2',
    title: 'Appartement Urbain',
    category: 'Résidentiel',
    location: 'Rabat',
    url: '/assets/videos/appartement.mp4',
    provider: 'direct',
    aspectRatio: '9:16',
    poster: '/assets/apartment_thumbnail.png',
    description: 'Rénovation et design intérieur d\'un appartement moderne.',
    beforeLabel: 'Avant',
    afterLabel: 'Après',
  },
  {
    id: 'project-3',
    title: 'Bureaux Corporate',
    category: 'Professionnel',
    location: 'Marrakech',
    url: '/assets/videos/office.mp4',
    provider: 'direct',
    aspectRatio: '9:16',
    poster: '/assets/office_thumbnail.png',
    description: 'Aménagement clé en main d\'espaces de travail ergonomiques.',
    beforeLabel: 'Avant',
    afterLabel: 'Après',
  }
];
