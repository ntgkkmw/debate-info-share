'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function ShowPage() {
  const params = useParams();
  const router = useRouter();
  const categoryName = params.categoryName as string;
  const id = parseInt(params.id as string);
  const [content, setContent] = useState({ title: '', url: '', description: '' });

  useEffect(() => {
    const storedContents = localStorage.getItem(`category_${categoryName}`);
    if (storedContents) {
      const contents = JSON.parse(storedContents);
      setContent(contents[id]);
    }
  }, [categoryName, id]);

  return (
    <div className={styles.container}>
      <h1>{content.title}</h1>
      <p>URL: <a href={content.url} target="_blank" rel="noopener noreferrer">{content.url}</a></p>
      <p>説明: {content.description}</p>
      <button onClick={() => router.back()} className={styles.button}>戻る</button>
    </div>
  );
}