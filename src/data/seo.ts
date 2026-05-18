import type { Metadata } from 'next';
import {
  getEvent,
  getProject,
  type Locale,
} from '@/data/site';

export const siteUrl = 'https://elaouad-architecture.com';

const locales: Locale[] = ['fr', 'en', 'ar'];

type PageKey = 'home' | 'projects' | 'expertises' | 'about' | 'events' | 'contact' | 'formations';

const pageSeo: Record<PageKey, Record<Locale, { title: string; description: string; path: string }>> = {
  home: {
    fr: {
      title: 'ELAOUAD Architecture & Ingénierie Casablanca',
      description: 'Cabinet premium à Casablanca pour architecture, BIM consulting, ingénierie, design intérieur, urbanisme et événements construction.',
      path: '',
    },
    en: {
      title: 'ELAOUAD Architecture & Engineering Casablanca',
      description: 'Premium Casablanca studio for architecture, BIM consulting, engineering, interior design, urban planning, and construction events.',
      path: '',
    },
    ar: {
      title: 'ELAOUAD للهندسة المعمارية والهندسة',
      description: 'مكتب راق في الدار البيضاء للهندسة المعمارية وBIM والهندسة والتصميم الداخلي والتعمير وفعاليات البناء.',
      path: '',
    },
  },
  projects: {
    fr: {
      title: 'Projets ELAOUAD Architecture',
      description: 'Découvrez les projets signature ELAOUAD en architecture, BIM, résidentiel premium, urbanisme et design intérieur au Maroc.',
      path: '/projets',
    },
    en: {
      title: 'ELAOUAD Architecture Projects',
      description: 'Explore ELAOUAD signature projects in architecture, BIM, premium residential, urban planning, and interior design in Morocco.',
      path: '/projets',
    },
    ar: {
      title: 'مشاريع ELAOUAD المعمارية',
      description: 'اكتشف مشاريع ELAOUAD في العمارة وBIM والسكن الراقي والتعمير والتصميم الداخلي بالمغرب.',
      path: '/projets',
    },
  },
  expertises: {
    fr: {
      title: 'Expertises Architecture BIM Maroc',
      description: 'Architecture, BIM consulting Maroc, ingénierie, project management, design intérieur luxe et urbanisme pour projets exigeants.',
      path: '/expertises',
    },
    en: {
      title: 'Architecture BIM Expertise Morocco',
      description: 'Architecture, Morocco BIM consulting, engineering, project management, luxury interior design, and urban planning.',
      path: '/expertises',
    },
    ar: {
      title: 'خبرات العمارة وBIM في المغرب',
      description: 'هندسة معمارية واستشارات BIM وهندسة وإدارة مشاريع وتصميم داخلي راق وتعمير للمشاريع المتطلبة.',
      path: '/expertises',
    },
  },
  about: {
    fr: {
      title: 'À Propos de Soukaina Elaouad',
      description: 'Découvrez la vision de Soukaina Elaouad, fondatrice d’ELAOUAD Architecture & Ingénierie à Casablanca.',
      path: '/a-propos',
    },
    en: {
      title: 'About Soukaina Elaouad',
      description: 'Discover the vision of Soukaina Elaouad, founder of ELAOUAD Architecture & Engineering in Casablanca.',
      path: '/a-propos',
    },
    ar: {
      title: 'عن سكينة العواد',
      description: 'تعرف على رؤية سكينة العواد، مؤسسة ELAOUAD للهندسة المعمارية والهندسة في الدار البيضاء.',
      path: '/a-propos',
    },
  },
  events: {
    fr: {
      title: 'ELAOUAD Events FIDI 2026',
      description: 'ELAOUAD Events met en lumière FIDI 2026, forum construction Maroc 2026, design intérieur, matériaux et networking international.',
      path: '/events',
    },
    en: {
      title: 'ELAOUAD Events FIDI 2026',
      description: 'ELAOUAD Events presents FIDI 2026, Morocco construction forum 2026, interior design, materials, and international networking.',
      path: '/events',
    },
    ar: {
      title: 'فعاليات ELAOUAD FIDI 2026',
      description: 'فعاليات ELAOUAD تقدم FIDI 2026، منتدى البناء بالمغرب، التصميم الداخلي والمواد والتواصل الدولي.',
      path: '/events',
    },
  },
  formations: {
    fr: {
      title: 'Formations Architecture BIM & Logicielles | ELAOUAD Courses',
      description: 'Formations professionnelles et pratiques au Maroc: BIM, Revit, AutoCAD, 3ds Max, conduite de chantier, design intérieur et gestion de projet.',
      path: '/formations',
    },
    en: {
      title: 'Architecture BIM & Software Training | ELAOUAD Courses',
      description: 'Professional and practical training in Morocco: BIM, Revit, AutoCAD, 3ds Max, site supervision, interior design, and project management.',
      path: '/formations',
    },
    ar: {
      title: 'دورات العمارة وBIM والبرمجيات | ELAOUAD Courses',
      description: 'تكوين مهني وعملي بالمغرب: نمذجة BIM، ريفيت، أوتوكاد، إدارة المشاريع والتصميم الداخلي.',
      path: '/formations',
    },
  },
  contact: {
    fr: {
      title: 'Contact ELAOUAD Casablanca',
      description: 'Contactez ELAOUAD Architecture & Ingénierie pour une consultation architecture, BIM, design intérieur ou projet événementiel.',
      path: '/contact',
    },
    en: {
      title: 'Contact ELAOUAD Casablanca',
      description: 'Contact ELAOUAD Architecture & Engineering for architecture, BIM, interior design, or event project consultation.',
      path: '/contact',
    },
    ar: {
      title: 'اتصل ب ELAOUAD الدار البيضاء',
      description: 'تواصل مع ELAOUAD لاستشارة في العمارة أو BIM أو التصميم الداخلي أو المشاريع الحدثية.',
      path: '/contact',
    },
  },
};

