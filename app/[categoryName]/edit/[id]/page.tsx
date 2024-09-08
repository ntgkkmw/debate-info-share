'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function EditPage() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedContents = localStorage.getItem(`category_${categoryName}`);
    if (storedContents) {
      const contents = JSON.parse(storedContents);
      contents[id] = content;
      localStorage.setItem(`category_${categoryName}`, JSON.stringify(contents));
      router.push(`/${categoryName}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1>編集</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content.title}
          onChange={(e) => setContent({...content, title: e.target.value})}
          placeholder="タイトル"
          className={styles.input}
          required
        />
        <input
          type="url"
          value={content.url}
          onChange={(e) => setContent({...content, url: e.target.value})}
          placeholder="URL"
          className={styles.input}
          required
        />
        <textarea
          value={content.description}
          onChange={(e) => setContent({...content, description: e.target.value})}
          placeholder="説明"
          className={styles.textarea}
        />
        <button type="submit" className={styles.button}>更新</button>
        <button type="button" onClick={() => router.back()} className={styles.button}>キャンセル</button>
      </form>
    </div>
  );
}