import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CldImage } from '../../../shared/atoms/CldImage';

interface Slide {
  id: number;
  title: React.ReactNode;
  description: string;
  image?: string;
  imageKey?: string;
  link: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: (
      <>
        5 Asian <span className="border-b-4 border-white">city-and-beach pairings</span> to try <span className="border-b-4 border-white">this winter</span>
      </>
    ),
    description: "Find time for urban frenzies and total relaxation with these combos.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 2,
    title: (
      <>
        Discover <span className="border-b-4 border-white">hidden waterfall trails</span> in the <span className="border-b-4 border-white">Cardamom Mountains</span>
      </>
    ),
    description: "Deep jungle exploration meets community-led conservation efforts.",
    image: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  },
  {
    id: 3,
    title: (
      <>
        Living on water: <span className="border-b-4 border-white">Floating village faves</span> to check out <span className="border-b-4 border-white">now</span>
      </>
    ),
    description: "A unique look into aquatic ecosystems and sustainable living on Tonle Sap.",
    image: "https://images.unsplash.com/photo-1596401057633-531035ef8694?q=80&w=2000&auto=format&fit=crop",
    link: "#"
  }
];

interface HeroSliderProps {
  slides?: Slide[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const activeSlides = slides && slides.length ? slides : SLIDES;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % activeSlides.length);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-3xl mb-12 shadow-2xl group">
      {/* Slides */}
      {activeSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Background Image */}
          <CldImage
            src={slide.image}
            assetKey={slide.imageKey}
            alt="Travel Destination"
            className="w-full h-full object-cover"
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Content */}
          <div className="absolute bottom-12 left-12 right-12 z-20">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight max-w-5xl tracking-tight">
              {slide.title}
            </h1>
            <p className="text-stone-200 text-lg md:text-xl font-medium mb-8 max-w-2xl opacity-90">
              {slide.description}
            </p>
            <button className="bg-white text-stone-900 rounded-full px-10 py-3.5 font-bold hover:bg-stone-100 transition-all shadow-xl hover:scale-105">
              Read more
            </button>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-stone-900 shadow-xl z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-stone-50"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-stone-900 shadow-xl z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-stone-50"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {activeSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-white' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
