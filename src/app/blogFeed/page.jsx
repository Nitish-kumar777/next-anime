"use client"

import { useEffect, useState } from 'react';
import styles from './BlogFeed.module.css';
import { MdStart } from 'react-icons/md';

export default function BlogFeed() {
  const [blogs, setBlogs] = useState([]);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/getBlogs');
        const data = await res.json();
        setBlogs(data);  
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p style={{fontSize:"24px",display:"flex" , justifyContent:"center" , alignItems:"center", left:"50%",right:"50%",height:"80vh" }}>Loading... <MdStart style={{color:"red",fontSize:"24px"}}/> </p>; 
  }

  return (
    <div className={styles.blogContainer}>
      <div className={styles.header}>
        <h1>Our Blog</h1>
        <p>Welcome to the official Anime blog.</p>
      </div>
      <div className={styles.blogGrid}>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className={styles.blogCard}>
              <img src={blog.image} alt={blog.title} className={styles.blogImage} />
              <div className={styles.blogContent}>
                <p className={styles.blogDate}>📅 {blog.date}</p>
                <h2 className={styles.blogTitle}>{blog.title}</h2>
                <p className={styles.blogDescription}>{blog.description}</p>
                <a href={blog.instagramLink} target="_blank" rel="noopener noreferrer" className={styles.instagramLink}>
                  Instagram
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>
    </div>
  );
}
