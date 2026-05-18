import { MetadataRoute } from 'next';
import { getEventSlugs, getProjectSlugs } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://elaouad-architecture.com'; // Replace with actual domain
  const locales = ['fr', 'en', 'ar'];
  const routes = ['', '/projets', '/expertises', '/a-propos', '/events', '/contact'];

  const staticEntries = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );

  const projectEntries = locales.flatMap((locale) =>
    getProjectSlugs().map((slug) => ({
      url: `${baseUrl}/${locale}/projets/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  const eventEntries = locales.flatMap((locale) =>
    getEventSlugs().map((slug) => ({
      url: `${baseUrl}/${locale}/events/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...staticEntries, ...projectEntries, ...eventEntries];
}
