"use client"

import { useEffect, useState } from 'react';

export default function AllEpisodes({ params }) {
  const { folderId } = params; // Extract folderId from params in app directory
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the specific anime data by folder ID
  useEffect(() => {
    if (folderId) {
      const fetchAnime = async () => {
        try {
          const res = await fetch('/api/getAnimeData'); // Fetch all anime data
          const data = await res.json();

          if (data.success) {
            const selectedAnime = data.data.find(
              (a) => a.animeTitle === decodeURIComponent(folderId)
            );
            setAnime(selectedAnime || null);
          } else {
            setError('Anime not found');
          }
        } catch (err) {
          setError('An error occurred while fetching data');
        } finally {
          setLoading(false);
        }
      };

      fetchAnime();
    }
  }, [folderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!anime) {
    return <div>Anime not found</div>;
  }

  return (
    <div>
      <h1>{anime.animeTitle} - Episodes</h1>
      {anime.episodes.length > 0 ? (
        <div className="episodes-list">
          {anime.episodes.map((episode, index) => (
            <div key={index} className="episode-card">
              <h2>{episode.title}</h2>
              <video controls width="400">
                <source src={episode.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      ) : (
        <p>No episodes available</p>
      )}

      <style jsx>{`
        .episodes-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .episode-card {
          border: 1px solid #ccc;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
        }
        video {
          width: 100%;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
