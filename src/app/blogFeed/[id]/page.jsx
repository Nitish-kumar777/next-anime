"use client"

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BlogDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchBlogDetails = async () => {
        const res = await fetch(`/api/getBlog?id=${id}`);
        const data = await res.json();
        setBlog(data.blog);
      };

      fetchBlogDetails();
    }
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <img src={blog.image} alt="Blog Image" style={{ width: '400px', height: '400px' }} />
      <p>{blog.description}</p>
      <a href={blog.instagramLink} target="_blank" rel="noopener noreferrer">Instagram</a>
    </div>
  );
}
