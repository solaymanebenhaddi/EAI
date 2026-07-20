'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocale } from 'next-intl';

const content = {
  fr: {
    badge: "Dans la presse",
    title: "Presse & Médias",
    desc: "Explorez notre dernière couverture médiatique, nos interviews télévisées et les temps forts de la presse concernant nos événements. Nos initiatives continues attirent régulièrement l'attention des principales publications du secteur et des réseaux de diffusion nationaux, renforçant notre position de leader dans l'innovation architecturale et le développement durable au Maghreb.",
    coverage: "Couverture Médiatique",
    releases: "Communiqués de Presse",
    interviews: "Interviews Officielles",
    download: "Télécharger le kit presse"
  },
  en: {
    badge: "In the News",
    title: "Press & Media",
    desc: "Explore the latest media coverage, television interviews, and press highlights from our events. Our ongoing initiatives consistently capture the attention of leading industry publications and national broadcast networks, reinforcing our position as a leader in architectural innovation and sustainable development across the Maghreb.",
    coverage: "Media Coverage",
    releases: "Press Releases",
    interviews: "Official Interviews",
    download: "Download Press Kit"
  },
  es: {
    badge: "En las noticias",
    title: "Prensa y Medios",
    desc: "Explore nuestra cobertura mediática más reciente, entrevistas en televisión y los momentos destacados de la prensa sobre nuestros eventos. Nuestras iniciativas continuas atraen constantemente la atención de las principales publicaciones de la industria y las redes nacionales de transmisión, reforzando nuestra posición como líderes en innovación arquitectónica y desarrollo sostenible en el Magreb.",
    coverage: "Cobertura Mediática",
    releases: "Comunicados de Prensa",
    interviews: "Entrevistas Oficiales",
    download: "Descargar Kit de Prensa"
  },
  it: {
    badge: "Nelle Notizie",
    title: "Stampa e Media",
    desc: "Esplora le ultime coperture mediatiche, interviste televisive e momenti salienti della stampa sui nostri eventi. Le nostre iniziative continue catturano costantemente l'attenzione delle principali testate di settore e delle reti nazionali, rafforzando la nostra posizione di leader nell'innovazione architettonica e nello sviluppo sostenibile nel Maghreb.",
    coverage: "Copertura Mediatica",
    releases: "Comunicati Stampa",
    interviews: "Interviste Ufficiali",
    download: "Scarica il Press Kit"
  },
  ar: {
    badge: "في الأخبار",
    title: "الصحافة والإعلام",
    desc: "اكتشف أحدث التغطيات الإعلامية والمقابلات التلفزيونية وأبرز ما تناولته الصحافة حول فعالياتنا. تستقطب مبادراتنا المستمرة اهتمام أبرز المنشورات المتخصصة وشبكات البث الوطنية، مما يعزز مكانتنا الرائدة في الابتكار المعماري والتنمية المستدامة في المغرب العربي.",
    coverage: "التغطية الإعلامية",
    releases: "بيانات صحفية",
    interviews: "مقابلات رسمية",
    download: "تحميل الملف الصحفي"
  }
};

