'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function VideoGuide() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>動画説明</h1>
      <div className={styles.videoContainer}>
        <video controls className={styles.video}>
          <source src="/guide.mp4" type="video/mp4" />
          お使いのブラウザは動画タグをサポートしていません。
        </video>
      </div>
      <button onClick={() => router.back()} className={styles.button}>
        戻る
      </button>
    </div>
  );
}