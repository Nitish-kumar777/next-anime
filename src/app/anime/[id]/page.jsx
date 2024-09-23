"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TopAnime from '@/components/Top'
import AnimePage from '@/components/AnimePage'


const AnimeDetails = () => {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  const handleEp = () =>{
    router.push("/ep")
  }

  useEffect(() => {
    if (id) {
      const fetchAnimeDetails = async () => {
        try {
          const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
          const data = await res.json();
          setAnime(data.data);
        } catch (error) {
          console.error('Error fetching anime details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchAnimeDetails();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!anime) return <p>No anime data found.</p>;

  return (
    <><div style={{ display: 'flex', color: '#fff', backgroundColor: '#1c1c1c', padding: '20px', borderRadius: '10px' }}>
      <div style={{ marginRight: '20px' }}>
        <img src={anime.images?.jpg?.image_url} alt={anime.title} style={{ borderRadius: '10px', width: '250px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <div>
            <button style={{ backgroundColor: '#ff4d4f', padding: '10px 20px', borderRadius: '5px', color: '#fff', border: 'none', cursor: 'pointer' }}>Follow</button>
          </div>
          <div>
            <button style={{ backgroundColor: '#ffa940', padding: '10px 20px', borderRadius: '5px', color: '#fff', border: 'none', cursor: 'pointer' }}
            onClick={handleEp}
            >Watch Now</button>
          </div>
        </div>
      </div>

      <div>
        <h1 style={{ color: '#fff' }}>{anime.title}</h1>
        <p><strong>Original Name:</strong> {anime.title_japanese}</p>
        <p><strong>Rating:</strong> {anime.score}/10</p>
        <p><strong></strong> {anime.synopsis}</p>
        <div style={{ marginTop: '20px', color: '#b0b0b0' }}>
          <p><strong>Type:</strong> TV Series</p>
          <p><strong>Status:</strong> {anime.status || 'Unknown'}</p>
          <p><strong>Genre:</strong> {anime.genres.map(genre => genre.name).join(', ')}</p>
          <p><strong>Duration:</strong> {anime.duration || 'N/A'}</p>
          <p><strong>Quality:</strong> HD</p>
          <p><strong>Views:</strong> {anime.members || 'N/A'}</p>
          <p><strong>Release Date:</strong> {anime.aired?.string || 'N/A'}</p>

        </div>
      </div>

    </div>
      <div style={{ maxWidth: '1170px', display: "flex", margin: "auto" }}>
        <AnimePage />
        <TopAnime />
      </div>
    </>
  );
};

export default AnimeDetails;
