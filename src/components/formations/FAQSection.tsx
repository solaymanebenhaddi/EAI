'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

export function FAQSection() {
  const t = useTranslations('Formations');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  const faqs = t.raw('faqs') as Array<{ question: string; answer: string }>;

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-eai-parchment/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-eai-brass" />
              <span className="font-body text-[10px] uppercase tracking-[0.25em] text-eai-brass">
                FAQ
              </span>
            </div>
            <h2 className="font-display text-display-sm text-eai-ink leading-[0.95] tracking-tight">
              {t('faqTitle')}
            </h2>
          </motion.div>

          {/* FAQ items */}
          <div className="flex flex-col gap-0">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="border-b border-eai-line last:border-b-0"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-display text-lg text-eai-ink pr-8 group-hover:text-eai-brass transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-eai-warm-grey transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="font-body text-[14px] text-eai-warm-grey leading-relaxed pb-6">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
