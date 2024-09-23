"use client";

import { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.css';
import { FaSearch, FaRegUserCircle, FaHamburger } from "react-icons/fa";
import Link from 'next/link';

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    // console.log(userData);
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  return (
    <div className={styles.main}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <span className={styles.logoPart1}>Ani</span>
          <span className={styles.logoPart2}>me</span>
        </div>
        {/* Hamburger Icon */}
        <div className={styles.hamburger} onClick={toggleMobileMenu}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
        {/* Desktop Menu */}
        <ul className={`${styles.navLinks} ${showMobileMenu ? styles.active : ""}`}>
          <li className={styles.navItem}>
            <Link href="/">Homepage</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/categories" onClick={toggleDropdown}>
              Categories
            </Link>
            {showDropdown && (
              <ul className={styles.dropdownMenu}>
                {/* Dropdown items */}
              </ul>
            )}
          </li>
          <li className={styles.navItem}><Link href="/blogFeed">Our Blog</Link></li>
          <li className={styles.navItem}><Link href="/contact">Contact</Link></li>
        </ul>
        <Link href="/ep"><FaSearch /></Link>
        <div className={styles.icons}>
          <div className={styles.userIconContainer}>
            {user && user.image ? (
              <img
                src={user.image}
                alt="User image"
                className={styles.image}
                onClick={toggleUserDropdown}
              />
            ) : (
              <Link href="/login" onClick={toggleUserDropdown}><FaRegUserCircle /></Link>
            )}
            {showUserDropdown && user && (
              <div className={styles.userDropdown}>
                <p>{user.name}</p>
                <div className={styles.login}>
                  <Link href="/profile">Profile</Link>
                  <Link href="#" onClick={() => {
                    localStorage.removeItem('user');
                    setUser(null);
                  }}>Logout</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      {showMobileMenu && (
        <ul className={styles.navLinksMobile}>
          <li className={styles.navItem}>
            <Link href="/" onClick={toggleMobileMenu}>Homepage</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/categories" onClick={toggleMobileMenu}>Categories</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/blogFeed" onClick={toggleMobileMenu}>Our Blog</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/contact" onClick={toggleMobileMenu}>Contact</Link>
          </li>
        </ul>
      )}
    </div>
  );
}
