"use client";

import { useState } from 'react';
import styles from './AnimeUplod.module.css';

export default function VideoUpload() {
  const [video, setVideo] = useState(null);
  const [coverImage, setCoverImage] = useState(null); // Add state for cover image
  const [preview, setPreview] = useState('');
  const [imagpreview, setImgpreview] = useState('');
  const [title, setTitle] = useState('');
  const [episodeTitle, setEpisodeTitle] = useState(''); // Add state for episode title
  const [description, setDescription] = useState(''); // Add state for episode description
  const [coverDescription, setCoverDescription] = useState(''); // Add state for cover image description
  const [isLoading, setIsLoading] = useState(false);

  // Handle file input change for video
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      setPreview(URL.createObjectURL(file)); // Generate a preview URL for the video
    }
  };

  // Handle file input change for cover image
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file); // Set the cover image
      setImgpreview(URL.createObjectURL(file)); // Generate a preview URL for the video
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video || !title || !episodeTitle || !description) {
      alert('Please provide all required fields.');
      return;
    }

    setIsLoading(true); // Show loading state

    const formData = new FormData();
    formData.append('video', video);
    formData.append('coverImage', coverImage); // Add cover image to the form data
    formData.append('animeTitle', title); // Add the anime title
    formData.append('episodeTitle', episodeTitle); // Add the episode title
    formData.append('description', description); // Add the episode description
    formData.append('coverDescription', coverDescription); // Add the cover description

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert('Video and cover uploaded successfully');
        setVideo(null); // Clear the video input
        setCoverImage(null); // Clear the cover image input
        setPreview(''); // Clear the preview
        setImgpreview(''); // Clear the preview URL for the cover image
        setTitle(''); // Clear the title input
        setEpisodeTitle(''); // Clear the episode title input
        setDescription(''); // Clear the description input
        setCoverDescription(''); // Clear the cover description input
      } else {
        alert(`Upload failed: ${data.message}`);
      }
    } catch (error) {
      alert('An error occurred during the upload');
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <>
      <div>
        <h2 className={styles.container}>Upload Anime Episode</h2>
        <form className={styles.title} onSubmit={handleSubmit}>
          <input
          className={styles.input}
            type="text"
            placeholder="Anime Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
          <input
          className={styles.input}
            type="text"
            placeholder="Episode Title"
            value={episodeTitle}
            onChange={(e) => setEpisodeTitle(e.target.value)} />
          <input
          className={styles.input}
            type="text"
            placeholder="Episode Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
            Cover Image:
          <input
          className={styles.fileInput}
            type="file"
            onChange={handleCoverChange}
            accept="image/*" // Accept only image files for the cover
            placeholder="Cover Image" />
          {preview && <img className={styles.videoPreview} src={imagpreview} />}
          <input
          className={styles.input}
            type="text"
            placeholder="Cover Image Description" // Input for cover image description
            value={coverDescription}
            onChange={(e) => setCoverDescription(e.target.value)} />
            ep video:
          <input
          className={styles.fileInput}
            type="file"
            onChange={handleFileChange}
            accept="video/*" // Accept only video files for the episode
          />
          {preview && <video className={styles.videoPreview} src={preview} controls width={400} />}
          <button className={styles.button} type="submit" disabled={isLoading}>
            {isLoading ? 'Uploading...' : 'Upload Episode'}
          </button>
        </form>
      </div>
    </>
  );
}
