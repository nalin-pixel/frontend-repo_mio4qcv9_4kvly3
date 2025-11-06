import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnimeRow from './components/AnimeRow';
import Footer from './components/Footer';

// Minimal client-side data fetching from open anime APIs (no backend dependency required here)
async function fetchAniListSection(query, variables) {
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const json = await res.json();
    return json?.data?.Page?.media || [];
  } catch (e) {
    console.error('AniList fetch failed', e);
    return [];
  }
}

const BASE_QUERY = `
  query ($page: Int, $perPage: Int, $sort: [MediaSort], $genre: String) {
    Page(page: $page, perPage: $perPage) {
      media(type: ANIME, sort: $sort, genre: $genre, status_in: [RELEASING, FINISHED, NOT_YET_RELEASED]) {
        id
        title { romaji english }
        coverImage { large }
        averageScore
        startDate { year }
      }
    }
  }
`;

export default function App() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [action, setAction] = useState([]);

  // My List using localStorage
  const [myList, setMyList] = useState(() => {
    try { return JSON.parse(localStorage.getItem('aniflix_mylist') || '[]'); } catch { return []; }
  });
  useEffect(() => {
    localStorage.setItem('aniflix_mylist', JSON.stringify(myList));
  }, [myList]);

  useEffect(() => {
    const load = async () => {
      const [trend, pop, top, act] = await Promise.all([
        fetchAniListSection(BASE_QUERY, { page: 1, perPage: 20, sort: ['TRENDING_DESC'] }),
        fetchAniListSection(BASE_QUERY, { page: 1, perPage: 20, sort: ['POPULARITY_DESC'] }),
        fetchAniListSection(BASE_QUERY, { page: 1, perPage: 20, sort: ['SCORE_DESC'] }),
        fetchAniListSection(BASE_QUERY, { page: 1, perPage: 20, sort: ['POPULARITY_DESC'], genre: 'Action' }),
      ]);
      setTrending(trend);
      setPopular(pop);
      setTopRated(top);
      setAction(act);
    };
    load();
  }, []);

  const featured = useMemo(() => trending.slice(0, 5).map((m) => ({
    id: m.id,
    title: m.title?.english || m.title?.romaji,
    description: 'Dive into this hit series loved by anime fans around the world.',
    rating: m.averageScore ? Number(m.averageScore) / 10 : undefined,
    year: m.startDate?.year,
  })), [trending]);

  const addToList = (item) => {
    setMyList((prev) => {
      if (prev.find((p) => p.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero featured={featured} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="h-6" />
        <AnimeRow title="Trending Now" items={trending} onBookmark={addToList} />
        <AnimeRow title="Popular This Week" items={popular} onBookmark={addToList} />
        <AnimeRow title="Top Rated Anime" items={topRated} onBookmark={addToList} />
        <AnimeRow title="Action Spotlight" items={action} onBookmark={addToList} />
        {myList.length > 0 && (
          <AnimeRow title="My List" items={myList} onBookmark={addToList} />
        )}
      </main>

      <Footer />
    </div>
  );
}
