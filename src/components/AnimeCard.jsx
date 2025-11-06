import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function AnimeCard({ item, onClick, onBookmark }) {
  const title = item?.title?.english || item?.title?.romaji || item?.title || 'Untitled Anime';
  const image = item?.image || item?.coverImage?.large || item?.poster || 'https://placehold.co/300x450/0b0b0b/ffffff?text=Anime';
  const rating = (item?.rating || item?.averageScore || 0) / (item?.rating ? 10 : 1);
  const year = item?.year || (item?.startDate && item?.startDate.year) || '—';

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-40 sm:w-44 md:w-48 shrink-0 cursor-pointer"
      onClick={() => onClick?.(item)}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-white/5">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onBookmark?.(item);
          }}
          className="absolute top-2 right-2 z-10 px-2 py-1 rounded bg-black/60 text-xs text-white border border-white/10 hover:bg-black/80"
        >
          + My List
        </button>
        <div className="absolute bottom-2 left-2 right-2">
          <p className="text-sm font-semibold leading-tight line-clamp-2">{title}</p>
          <div className="mt-1 flex items-center gap-2 text-xs text-gray-300">
            <span className="inline-flex items-center gap-1"><Star size={14} className="text-yellow-400" />{rating ? (Math.round((rating + Number.EPSILON) * 10) / 10).toFixed(1) : '—'}</span>
            <span>•</span>
            <span>{year}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
