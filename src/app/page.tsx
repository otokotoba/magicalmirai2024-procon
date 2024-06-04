'use client';

import styles from './page.module.css';

import { TextAlivePlayer } from '@/components/TextAlivePlayer';

export default function Home(): JSX.Element {
  return (
    <main className={styles.main}>
      <h1>Hello, World</h1>
      <TextAlivePlayer />
    </main>
  );
}
