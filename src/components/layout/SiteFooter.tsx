"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { siteData } from "@/data/site"

gsap.registerPlugin(ScrollTrigger)

const navigationLinks = [
  { label: "Accueil", id: "hero" },
  { label: "Expertises", id: "expertises" },
  { label: "Méthode", id: "methode" },
  { label: "Contact", id: "contact" },
]

const expertiseLabels = [
  "Architecture d'intérieur",
  "Urbanisme",
  "BIM Consulting",
  "Topographie",
  "Études de faisabilité",
]

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const tFooter = useTranslations("Footer")

  useEffect(() => {
    const footer = footerRef.current
    if (!footer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const context = gsap.context(() => {
      gsap.from(footer, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 95%",
        },
      })
    }, footer)

    return () => context.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="bg-[var(--color-eai-charcoal)] text-[var(--color-eai-paper)] px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-[11px] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <span className="text-[var(--color-eai-olive)] uppercase tracking-[0.16em] font-semibold text-[10px]">
          {tFooter("brand")}
        </span>
        <p className="text-white/50 mt-4 leading-relaxed text-xs max-w-[250px]">
          {tFooter("desc")}
        </p>
      </div>

      <nav className="hidden md:block relative z-10" aria-label={tFooter("navTitle")}>
        <span className="text-[var(--color-eai-olive)] uppercase tracking-[0.16em] font-semibold text-[10px]">
          {tFooter("navTitle")}
        </span>
        <div className="mt-4 flex flex-col gap-2 text-white/60 text-xs">
          {navigationLinks.map((link) => (
            <Link
              key={link.id}
              href={`/#${link.id}`}
              className="hover:text-[var(--color-eai-olive)] focus-visible:text-[var(--color-eai-olive)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-eai-olive)] transition-colors w-fit font-semibold no-underline"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/careers"
            className="hover:text-[var(--color-eai-olive)] focus-visible:text-[var(--color-eai-olive)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-eai-olive)] transition-colors w-fit no-underline"
          >
            Carrières
          </Link>
        </div>
      </nav>

      <div className="hidden md:block relative z-10">
        <span className="text-[var(--color-eai-olive)] uppercase tracking-[0.16em] font-semibold text-[10px]">
          {tFooter("expTitle")}
        </span>
        <div className="mt-4 flex flex-col gap-2 text-white/60 text-xs">
          {expertiseLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <span className="text-[var(--color-eai-olive)] uppercase tracking-[0.16em] font-semibold text-[10px]">
          {tFooter("contactTitle")}
        </span>
        <div className="mt-4 flex flex-col gap-2 text-white/60 text-xs font-sans">
          <a
            href={`mailto:${siteData.contact.email}`}
            className="hover:text-[var(--color-eai-olive)] focus-visible:text-[var(--color-eai-olive)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-eai-olive)] transition-colors w-fit"
          >
            {siteData.contact.email}
          </a>
          <div className="flex flex-col gap-1">
            <a href="tel:+212666798536" className="hover:text-[var(--color-eai-olive)] transition-colors w-fit">+212 666 798536</a>
            <a href="tel:+212688018863" className="hover:text-[var(--color-eai-olive)] transition-colors w-fit">+212 688 01 88 63</a>
            <a href="tel:+212520198738" className="hover:text-[var(--color-eai-olive)] transition-colors w-fit">+212 520 198738</a>
          </div>
          <span>{siteData.contact.address}</span>
        </div>
      </div>

      <div className="col-span-2 md:col-span-4 border-t border-white/10 pt-6 mt-4 text-white/40 text-[10px] relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-4">
          {siteData.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              aria-label={social.platform}
            >
              {social.platform}
            </a>
          ))}
        </div>
        <span>© {new Date().getFullYear()} {tFooter("brand")}. {tFooter("rights")}</span>
        <span className="tracking-[0.14em] uppercase text-[9px]">{tFooter("slogan")}</span>
      </div>
    </footer>
  )
}