// ---- Default data -----------------------------------------------------
// Swap this for a prop, a CMS fetch, or a JSON import.
const DEFAULT_VIDEOS = [
  { id:'1',  title:'Event Highlights Reel', src:'https://events.eai-construction.com/wp-content/uploads/2025/02/VID-20250209-WA0002.mp4', thumbnail:'https://events.eai-construction.com/wp-content/uploads/2025/02/1.jpg' },
  { id:'2',  title:'Networking Sessions',   src:'https://events.eai-construction.com/wp-content/uploads/2025/02/VID-20250209-WA0003.mp4', thumbnail:'https://events.eai-construction.com/wp-content/uploads/2025/02/2.jpg' },
  { id:'3',  title:'Design Showcase',       src:'https://events.eai-construction.com/wp-content/uploads/2025/02/VID-20250209-WA0004.mp4', thumbnail:'https://events.eai-construction.com/wp-content/uploads/2025/02/3.jpg' },
  { id:'6',  title:'Innovation Panel',      src:'https://events.eai-construction.com/wp-content/uploads/2025/02/alouala.mp4', thumbnail:'https://events.eai-construction.com/wp-content/uploads/2025/02/4.jpg' },
  { id:'7',  title:'Workshop Moments',      src:'https://events.eai-construction.com/wp-content/uploads/2025/02/WhatsApp-Video-2025-02-08-at-14.04.11_206f1df2.mp4', thumbnail:'https://events.eai-construction.com/wp-content/uploads/2025/02/5.jpg' },
  { id:'8',  title:'Exhibition Floor',      src:'https://events.eai-construction.com/wp-content/uploads/2025/02/WhatsApp-Video-2025-02-08-at-14.10.03_926746d4.mp4', thumbnail:'https://events.eai-construction.com/wp-content/uploads/2025/02/6.jpg' },
  { id:'12', title:'Evening Gala',          src:'https://events.eai-construction.com/wp-content/uploads/2025/02/WhatsApp-Video-2025-02-08-at-22.49.18_46605ab3.mp4', thumbnail:'https://events.eai-construction.com/wp-content/uploads/2025/02/1.jpg' },
  { id:'13', title:'Keynote Address',       src:'https://events.eai-construction.com/wp-content/uploads/2025/02/WhatsApp-Video-2025-02-09-at-13.12.46_eb9cd8f3.mp4', thumbnail:'https://events.eai-construction.com/wp-content/uploads/2025/02/8.jpg' },
  { id:'14', title:'Behind the Scenes',     src:'https://events.eai-construction.com/wp-content/uploads/2025/02/WhatsApp-Video-2025-02-11-at-18.04.53_32d6b103.mp4', thumbnail:'https://events.eai-construction.com/wp-content/uploads/2025/08/logo.webp' },
  { id:'15', title:'FIDI 2023 Recap',       src:'https://events.eai-construction.com/wp-content/uploads/2023/10/FNDI.mp4', thumbnail:'https://events.eai-construction.com/wp-content/uploads/2025/03/test-fidi-23.jpg' },
  { id:'16', title:'Testimonial - Didier',  src:'https://events.eai-construction.com/wp-content/uploads/2023/10/testimonial-4.mp4', thumbnail:'https://events.eai-construction.com/wp-content/uploads/2023/10/didier.jpg' },
  { id:'17', title:'Testimonial - Ibrahim', src:'https://events.eai-construction.com/wp-content/uploads/2023/10/testimonial-3.mp4', thumbnail:'https://events.eai-construction.com/wp-content/uploads/2023/10/ibrahim.jpg' },
  { id:'18', title:'Testimonial - Seifeddine', src:'https://events.eai-construction.com/wp-content/uploads/2023/10/testimonial-2.mp4', thumbnail:'https://events.eai-construction.com/wp-content/uploads/2023/10/seifeddine.jpg' },
  { id:'19', title:'Testimonial - Todi',    src:'https://events.eai-construction.com/wp-content/uploads/2023/10/testimonial-1.mp4', thumbnail:'https://events.eai-construction.com/wp-content/uploads/2023/10/todi.jpg' }
];

function getSlidesToShow(width: number) {
  if (width <= 640) return 1;
  if (width <= 1024) return 2;
  return 4;
}

