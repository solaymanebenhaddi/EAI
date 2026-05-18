import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Link } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { getProject, getProjectSlugs, getProjects, type Locale } from '@/data/site';
import { createProjectMetadata } from '@/data/seo';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProjectSlugs().map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await props.params;
  return createProjectMetadata(locale, slug);
}

export default async function ProjectDetailPage(props: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  const projects = getProjects(locale as Locale);
  const project = getProject(locale as Locale, slug);
  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-lumen min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-6 mb-16">
        <Link href="/projets" className="font-body text-label text-mortar uppercase tracking-widest hover:text-ink transition-colors mb-12 inline-flex items-center gap-2">
          <span>←</span> Retour aux projets
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mt-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-body text-label text-brass tracking-widest uppercase">{project.category}</span>
              <span className="w-1 h-1 rounded-full bg-ink/30" />
              <span className="font-body text-label text-ink/70 tracking-widest uppercase">{project.year}</span>
            </div>
            <h1 className="font-display text-display-lg text-ink italic leading-tight max-w-4xl">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full h-[70vh] mb-20 relative">
        <ParallaxImage
          src={project.image}
          alt={project.title}
          className="h-full object-cover"
          containerClassName="h-full"
        />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16">
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-body text-label text-mortar uppercase tracking-widest mb-2">Localisation</p>
              <p className="font-body text-[16px] text-ink">{project.location}</p>
            </div>
            <div className="w-full h-[1px] bg-cloud" />
            <div>
              <p className="font-body text-label text-mortar uppercase tracking-widest mb-2">Client</p>
              <p className="font-body text-[16px] text-ink">{project.client}</p>
            </div>
            <div className="w-full h-[1px] bg-cloud" />
            <div>
              <p className="font-body text-label text-mortar uppercase tracking-widest mb-2">Surface</p>
              <p className="font-body text-[16px] text-ink">{project.surface}</p>
            </div>
            <div className="w-full h-[1px] bg-cloud" />
            <div>
              <p className="font-body text-label text-mortar uppercase tracking-widest mb-2">Statut</p>
              <p className="font-body text-[16px] text-ink">{project.status}</p>
            </div>
            <div className="w-full h-[1px] bg-cloud" />
            <div>
              <p className="font-body text-label text-mortar uppercase tracking-widest mb-2">Année</p>
              <p className="font-body text-[16px] text-ink">{project.year}</p>
            </div>
          </div>
          
          <div>
            <SectionLabel className="mb-8">Le Concept</SectionLabel>
            <p className="font-body text-[20px] leading-relaxed text-mortar max-w-[800px] mb-12">
              {project.description}
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {project.gallery.slice(1).map((image, index) => (
                <div key={image} className="h-[40vh] relative bg-mist">
                  <ParallaxImage src={image} alt={`${project.title} détail ${index + 1}`} className="h-full" containerClassName="h-full" />
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-20 pt-16 border-t border-cloud">
              <div className="bg-mist p-10 md:p-16 text-center">
                <h3 className="font-display text-display-md text-ink italic mb-6">
                  Vous avez un projet similaire ?
                </h3>
                <p className="font-body text-mortar mb-10 max-w-2xl mx-auto">
                  Discutons de votre vision. Notre équipe est prête à transformer vos idées en réalité architecturale.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-block bg-brass text-void px-10 py-5 text-label uppercase tracking-widest hover:bg-brass-glow transition-all duration-500"
                >
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-28">
        <Link href={`/projets/${nextProject.slug}`} className="group block border-t border-cloud pt-12">
          <p className="font-body text-label uppercase tracking-widest text-brass mb-6">Projet suivant</p>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-display-md text-ink">{nextProject.title}</h2>
            <span className="font-body text-label uppercase tracking-widest text-mortar group-hover:text-brass transition-colors">
              Découvrir →
            </span>
          </div>
        </Link>
      </div>
    </main>
  );
}
