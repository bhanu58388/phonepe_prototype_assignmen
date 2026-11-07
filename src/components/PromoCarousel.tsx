import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PROMO_BANNERS } from '../data/mockData';

interface PromoCarouselProps {
  onSelectBannerAction: (action: string) => void;
}

export const PromoCarousel: React.FC<PromoCarouselProps> = ({ onSelectBannerAction }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMO_BANNERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + PROMO_BANNERS.length) % PROMO_BANNERS.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % PROMO_BANNERS.length);
  };

  const currentBanner = PROMO_BANNERS[currentIndex];

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 dark:border-slate-800 bg-slate-900 group">
      {/* Banner image with smooth transition */}
      <div
        onClick={() => onSelectBannerAction(currentBanner.action)}
        className="cursor-pointer aspect-[16/8] sm:aspect-[16/7] relative w-full overflow-hidden"
      >
        <img
          src={currentBanner.image}
          alt={currentBanner.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Subtle scrim overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-white text-xs sm:text-sm font-bold tracking-tight drop-shadow-md">
                {currentBanner.title}
              </p>
              <p className="text-white/80 text-[10px] sm:text-xs line-clamp-1">
                {currentBanner.subtitle}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectBannerAction(currentBanner.action);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#5f259f] text-white font-semibold text-[11px] sm:text-xs shrink-0 shadow hover:bg-[#6f2dbd] transition-colors"
            >
              {currentBanner.cta}
            </button>
          </div>
        </div>
      </div>

      {/* Prev / Next arrows on hover */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
        aria-label="Previous banner"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
        aria-label="Next banner"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Pagination indicators */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none">
        {PROMO_BANNERS.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
