import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ContactForm } from '@/components/contact/ContactForm';
import type { Locale } from '@/data/site';
import { createPageMetadata } from '@/data/seo';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return createPageMetadata(locale, 'contact');
}

export default async function ContactPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <main className="bg-lumen min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-6 mb-20">
        <SectionLabel className="mb-8">Contact</SectionLabel>
        <h1 className="font-display text-display-xl text-ink italic mb-12 max-w-[900px] leading-tight">
          Entrons en <span className="text-brass">contact.</span>
        </h1>
        <p className="font-body text-[18px] text-mortar max-w-[600px] mb-20">
          Chaque projet d'exception commence par une conversation. Remplissez le formulaire ci-dessous ou contactez-nous directement via nos coordonnées.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-20">
          {/* CONTACT INFO */}
          <div className="flex flex-col gap-12">
            <div>
              <p className="font-body text-label text-mortar uppercase tracking-widest mb-4">Adresse</p>
              <p className="font-body text-[18px] text-ink leading-relaxed">
                <span className="block">Florida Center Park, 10</span>
                <span className="block">2 Bd Zoulikha Nasri</span>
                <span className="block">Casablanca 20520, Maroc</span>
              </p>
            </div>
            
            <div className="w-full h-[1px] bg-cloud" />
            
            <div>
              <p className="font-body text-label text-mortar uppercase tracking-widest mb-4">Téléphone</p>
              <a href="tel:+212520198738" className="font-body text-[18px] text-ink hover:text-brass transition-colors block">
                +212 520 19 87 38
              </a>
              <a href="tel:+212666798536" className="font-body text-[18px] text-ink hover:text-brass transition-colors">
                +212 666 798 536
              </a>
            </div>

            <div className="w-full h-[1px] bg-cloud" />
            
            <div>
              <p className="font-body text-label text-mortar uppercase tracking-widest mb-4">Email</p>
              <a href="mailto:contact@eai-construction.com" className="font-body text-[18px] text-ink hover:text-brass transition-colors">
                contact@eai-construction.com
              </a>
            </div>

            <div className="w-full h-[1px] bg-cloud" />
            
            <div>
              <p className="font-body text-label text-mortar uppercase tracking-widest mb-4">WhatsApp</p>
              <a href="https://wa.me/212666880038" className="font-body text-[18px] text-ink hover:text-brass transition-colors">
                +212 666 880 038
              </a>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-mist p-10 md:p-14">
            <ContactForm locale={locale as Locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
