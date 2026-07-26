import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          DevVerse 🚀
        </Link>
        <nav>
          <Link href="/" className={styles.navLink}>
            Artigos
          </Link>
        </nav>
      </div>
    </header>
  );
}