"use client";

import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from 'next/navigation';
import styles from '../styles/AnimeSlider.module.css'; 

const AnimeSlider = () => {
  const router = useRouter();

  // Static image array
  const animeList = [
    {
      mal_id: 1,
      title: 'Attack on Titan',
      image_url: '/Attack_on_Titan.jpg', // Replace with actual image path
    },
    {
      mal_id: 2,
      title: 'Demon Slayer',
      image_url: '/Demon_Slayer.webp', // Replace with actual image path
    },
    {
      mal_id: 3,
      title: 'My Hero Academia',
      image_url: '/My_Hero_Academia.jpg', // Replace with actual image path
    },
    {
      mal_id: 4,
      title: 'One Piece',
      image_url: '/One_Piece.jpg', // Replace with actual image path
    },
    {
      mal_id: 5,
      title: 'Jujutsu Kaisen',
      image_url: '/Jujutsu_Kaisen.jpg', // Replace with actual image path
    }
  ];


  const handleClickWatch = () => {
    router.push("/ep");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {animeList.map((anime) => (
          <div
            key={anime.mal_id}
            className={styles.slide}
            onClick={handleClickWatch}
          >
            <div className={styles.imageWrapper}>
              <img 
                src={anime.image_url} 
                alt={anime.title} 
                className={styles.image}
              />
            </div>
            <div className={styles.info}>
              <h3>{anime.title}</h3>
              <button className={styles.watchNowBtn} onClick={handleClickWatch}>
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AnimeSlider;
