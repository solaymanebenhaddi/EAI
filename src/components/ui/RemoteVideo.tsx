"use client"

import React, { useState, useEffect, useRef } from 'react'
import { PlayCircle } from 'lucide-react'
import { VideoRatio, VideoProvider } from '@/data/videoConfig'

interface RemoteVideoProps {
  url: string;
  provider: VideoProvider;
  aspectRatio?: VideoRatio;
  poster?: string;
  title: string;
  className?: string;
  autoPlay?: boolean;
  playOnHover?: boolean;
}

export default function RemoteVideo({ 
  url, 
  provider, 
  aspectRatio = '16:9', 
  poster, 
  title,
  className = '',
  autoPlay = false,
  playOnHover = false
}: RemoteVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoPlay) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [autoPlay]);

  // Parse youtube URL
  const getYoutubeEmbedUrl = (urlStr: string) => {
    try {
      const urlObj = new URL(urlStr);
      let videoId = '';
      if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
        if (urlObj.pathname.includes('/shorts/')) {
          videoId = urlObj.pathname.split('/shorts/')[1].split('?')[0];
        } else if (urlObj.hostname === 'youtu.be') {
          videoId = urlObj.pathname.slice(1);
        } else {
          videoId = urlObj.searchParams.get('v') || '';
        }
      }
      let params = '?autoplay=1&rel=0';
      if (autoPlay) {
        params += `&mute=1&playlist=${videoId}&loop=1`;
      }
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}${params}` : '';
    } catch (e) {
      return '';
    }
  }

  // Handle aspect ratio class
  const ratioClass = 
    aspectRatio === '9:16' ? 'aspect-[9/16]' : 
    aspectRatio === '4:3' ? 'aspect-[4/3]' : 
    aspectRatio === '1:1' ? 'aspect-square' : 
    'aspect-video'; // 16:9

  const renderPlayer = () => {
    if (provider === 'youtube') {
      const embedUrl = getYoutubeEmbedUrl(url);
      if (!embedUrl) {
        setHasError(true);
        return null;
      }
      return (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      );
    }
    
    if (provider === 'vimeo') {
      return (
        <iframe
          src={url}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      );
    }

    if (provider === 'direct') {
      return (
        <video
          src={url}
          title={title}
          controls={!playOnHover}
          autoPlay
          muted={autoPlay || playOnHover}
          loop={autoPlay || playOnHover}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={poster}
          onError={() => setHasError(true)}
        />
      );
    }
    return null;
  }

  if (hasError) {
    return (
      <div className={`relative w-full bg-[var(--color-eai-charcoal)] text-[var(--color-eai-paper)] flex flex-col items-center justify-center rounded-xl overflow-hidden ${ratioClass} ${className}`}>
        <p className="text-sm opacity-60 text-center px-4">Cette vidéo est momentanément indisponible.</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="mt-4 text-xs font-bold uppercase tracking-widest text-[var(--color-eai-olive)] hover:underline border border-[var(--color-eai-olive)]/30 px-4 py-2 rounded-full">
          Voir la vidéo
        </a>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full bg-[var(--color-eai-charcoal)]/5 rounded-xl overflow-hidden ${ratioClass} group ${className}`}
      onMouseEnter={() => {
        if (playOnHover) setIsPlaying(true);
      }}
      onMouseLeave={() => {
        if (playOnHover) setIsPlaying(false);
      }}
    >
      {!isPlaying ? (
        <div 
          className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
          onClick={() => setIsPlaying(true)}
          role="button"
          tabIndex={0}
          aria-label={`Lire la vidéo : ${title}`}
          onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') setIsPlaying(true) }}
        >
          {poster ? (
            <img src={poster} alt={title} className="absolute inset-0 w-full h-full object-cover -z-10" loading="lazy" />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[var(--color-eai-charcoal)]/80 to-[var(--color-eai-charcoal)] -z-10" />
          )}
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <PlayCircle className="w-10 h-10 md:w-12 md:h-12 text-[var(--color-eai-olive)]" />
          </div>
        </div>
      ) : (
        renderPlayer()
      )}
    </div>
  )
}
