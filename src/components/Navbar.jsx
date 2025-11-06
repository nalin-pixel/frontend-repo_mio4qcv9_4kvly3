import { useEffect, useState } from 'react';
import { Search, ChevronDown, Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
      scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-gradient-to-b from-black/70 to-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between text-white">
        <div className="flex items-center gap-8">
          <a href="#" className="text-xl sm:text-2xl font-extrabold tracking-tight">
            <span className="text-white">Ani</span>
            <span className="text-[#E50914]">Flix</span>
          </a>
          <ul className="hidden md:flex items-center gap-6 text-sm text-gray-2 00">
            <li><a className="hover:text-white" href="#home">Home</a></li>
            <li className="group relative cursor-pointer flex items-center gap-1">
              <a className="hover:text-white" href="#genres">Genres</a>
              <ChevronDown size={16} className="opacity-60 group-hover:opacity-100" />
            </li>
            <li><a className="hover:text-white" href="#mylist">My List</a></li>
            <li><a className="hover:text-white" href="#new">New Releases</a></li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <button aria-label="Search" className="p-2 rounded-full bg-white/10 hover:bg-white/20">
            <Search size={18} />
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <User size={16} />
            </div>
            <ChevronDown size={16} className="opacity-70" />
          </div>
          <button className="md:hidden p-2 rounded bg-white/10" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 text-gray-200 space-y-3">
            <a className="block" href="#home" onClick={() => setMobileOpen(false)}>Home</a>
            <a className="block" href="#genres" onClick={() => setMobileOpen(false)}>Genres</a>
            <a className="block" href="#mylist" onClick={() => setMobileOpen(false)}>My List</a>
            <a className="block" href="#new" onClick={() => setMobileOpen(false)}>New Releases</a>
          </div>
        </div>
      )}
    </header>
  );
}
