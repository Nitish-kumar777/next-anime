"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/AnimePage.module.css'; 
import { FaComment, FaEye } from 'react-icons/fa';

const AnimePage = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch('https://api.jikan.moe/v4/anime?q=top%2050&sfw');
        const data = await res.json();

        if (data.data && Array.isArray(data.data)) {
          setAnimeList(data.data.slice(0, 50));  // Limit to 8 items
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  const handleCardClick = (id) => {
    router.push(`/anime/${id}`);
  };

  const handleViewAllClick = () => {
    router.push('/anime'); // Adjust this route based on where your full list is located
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>All Anime </h1>
      </div>
      {loading ? (
        <p>Loading...</p>
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
        <p>No anime found or unable to fetch data.</p>
      )}
    </div>
  );
};

export default AnimePage;
