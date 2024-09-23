"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import styles from "@/styles/Login.module.css"; // Ensure this CSS module file exists

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    gsap.fromTo(
      ".loginForm",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Login successful");
      localStorage.setItem("user", JSON.stringify(data.user)); // Save user details
      router.push("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>Login</h1>
        <p>Welcome to the login.</p>
      </div>

      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} className={`${styles.loginForm} loginForm`}>
          <h2 className={styles.title}>Login</h2>
          <div className={styles.inputWrapper}>
            <i className="fa fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputWrapper}>
            <i className="fa fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.submitBtn}>Login Now</button>
          <button className={styles.forgotPassword}>Forgot Your Password?</button>
        </form>

        <div className={styles.registerWrapper}>
          <p className={styles.registerTitle}>Don’t Have An Account?</p>
          <button
            className={styles.registerBtn}
            onClick={() => router.push("/register")}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}
