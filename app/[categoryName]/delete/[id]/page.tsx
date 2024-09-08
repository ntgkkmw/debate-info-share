'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function DeletePage() {
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

  const handleDelete = () => {
    const storedContents = localStorage.getItem(`category_${categoryName}`);
    if (storedContents) {
      const contents = JSON.parse(storedContents);
      contents.splice(id, 1);
      localStorage.setItem(`category_${categoryName}`, JSON.stringify(contents));
      router.push(`/${categoryName}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1>削除確認</h1>
      <p>以下のコンテンツを削除してもよろしいですか？</p>
      <h2>{content.title}</h2>
      <p>URL: {content.url}</p>
      <p>説明: {content.description}</p>
      <button onClick={handleDelete} className={styles.deleteButton}>削除する</button>
      <button onClick={() => router.back()} className={styles.cancelButton}>キャンセル</button>
    </div>
  );
}