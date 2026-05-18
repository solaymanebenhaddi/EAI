import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { getProjects, type Locale } from '@/data/site';
import { createPageMetadata } from '@/data/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return createPageMetadata(locale, 'projects');
}

export default async function ProjetsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const projects = getProjects(locale as Locale);

  const filters = [
    { key: 'all', label: { fr: 'Tous', en: 'All', ar: 'الكل' } },
    { key: 'Architecture', label: { fr: 'Architecture', en: 'Architecture', ar: 'هندسة معمارية' } },
    { key: 'Design Intérieur', label: { fr: 'Design Intérieur', en: 'Interior Design', ar: 'تصميم داخلي' } },
    { key: 'Urbanisme', label: { fr: 'Urbanisme', en: 'Urban Planning', ar: 'تعمير' } },
    { key: 'BIM Consulting', label: { fr: 'BIM', en: 'BIM', ar: 'BIM' } },
  ];

  const getLabel = (key: string) => {
    const filter = filters.find(f => f.key === key);
    if (!filter) return key;
    const localeMap: Record<string, string> = { fr: 'fr', en: 'en', ar: 'ar' };
    const mapKey = localeMap[locale] || 'fr';
    return (filter.label as Record<string, string>)[mapKey] || key;
  };

  return (
    <main className="bg-lumen min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-6 mb-20">
        <SectionLabel className="mb-8">Portfolio</SectionLabel>
        <h1 className="font-display text-display-xl text-ink italic mb-12 max-w-[800px] leading-tight">
          <span className="block">L&apos;expression de</span>
          <span className="block text-brass">notre vision.</span>
        </h1>
        
        {/* FILTERS */}
        <div className="flex flex-wrap gap-6 border-b border-cloud pb-6">
          {filters.map((filter, i) => (
            <button 
              key={filter.key}
              data-filter={filter.key}
              className="filter-btn font-body text-label uppercase tracking-widest transition-colors data-[active=true]:text-brass data-[active=false]:text-mortar hover:text-ink"
              data-active={i === 0 ? 'true' : 'false'}
            >
              {getLabel(filter.key)}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="project-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project, i) => (
            <div key={project.slug} className="project-item mt-8" data-category={project.category}>
              <ProjectCard
                slug={project.slug}
                title={project.title}
                category={project.category}
                location={project.location}
                year={project.year}
                imageSrc={project.image}
              />
            </div>
          ))}
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            var buttons = document.querySelectorAll('.filter-btn');
            var items = document.querySelectorAll('.project-item');
            
            buttons.forEach(function(btn) {
              btn.addEventListener('click', function() {
                var filter = btn.getAttribute('data-filter');
                
                buttons.forEach(function(b) { b.setAttribute('data-active', 'false'); });
                btn.setAttribute('data-active', 'true');
                
                items.forEach(function(item) {
                  if (filter === 'all') {
                    item.style.display = 'block';
                  } else {
                    var category = item.getAttribute('data-category');
                    item.style.display = category === filter ? 'block' : 'none';
                  }
                });
              });
            });
          });
        `
      }} />
    </main>
  );
}
