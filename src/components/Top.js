"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/TopAnime.module.css'; 
import { FaEye } from 'react-icons/fa';


const TopAnime = () => {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter(); // Import useRouter
  
    useEffect(() => {
      const fetchAnime = async () => {
        try {
          const res = await fetch('https://api.jikan.moe/v4/seasons/2024/summer');
          const data = await res.json();
  
          if (data.data && Array.isArray(data.data)) {
            setAnimeList(data.data.slice(0, 4)); // Limit to 4 items
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
      router.push(`/anime/${id}`); // Navigate to the detailed anime page
    };
  
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Top Views</h1>
          <div className={styles.timeFilters}>
            <span>Day</span>
            <span>Week</span>
            <span>Month</span>
            <span>Years</span>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : animeList.length > 0 ? (
          <div className={styles.grid}>
            {animeList.map((anime) => (
              <div 
                key={anime.mal_id} 
                className={styles.card} 
                onClick={() => handleCardClick(anime.mal_id)} // Add onClick handler
              >
                <div className={styles.imageContainer}>
                  <img 
                    src={anime.images?.jpg?.image_url} 
                    alt={anime.title} 
                    className={styles.image}
                  />
                  <div className={styles.badges}>
                    <span className={styles.episodeBadge}>{anime.episodes || '?'} / {anime.episodes || 'N/A'}</span>
                    <span className={styles.viewsBadge}><FaEye/> 9141</span>
                  </div>
                </div>
                <div className={styles.info}>
                  <h3 className={styles.h3}>{anime.title}</h3>
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
  
  export default TopAnime;