export default function MediaPressSection({ videos = DEFAULT_VIDEOS }) {
  const locale = useLocale() as keyof typeof content;
  const t = content[locale] || content.fr;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeSrc, setActiveSrc] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const maxIndex = Math.max(videos.length - slidesToShow, 0);

  useEffect(() => {
    function handleResize() {
      const next = getSlidesToShow(window.innerWidth);
      setSlidesToShow(next);
      setCurrentIndex((prev) => Math.min(prev, Math.max(videos.length - next, 0)));
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [videos.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, maxIndex));
  }, [maxIndex]);

  // Keyboard navigation for the slider
  useEffect(() => {
    if (modalOpen) return; // Don't slide if modal is open
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, goPrev, goNext]);

  const openVideo = useCallback((src: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveSrc(src);
    setModalOpen(true);
    requestAnimationFrame(() => setModalVisible(true));
  }, []);

  const closeVideo = useCallback(() => {
    setModalVisible(false);
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch (err) {
        console.warn('Pause failed:', err);
      }
    }
    closeTimeoutRef.current = setTimeout(() => {
      setModalOpen(false);
      setActiveSrc('');
    }, 250);
  }, []);

  useEffect(() => {
    if (modalOpen && activeSrc && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [modalOpen, activeSrc]);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeVideo();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, closeVideo]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <section id="media-press-gallery">
      <div className="left-section">
        <div className="media-about">
          <div className="highlights-badge">
            <span className="badge-pulse" />
            <span>{t.badge}</span>
          </div>
          <h2>{t.title}</h2>
          <p>
            {t.desc}
          </p>
          <div className="media-kpis">
            <span>{t.coverage}</span>
            <span>{t.releases}</span>
            <span>{t.interviews}</span>
          </div>


        </div>
      </div>

      <div className="right-section">
        <div
          className="slider-container"
          style={{
            width: `${Math.max((videos.length / slidesToShow) * 100, 100)}%`,
            transform: `translateX(-${currentIndex * (100 / Math.max(videos.length, 1))}%)`
          }}
        >
          {videos.map((v) => (
            <div
              key={v.id}
              className="video-slide"
              style={{ width: `${100 / Math.max(videos.length, 1)}%` }}
              onClick={() => openVideo(v.src)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openVideo(v.src);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.thumbnail} alt={v.title} />
              <div className="video-overlay">
                <div className="play-button">▶</div>
              </div>
              <div className="video-caption">{v.title}</div>
            </div>
          ))}
        </div>

        <div className="slider-controls">
          <button
            className="slider-btn"
            aria-label="Previous videos"
            onClick={goPrev}
            disabled={currentIndex === 0}
          >
            ‹
          </button>
          <button
            className="slider-btn"
            aria-label="Next videos"
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
          >
            ›
          </button>
        </div>
      </div>

      {modalOpen && (
        <div
          id="videoModal"
          className={modalVisible ? 'active' : ''}
          onClick={(e: any) => {
            if (e.target.id === 'videoModal') closeVideo();
          }}
        >
          <div id="videoWrapper">
            <button id="closeBtn" aria-label="Close video" onClick={closeVideo}>
              ×
            </button>
            <video id="modalVideo" ref={videoRef} src={activeSrc} controls playsInline />
          </div>
        </div>
      )}

      <style jsx>{`
        #media-press-gallery {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          height: 100vh;
          background: #000;
          font-family: 'Raleway', sans-serif;
        }

        .left-section {
          flex: 0 0 40%;
          min-width: 340px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 50px 60px;
          background: linear-gradient(180deg, #0b0f1a 0%, #0f1222 100%);
          position: relative;
          z-index: 10;
        }

        .right-section {
          flex: 1;
          position: relative;
          overflow: hidden;
        }

        .media-about {
          position: relative;
          padding: 40px;
          background: rgba(15, 18, 34, 0.7);
          border-radius: 14px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
          overflow: hidden;
        }

        .highlights-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          margin-bottom: 18px;
          border-radius: 999px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: #d4af37;
          font-size: 12px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .badge-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #d4af37;
          box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.6);
          animation: pulse 1.8s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.6);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(212, 175, 55, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
          }
        }

        .media-about h2 {
          font-size: clamp(28px, 3vw, 46px);
          background: linear-gradient(135deg, #ffffff 0%, #c7d7ff 55%, #9fb7ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
          margin-bottom: 18px;
        }

        .media-about p {
          color: #cfd8ee;
          font-size: clamp(14px, 1.3vw, 17px);
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .media-kpis {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .media-kpis span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(58, 117, 255, 0.1);
          border: 1px solid rgba(122, 166, 255, 0.2);
          color: #cfe0ff;
          font-size: 13px;
        }

        .media-kpis span::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7aa6ff;
        }

        /* --- PRESS & MEDIA BUTTON --- */
        .press-media-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 28px;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .press-media-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .press-media-btn svg {
          width: 18px;
          height: 18px;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
        }

        .slider-container {
          display: flex;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .video-slide {
          height: 100%;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.4s ease;
          flex-shrink: 0;
        }

        .video-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.7);
          transition: all 0.6s ease;
        }

        .video-slide:hover img {
          transform: scale(1.05);
          filter: brightness(0.9);
        }

        .video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .video-slide:hover .video-overlay {
          opacity: 1;
        }

        .play-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(212, 175, 55, 0.2);
          border: 2px solid rgba(212, 175, 55, 0.8);
          color: #d4af37;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
        }

        .video-slide:hover .play-button {
          transform: scale(1.15);
          background: rgba(212, 175, 55, 0.3);
        }

        .video-caption {
          position: absolute;
          bottom: 25px;
          left: 20px;
          right: 20px;
          font-size: 16px;
          font-weight: 300;
          color: #fff;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
        }

        .slider-controls {
          position: absolute;
          bottom: 30px;
          right: 40px;
          display: flex;
          gap: 15px;
          z-index: 20;
        }

        .slider-btn {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: #d4af37;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .slider-btn:hover {
          background: rgba(212, 175, 55, 0.25);
          border-color: #d4af37;
          transform: scale(1.1);
        }

        .slider-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        #videoModal {
          display: flex;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          z-index: 99999;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease;
        }

        #videoModal.active {
          opacity: 1;
          pointer-events: auto;
        }

        #videoWrapper {
          position: relative;
          width: 90vw;
          max-width: 900px;
          background: #000;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(212, 175, 55, 0.2);
        }

        #closeBtn {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(212, 175, 55, 0.5);
          background: rgba(0, 0, 0, 0.7);
          color: #d4af37;
          font-size: 22px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 1;
        }

        #closeBtn:hover {
          background: rgba(212, 175, 55, 0.25);
          border-color: #d4af37;
          transform: scale(1.1);
        }

        #modalVideo {
          width: 100%;
          height: auto;
          max-height: 80vh;
          display: block;
        }

        @media (max-width: 1024px) {
          #media-press-gallery {
            flex-direction: column;
            height: auto;
          }
          .left-section,
          .right-section {
            width: 100%;
          }
          .left-section {
            padding: 40px 20px;
          }
        }

        @media (max-width: 640px) {
          .left-section {
            padding: 30px 20px;
          }
          .media-about {
            padding: 20px;
          }
          .video-caption {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}
