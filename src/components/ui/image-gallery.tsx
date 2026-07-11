"use client";

import { cn } from "@/lib/utils";

export type MediaItem = {
  src: string;
  type: "image" | "video";
};

interface ImageGalleryProps {
  title?: string;
  description?: string;
  mediaItems: readonly MediaItem[];
}

export default function ImageGallery({
  title = "Our Latest Creations",
  description = "A visual collection of our most recent works – each piece crafted with intention, emotion, and style.",
  mediaItems,
}: ImageGalleryProps) {
  return (
    <section className="w-full flex flex-col items-center justify-start py-12 bg-[var(--color-eai-charcoal)] text-white">
      <div className="max-w-3xl text-center px-4">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-400 mt-2">{description}</p>
      </div>

      <div className="flex items-center gap-2 h-[400px] w-full mt-10 px-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
        {mediaItems.map((item, idx) => (
          <div
            key={idx}
            className="relative group flex-shrink-0 transition-all rounded-lg overflow-hidden h-[250px] md:h-[350px] w-[150px] md:w-[250px] duration-500 hover:w-[250px] md:hover:w-[450px] snap-center"
          >
            {item.type === "image" ? (
              <img
                className="h-full w-full object-cover object-center"
                src={item.src}
                alt={`gallery-item-${idx}`}
              />
            ) : (
              <video
                className="h-full w-full object-cover object-center"
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
