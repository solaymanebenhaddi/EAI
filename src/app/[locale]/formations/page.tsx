import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Link } from '@/i18n/routing';
import { createPageMetadata } from '@/data/seo';
import { BookOpen, Laptop, Milestone, Compass } from 'lucide-react';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return createPageMetadata(locale, 'formations');
}

export default function FormationsPage(props: { params: Promise<{ locale: string }> }) {
  // Read params
  const { locale } = props.params as any; // safe cast for build sync
  setRequestLocale(locale);
  
  // Load Translations
  const t = useTranslations('Formations');

  const softwares = [
    'Revit', 'AutoCAD', 'SketchUp Pro', '3ds Max', 
    'Archicad', 'Tekla', 'Covadis', 'Mensura', 
    'MS Project', 'TILOS'
  ];

  return (
    <main className="bg-lumen min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-6 mb-20 text-center flex flex-col items-center">
        <SectionLabel className="mb-8">{t('label')}</SectionLabel>
        <h1 className="font-display text-display-lg md:text-display-xl text-ink italic mb-12 max-w-[900px] leading-tight">
          {t('title')}
        </h1>
        <p className="font-body text-[18px] text-mortar max-w-[700px] leading-relaxed">
          {t('description')}
        </p>
      </div>

      {/* CORE PILLARS GRID */}
      <div className="container mx-auto px-6 mb-28">
        <h2 className="font-display text-display-md text-ink italic mb-16 text-center">
          {t('pillarTitle')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* PILLAR 1 */}
          <div className="bg-mist/30 backdrop-blur-md p-10 border border-cloud/40 hover:border-brass/30 transition-all duration-500 flex flex-col gap-6 relative group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-brass/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <BookOpen className="text-brass w-8 h-8" />
            <h3 className="font-display text-display-sm text-ink group-hover:text-brass transition-colors">
              {t('pillar1Title')}
            </h3>
            <p className="font-body text-[15px] text-mortar leading-relaxed">
              {t('pillar1Desc')}
            </p>
          </div>

          {/* PILLAR 2 */}
          <div className="bg-mist/30 backdrop-blur-md p-10 border border-cloud/40 hover:border-brass/30 transition-all duration-500 flex flex-col gap-6 relative group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-brass/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <Laptop className="text-brass w-8 h-8" />
            <h3 className="font-display text-display-sm text-ink group-hover:text-brass transition-colors">
              {t('pillar2Title')}
            </h3>
            <p className="font-body text-[15px] text-mortar leading-relaxed">
              {t('pillar2Desc')}
            </p>
          </div>

          {/* PILLAR 3 */}
          <div className="bg-mist/30 backdrop-blur-md p-10 border border-cloud/40 hover:border-brass/30 transition-all duration-500 flex flex-col gap-6 relative group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-brass/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <Compass className="text-brass w-8 h-8" />
            <h3 className="font-display text-display-sm text-ink group-hover:text-brass transition-colors">
              {t('pillar3Title')}
            </h3>
            <p className="font-body text-[15px] text-mortar leading-relaxed">
              {t('pillar3Desc')}
            </p>
          </div>
        </div>
      </div>

      {/* SOFTWARE GRID */}
      <div className="container mx-auto px-6 mb-28">
        <div className="bg-mist/20 border border-cloud/30 p-12 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center">
            <div>
              <p className="font-body text-label text-brass uppercase tracking-widest mb-4">
                {t('practicalApproach')}
              </p>
              <h2 className="font-display text-display-md text-ink italic leading-tight mb-6">
                {t('softwareLabel')}
              </h2>
              <p className="font-body text-mortar leading-relaxed">
                Nos sessions de formation intègrent les outils de modélisation, de planification et de calcul réglementaires les plus exigés par les cabinets d'architecture et les bureaux d'études.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {softwares.map((software) => (
                <div 
                  key={software} 
                  className="bg-mist/50 border border-cloud/40 py-6 text-center font-body text-label uppercase tracking-widest text-ink hover:border-brass hover:text-brass transition-colors duration-300"
                >
                  {software}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="container mx-auto px-6">
        <div className="bg-mist p-10 md:p-16 text-center relative overflow-hidden border border-cloud/50">
          <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-brass/10 blur-3xl pointer-events-none" />
          
          <h3 className="font-display text-display-md text-ink italic mb-6">
            {t('ctaRegisterTitle')}
          </h3>
          <p className="font-body text-mortar mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('ctaRegisterDesc')}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              href="/contact" 
              className="inline-block bg-brass text-void px-10 py-5 text-label uppercase tracking-widest hover:bg-brass-glow transition-all duration-500"
            >
              {t('ctaSecondary')}
            </Link>
            <Link 
              href="/contact" 
              className="inline-block border border-cloud hover:border-brass hover:text-brass text-mortar px-10 py-5 text-label uppercase tracking-widest transition-all duration-500"
            >
              {t('ctaPrimary')}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
