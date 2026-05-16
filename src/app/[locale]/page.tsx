import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { Manifesto } from '@/components/sections/Manifesto';
import { Services } from '@/components/sections/Services';
import { Projets } from '@/components/sections/Projets';
import { Apropos } from '@/components/sections/Apropos';
import { Events } from '@/components/sections/Events';
import { Testimonials } from '@/components/sections/Testimonials';
import { CallToAction } from '@/components/sections/CallToAction';

import { PerspectiveWrapper } from '@/components/ui/PerspectiveWrapper';

export default async function HomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <main className="bg-void">
      <PerspectiveWrapper><Hero /></PerspectiveWrapper>
      <PerspectiveWrapper><Manifesto /></PerspectiveWrapper>
      <PerspectiveWrapper><Services /></PerspectiveWrapper>
      <PerspectiveWrapper><Projets /></PerspectiveWrapper>
      <PerspectiveWrapper><Apropos /></PerspectiveWrapper>
      <PerspectiveWrapper><Events /></PerspectiveWrapper>
      <PerspectiveWrapper><Testimonials /></PerspectiveWrapper>
      <PerspectiveWrapper><CallToAction /></PerspectiveWrapper>
    </main>
  );
}
