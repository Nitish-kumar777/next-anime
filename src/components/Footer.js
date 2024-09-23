import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <span className={styles.logoPart1}>Ani</span>
        <span className={styles.logoPart2}>me</span>
      </div>
      <ul className={styles.navLinks}>
        <li className={styles.navItem}><a href="/">Homepage</a></li>
        <li className={styles.navItem}><a href="/categories">Categories</a></li>
        <li className={styles.navItem}><a href="/blogFeed">Our Blog</a></li>
        <li className={styles.navItem}><a href="/contact">Contacts</a></li>
      </ul>
      <div className={styles.copyright}>
        <p>Copyright © 2024 All rights reserved</p>
        <p>This template is made with <span className={styles.heart}>❤</span> by <a href="#">Colorlib</a></p>
      </div>
    </footer>
  );
}