function normalizeLocale(locale: string): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : 'fr';
}

function localizedUrl(locale: Locale, path: string) {
  return `${siteUrl}/${locale}${path}`;
}

function alternates(path: string): Metadata['alternates'] {
  return {
    canonical: localizedUrl('fr', path),
    languages: {
      fr: localizedUrl('fr', path),
      en: localizedUrl('en', path),
      ar: localizedUrl('ar', path),
      'x-default': localizedUrl('fr', path),
    },
  };
}

export function createPageMetadata(localeInput: string, page: PageKey): Metadata {
  const locale = normalizeLocale(localeInput);
  const seo = pageSeo[page][locale];
  const url = localizedUrl(locale, seo.path);

  return {
    metadataBase: new URL(siteUrl),
    title: seo.title,
    description: seo.description,
    alternates: alternates(seo.path),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: 'ELAOUAD Architecture & Ingénierie',
      locale,
      type: 'website',
      images: [
        {
          url: '/images/hero.webp',
          width: 1200,
          height: 630,
          alt: 'ELAOUAD Architecture & Ingénierie',
        },
      ],
    },
  };
}

export function createProjectMetadata(localeInput: string, slug: string): Metadata {
  const locale = normalizeLocale(localeInput);
  const project = getProject(locale, slug);

  if (!project) {
    return createPageMetadata(locale, 'projects');
  }

  const path = `/projets/${slug}`;
  const title = `${project.title} | ELAOUAD`;
  const description = project.description.slice(0, 155);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: alternates(path),
    openGraph: {
      title,
      description,
      url: localizedUrl(locale, path),
      siteName: 'ELAOUAD Architecture & Ingénierie',
      locale,
      type: 'article',
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export function createEventMetadata(localeInput: string, slug: string): Metadata {
  const locale = normalizeLocale(localeInput);
  const event = getEvent(locale, slug);

  if (!event) {
    return createPageMetadata(locale, 'events');
  }

  const path = `/events/${slug}`;
  const title = `${event.title} | ELAOUAD Events`;
  const description = event.description.slice(0, 155);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: alternates(path),
    openGraph: {
      title,
      description,
      url: localizedUrl(locale, path),
      siteName: 'ELAOUAD Events',
      locale,
      type: 'article',
      images: [
        {
          url: event.image,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
  };
}
