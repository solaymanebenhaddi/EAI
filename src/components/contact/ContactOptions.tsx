'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { trackEvent } from '@/lib/analytics';

export function ContactOptions() {
  const t = useTranslations('Contact');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const scrollToForm = () => {
    const el = document.getElementById('contact-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const cards = [
    {
      number: '01',
      title: t('optionProjectTitle'),
      text: t('optionProjectText'),
      cta: t('optionProjectCta'),
      action: scrollToForm,
      actionLabel: 'scroll_to_form',
    },
    {
      number: '02',
      title: t('optionPhoneTitle'),
      text: t('optionPhoneText'),
      detail: t('optionPhoneDetail'),
      cta: t('optionPhoneCta'),
      action: () => {
        trackEvent('phone_click', { location: 'contact_options' });
        window.location.href = 'tel:+212520198738';
      },
      actionLabel: 'call',
      isLink: true,
      href: 'tel:+212520198738',
    },
    {
      number: '03',
      title: t('optionWhatsAppTitle'),
      text: t('optionWhatsAppText'),
      detail: t('optionWhatsAppDetail'),
      cta: t('optionWhatsAppCta'),
      action: () => {
        trackEvent('whatsapp_click', { location: 'contact_options' });
      },
      actionLabel: 'whatsapp',
      isLink: true,
      href: 'https://wa.me/212666798536',
      external: true,
    },
    {
      number: '04',
      title: t('optionEmailTitle'),
      text: t('optionEmailText'),
      detail: t('optionEmailDetail'),
      cta: t('optionEmailCta'),
      action: () => {
        trackEvent('email_click', { location: 'contact_options' });
      },
      actionLabel: 'email',
      isLink: true,
      href: 'mailto:contact@eai-construction.com',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-paper overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute left-[10%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[30%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[50%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[70%] top-0 w-px h-full bg-eai-brass" />
        <div className="absolute left-[90%] top-0 w-px h-full bg-eai-brass" />
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
              {t('optionsLabel')}
            </span>
          </div>
          <h2 className="font-display text-display-md text-eai-ink leading-[0.95] tracking-tight mb-6">
            {t('optionsTitle')}
          </h2>
          <p className="font-body text-[15px] text-eai-warm-grey leading-relaxed">
            {t('optionsIntro')}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-eai-ink p-10 hover:bg-eai-taupe transition-colors duration-500"
            >
              {/* Number */}
              <span className="font-display text-3xl text-eai-brass/30 italic block mb-6">
                {card.number}
              </span>

              {/* Divider */}
              <div className="h-px w-12 bg-eai-brass/30 mb-6 group-hover:w-20 transition-all duration-500" />

              {/* Title */}
              <h3 className="font-display text-xl text-eai-paper mb-4 leading-tight">
                {card.title}
              </h3>

              {/* Text */}
              <p className="font-body text-[14px] text-eai-parchment/60 leading-relaxed mb-4">
                {card.text}
              </p>

              {/* Detail */}
              {card.detail && (
                <p className="font-body text-[14px] text-eai-parchment/40 mb-6">
                  {card.detail}
                </p>
              )}

              {/* CTA */}
              {card.isLink ? (
                <a
                  href={card.href}
                  onClick={card.action}
                  target={card.external ? '_blank' : undefined}
                  rel={card.external ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass group-hover:text-eai-brass-soft transition-colors"
                >
                  {card.cta}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              ) : (
                <button
                  onClick={card.action}
                  className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.15em] text-eai-brass group-hover:text-eai-brass-soft transition-colors"
                >
                  {card.cta}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
