'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

interface Content {
  title: string;
  url: string;
  description: string;
}

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryName = params.categoryName as string;
  const [contents, setContents] = useState<Content[]>([]);
  const [newContent, setNewContent] = useState<Content>({ title: '', url: '', description: '' });

  useEffect(() => {
    const storedContents = localStorage.getItem(`category_${categoryName}`);
    if (storedContents) {
      setContents(JSON.parse(storedContents));
    }
  }, [categoryName]);

  const handleAddContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newContent.title.trim() && newContent.url.trim()) {
      const updatedContents = [...contents, newContent];
      setContents(updatedContents);
      setNewContent({ title: '', url: '', description: '' });
      localStorage.setItem(`category_${categoryName}`, JSON.stringify(updatedContents));
    }
  };

  const handleTitleClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className={styles.container}>
      <h1>{decodeURIComponent(categoryName)}</h1>
      <form onSubmit={handleAddContent}>
        <input
          type="text"
          value={newContent.title}
          onChange={(e) => setNewContent({...newContent, title: e.target.value})}
          placeholder="タイトル"
          className={styles.input}
          required
        />
        <input
          type="url"
          value={newContent.url}
          onChange={(e) => setNewContent({...newContent, url: e.target.value})}
          placeholder="URL"
          className={styles.input}
          required
        />
        <textarea
          value={newContent.description}
          onChange={(e) => setNewContent({...newContent, description: e.target.value})}
          placeholder="内容（オプション）"
          className={styles.textarea}
        />
        <button type="submit" className={styles.button}>追加</button>
      </form>
      <ul className={styles.contentList}>
        {contents.map((content, index) => (
          <li key={index} className={styles.contentItem}>
            <button
              onClick={() => handleTitleClick(content.url)}
              className={styles.titleButton}
            >
              {content.title}
            </button>
            <div className={styles.buttonGroup}>
              <Link href={`/${categoryName}/show/${index}`} className={styles.actionButton}>
                閲覧
              </Link>
              <Link href={`/${categoryName}/edit/${index}`} className={styles.actionButton}>
                編集
              </Link>
              <Link href={`/${categoryName}/delete/${index}`} className={styles.actionButton}>
                削除
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => router.push('/')} className={styles.button}>
        ホームに戻る
      </button>
    </div>
  );
}

