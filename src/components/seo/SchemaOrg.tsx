import { getEvents, getTestimonials, type Locale } from '@/data/site';
import { siteUrl } from '@/data/seo';

export function SchemaOrg({ locale }: { locale: Locale }) {
  const events = getEvents(locale);
  const testimonials = getTestimonials(locale);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness', 'ArchitecturalFirm'],
        '@id': `${siteUrl}/#organization`,
        name: 'ELAOUAD Architecture et Ingénierie',
        url: siteUrl,
        logo: `${siteUrl}/images/LOGO-4k.png`,
        image: `${siteUrl}/images/hero.webp`,
        description: "Cabinet d'architecture et d'ingénierie premium basé à Casablanca, Maroc.",
        inLanguage: locale,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '10 Florida Center Park 2, Boulevard Zoulikha Nasri, Sidi Maarouf',
          addressLocality: 'Casablanca',
          postalCode: '20200',
          addressCountry: 'MA',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+212-520-19-87-38',
          contactType: 'customer service',
          email: 'contact@eai-construction.com',
        },
        founder: {
          '@type': 'Person',
          name: 'Soukaina Elaouad',
        },
        sameAs: [
          'https://www.linkedin.com/company/elaouad-architecture',
          'https://www.instagram.com/elaouadarchitecture',
        ],
        review: testimonials.map((testimonial) => ({
          '@type': 'Review',
          reviewBody: testimonial.text,
          author: {
            '@type': 'Person',
            name: testimonial.name,
          },
          itemReviewed: {
            '@id': `${siteUrl}/#organization`,
          },
        })),
      },
      ...events.map((event) => ({
        '@type': 'Event',
        '@id': `${siteUrl}/${locale}/events/${event.slug}`,
        name: event.title,
        description: event.description,
        image: `${siteUrl}${event.image}`,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        startDate: event.startDate,
        endDate: event.endDate,
        location: {
          '@type': 'Place',
          name: event.location,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Casablanca',
            addressCountry: 'MA',
          },
        },
        organizer: {
          '@id': `${siteUrl}/#organization`,
        },
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
