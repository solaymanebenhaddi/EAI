import { siteData } from '@/data/site'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import CareersClient from './CareersClient'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="flex flex-col w-full bg-[var(--color-background)] min-h-screen pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full relative z-[2]">
        <div className="max-w-3xl mb-16">
          <p className="text-xs tracking-[0.3em] uppercase opacity-60 mb-4 font-bold text-[var(--color-eai-olive)]">
            Carrières
          </p>
          <h1 className="font-sans text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-6">
            Rejoignez l'excellence
          </h1>
          <p className="text-lg opacity-80 leading-relaxed text-[var(--color-eai-charcoal)]">
            EAI recherche constamment des talents pour repousser les limites de la conception architecturale, du design d'intérieur et de l'ingénierie.
          </p>
        </div>

        <CareersClient careers={siteData.careers} />
      </div>
    </main>
  )
}
