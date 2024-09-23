"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AnimeList() {
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch anime data from the API
  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const res = await fetch('/api/getAnimeData'); // Use the correct API route
        const data = await res.json();

        if (data.success) {
          setAnimeData(data.data);
        } else {
          setError(data.message || 'Failed to load data');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle click on the cover image
  const handleCoverClick = (animeTitle) => {
    router.push(`/allepisodes/${encodeURIComponent(animeTitle)}`);
  };

  return (
    <div>
      <h1>Anime List</h1>
      {animeData.length === 0 && <p>No anime found</p>}
      <div className="anime-list">
        {animeData.map((anime, index) => (
          <div key={index} className="anime-card">
            <h2>{anime.animeTitle}</h2>
            {anime.coverImage ? (
              <img
                src={anime.coverImage}
                alt={`${anime.animeTitle} cover`}
                width="200"
                style={{ cursor: 'pointer' }} // Add pointer cursor
                onClick={() => handleCoverClick(anime.animeTitle)} // Redirect on click
              />
            ) : (
              <p>No cover image available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
