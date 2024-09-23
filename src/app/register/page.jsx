"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import styles from "./Register.module.css";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileimage: "",
  });

  useEffect(() => {
    gsap.fromTo(
      ".registerForm",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileimage" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileimage: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      router.push("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>Sign Up</h1>
        <p>Welcome to the official Anime blog.</p>
      </div>

      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} className={`${styles.registerForm} registerForm`}>
          <h2 className={styles.title}>Sign Up</h2>
          <input
            type="text"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="file"
            name="profileimage"
            onChange={handleChange}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.submitBtn}>Register Now</button>
        </form>

        <div className={styles.socialLogin}>
          <h3>Login With:</h3>
          <button className={`${styles.socialBtn} ${styles.facebook}`}>
            <i className="fa fa-facebook"></i> Sign in with Facebook
          </button>
          <button className={`${styles.socialBtn} ${styles.google}`}>
            <i className="fa fa-google"></i> Sign in with Google
          </button>
          <button className={`${styles.socialBtn} ${styles.twitter}`}>
            <i className="fa fa-twitter"></i> Sign in with Twitter
          </button>
        </div>
      </div>
    </div>
  );
}
