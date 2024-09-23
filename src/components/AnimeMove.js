"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/AnimePage.module.css'; 
import { FaComment, FaEye } from 'react-icons/fa';

const AnimeMove = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAnimeWithTimeout = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 100); // 10 seconds timeout

      try {
        const res = await fetch('https://api.jikan.moe/v4/anime?q=move&sfw', {
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();

        if (data.data && Array.isArray(data.data)) {
          setAnimeList(data.data.slice(0, 12));
        } else {
          setError('No anime found.');
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          setError('Please Click on View All');
        } else {
          setError('Error fetching data: ' + error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeWithTimeout();
  }, []);

  const handleCardClick = (id) => {
    router.push(`/anime/${id}`);
  };

  const handleViewAllClick = () => {
    router.push('/categories'); // Adjust this route based on where your full list is located
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Anime Move</h1>
        <button className={styles.viewAllButton} onClick={handleViewAllClick}>View All</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : animeList.length > 0 ? (
        <div className={styles.grid}>
          {animeList.map((anime) => (
            <div
              key={anime.mal_id}
              className={styles.card}
              onClick={() => handleCardClick(anime.mal_id)}
            >
              <div className={styles.imageContainer}>
                <img 
                  src={anime.images?.jpg?.image_url} 
                  alt={anime.title} 
                  className={styles.image}
                />
                <div className={styles.badges}>
                  <span className={styles.episodeBadge}>{anime.episodes || 'N/A'} / {anime.episodes || 'N/A'}</span>
                  <span className={styles.commentsBadge}><FaComment/> 11</span>
                  <span className={styles.viewsBadge}><FaEye/> 9141</span>
                </div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.h3}>{anime.title}</h3>
                <p className={styles.tags}>
                  <span className={styles.tag}>Active</span>
                  <span className={styles.tag}>Movie</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Please Go this way
          <button className={styles.viewAllButton} onClick={handleViewAllClick}>View All</button>
        </p>
      )}
    </div>
  );
};

export default AnimeMove;
