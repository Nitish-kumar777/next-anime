"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { FaSearch } from "react-icons/fa"; // Import search icon
import styles from "@/styles/Blogger.module.css";

const Blogger = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const apiKey = "AIzaSyDXCenFpr9_NwtiUzC2AeYIk-ferPZBs4I";
      const blogId = "3855413226337908943";
      const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setPosts(data.items || []);
        console.log("Fetched Data:", data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      gsap.to(`.${styles.post}`, {
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        y: 20,
        ease: "power2.out",
      });
    }
  }, [posts]);

  // Filter posts based on the search query
  const filteredPosts = searchQuery
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts; // Show all posts if searchQuery is empty

  return (
    <div className={styles.container}>
      <h1>All Anime ep</h1>
      <div className={styles.searchInputWrapper}>
        <input
          type="text"
          placeholder="Search by Anime name and ep..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <FaSearch className={styles.searchIcon} /> {/* Search Icon */}
      </div>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div key={post.id} className={styles.post}>
            <h2 className={styles.title}>{post.title}</h2>
            {post.author?.image?.url && (
              <img
                src={post.author.image.url.startsWith("//") ? `https:${post.author.image.url}` : post.author.image.url}
                alt={post.author.displayName}
                className={styles.image}
              />
            )}
            <p>
              <strong>Episode Link: </strong>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className={styles.url}>
                {post.url}
              </a>
            </p>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default Blogger;
