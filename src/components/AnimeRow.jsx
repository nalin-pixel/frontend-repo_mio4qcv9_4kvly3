import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimeCard from './AnimeCard';

export default function AnimeRow({ title, items = [], onItemClick, onBookmark }) {
  const scroller = useRef(null);

  const scrollBy = (dir) => {
    const el = scroller.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9) * (dir === 'left' ? -1 : 1);
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="relative py-4">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
        <div className="hidden sm:flex gap-2">
          <button onClick={() => scrollBy('left')} className="p-2 rounded bg-white/10 hover:bg-white/20 text-white"><ChevronLeft size={18} /></button>
          <button onClick={() => scrollBy('right')} className="p-2 rounded bg-white/10 hover:bg-white/20 text-white"><ChevronRight size={18} /></button>
        </div>
      </div>
      <div
        ref={scroller}
        className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-white/20"
      >
        {items.map((item) => (
          <AnimeCard key={item.id || item._id || item.mal_id || item.title} item={item} onClick={onItemClick} onBookmark={onBookmark} />
        ))}
      </div>
      <div className="sm:hidden mt-3 flex justify-end gap-2">
        <button onClick={() => scrollBy('left')} className="p-2 rounded bg-white/10 hover:bg-white/20 text-white"><ChevronLeft size={18} /></button>
        <button onClick={() => scrollBy('right')} className="p-2 rounded bg-white/10 hover:bg-white/20 text-white"><ChevronRight size={18} /></button>
      </div>
    </section>
  );
}
