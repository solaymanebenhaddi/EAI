'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { trackEvent } from '@/lib/analytics';
import Image from 'next/image';

export function OfficeDetails() {
  const t = useTranslations('Contact');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const mapsUrl = 'https://www.google.com/maps/search/10+Florida+Center+Park+2+Boulevard+Zoulikha+Nasri+Sidi+Maarouf+Casablanca+Maroc';

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-paper overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute left-[20%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[50%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[80%] top-0 w-px h-full bg-eai-brass" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-eai-brass" />
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass">
              {t('officeLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-ink leading-[0.95] tracking-tight mb-6">
            {t('officeTitle')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16">
          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-eai-ink p-10 lg:p-12"
          >
            {/* Company name */}
            <h3 className="font-display text-2xl text-eai-paper mb-8">
              ELAOUAD Architecture & Ingénierie
            </h3>

            {/* Address */}
            <div className="mb-8">
              <span className="font-body text-[9px] uppercase tracking-[0.25em] text-eai-brass-pale block mb-3">
                {t('officeAddressLabel')}
              </span>
              <p className="font-body text-[15px] text-eai-parchment/80 leading-relaxed">
                <span className="block">10 Florida Center Park 2</span>
                <span className="block">Boulevard Zoulikha Nasri</span>
                <span className="block">Sidi Maârouf</span>
                <span className="block">Casablanca, Maroc</span>
              </p>
            </div>

            {/* Email */}
            <div className="mb-8">
              <span className="font-body text-[9px] uppercase tracking-[0.25em] text-eai-brass-pale block mb-3">
                {t('officeEmailLabel')}
              </span>
              <a
                href="mailto:contact@eai-construction.com"
                onClick={() => trackEvent('email_click', { location: 'office_card' })}
                className="font-body text-[15px] text-eai-parchment/80 hover:text-eai-brass transition-colors"
              >
                contact@eai-construction.com
              </a>
            </div>

            {/* Phone */}
            <div className="mb-8">
              <span className="font-body text-[9px] uppercase tracking-[0.25em] text-eai-brass-pale block mb-3">
                {t('officePhoneLabel')}
              </span>
              <a
                href="tel:+212520198738"
                onClick={() => trackEvent('phone_click', { location: 'office_card' })}
                className="font-body text-[15px] text-eai-parchment/80 hover:text-eai-brass transition-colors block"
              >
                +212 520 19 87 38
              </a>
            </div>

            {/* WhatsApp */}
            <div className="mb-8">
              <span className="font-body text-[9px] uppercase tracking-[0.25em] text-eai-brass-pale block mb-3">
                {t('officeWhatsAppLabel')}
              </span>
              <a
                href="https://wa.me/212666798536"
                onClick={() => trackEvent('whatsapp_click', { location: 'office_card' })}
                className="font-body text-[15px] text-eai-parchment/80 hover:text-eai-brass transition-colors"
              >
                +212 666 79 85 36
              </a>
            </div>

            {/* Hours */}
            <div className="mb-10">
              <span className="font-body text-[9px] uppercase tracking-[0.25em] text-eai-brass-pale block mb-3">
                {t('officeHoursLabel')}
              </span>
              <p className="font-body text-[15px] text-eai-parchment/60">
                {t('officeHoursValue')}
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('cta_click', { location: 'office_card', label: 'google_maps' })}
                className="inline-flex items-center gap-2 border border-eai-brass/60 text-eai-brass px-6 py-3 font-body text-[10px] uppercase tracking-[0.15em] hover:bg-eai-brass hover:text-eai-ink transition-all duration-300"
              >
                {t('officeMapsCta')}
              </a>
              <a
                href="tel:+212520198738"
                onClick={() => trackEvent('phone_click', { location: 'office_card_cta' })}
                className="inline-flex items-center gap-2 border border-eai-parchment/20 text-eai-parchment/70 px-6 py-3 font-body text-[10px] uppercase tracking-[0.15em] hover:border-eai-brass hover:text-eai-brass transition-all duration-300"
              >
                {t('officeCallCta')}
              </a>
              <a
                href="mailto:contact@eai-construction.com"
                onClick={() => trackEvent('email_click', { location: 'office_card_cta' })}
                className="inline-flex items-center gap-2 border border-eai-parchment/20 text-eai-parchment/70 px-6 py-3 font-body text-[10px] uppercase tracking-[0.15em] hover:border-eai-brass hover:text-eai-brass transition-all duration-300"
              >
                {t('officeEmailCta')}
              </a>
            </div>
          </motion.div>

          {/* Map visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[480px] lg:h-auto overflow-hidden"
          >
            <Image
              src="/images/contact/eai-office.webp"
              alt="Bureau ELAOUAD Architecture & Ingénierie à Sidi Maârouf, Casablanca"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-eai-ink/30" />

            {/* Map-style overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
              <div className="absolute left-[25%] top-0 w-px h-full bg-eai-brass" />
              <div className="absolute left-[50%] top-0 w-px h-full bg-eai-brass" />
              <div className="absolute left-[75%] top-0 w-px h-full bg-eai-brass" />
              <div className="absolute top-[33%] left-0 w-full h-px bg-eai-brass" />
              <div className="absolute top-[66%] left-0 w-full h-px bg-eai-brass" />
            </div>

            {/* Location pin */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-16 h-16 border-2 border-eai-brass/60 rounded-full flex items-center justify-center bg-eai-ink/50 backdrop-blur-sm"
              >
                <div className="w-3 h-3 bg-eai-brass rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
