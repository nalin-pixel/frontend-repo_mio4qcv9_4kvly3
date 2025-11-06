import { useEffect, useMemo, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';

const FALLBACK_FEATURED = {
  id: 'demon-slayer',
  title: 'Demon Slayer: Kimetsu no Yaiba',
  description:
    'Tanjiro joins the Demon Slayer Corps to avenge his family and cure his sister Nezuko in this gorgeously animated dark fantasy.',
  year: 2019,
  rating: 8.7,
  backdrop:
    'https://image.tmdb.org/t/p/original/7beyPIdjVwQG3Eyt6inUeJ8V4aR.jpg',
};

export default function Hero({ featured }) {
  const [index, setIndex] = useState(0);
  const items = useMemo(() => (featured && featured.length ? featured : [FALLBACK_FEATURED]), [featured]);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length]);

  const current = items[index] || FALLBACK_FEATURED;

  return (
    <section id="home" className="relative h-[70vh] sm:h-[80vh] w-full bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/ppI7eAudW7IbKhKs/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-end pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white/70">
              <span className="px-2 py-0.5 rounded bg-white/10 border border-white/10">Featured</span>
              <span>{current.year || '—'}</span>
              <span>•</span>
              <span>Rating {current.rating ?? '—'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight drop-shadow-lg">
              {current.title}
            </h1>
            <p className="mt-4 text-sm sm:text-base text-gray-200/90 max-w-xl">
              {current.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-[#E50914] hover:bg-[#f6121d] text-white font-semibold shadow-lg shadow-red-500/20">
                Watch Now
              </button>
              <button className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-white/15 hover:bg-white/25 text-white font-medium">
                More Info
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
