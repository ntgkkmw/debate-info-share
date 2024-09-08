'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';  // この行を追加

interface Category {
  name: string;
  isLocked: boolean;
}

export default function Home() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadCategories = () => {
      const storedCategories = localStorage.getItem('categories');
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
    };

    loadCategories();

    // ストレージの変更を監視
    window.addEventListener('storage', loadCategories);

    return () => {
      window.removeEventListener('storage', loadCategories);
    };
  }, []);

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryName.trim()) {
      const newCategory: Category = { name: categoryName.trim(), isLocked: false };
      const newCategories = [...categories, newCategory];
      setCategories(newCategories);
      localStorage.setItem('categories', JSON.stringify(newCategories));
      setCategoryName('');
    }
  };

  const handleNavigateToCategory = (category: string) => {
    router.push(`/${encodeURIComponent(category)}`);
  };

  const handleToggleLock = (index: number) => {
    const newCategories = [...categories];
    newCategories[index].isLocked = !newCategories[index].isLocked;
    setCategories(newCategories);
    localStorage.setItem('categories', JSON.stringify(newCategories));
  };

  const handleDeleteCategory = (categoryToDelete: string) => {
    const category = categories.find(c => c.name === categoryToDelete);
    if (category && !category.isLocked) {
      if (confirm(`「${categoryToDelete}」を削除してもよろしいですか？\n削除すると、このカテゴリー内のすべてのデータが失われます。`)) {
        router.push(`/delete/${encodeURIComponent(categoryToDelete)}`);
      }
    } else {
      alert('ロックされているカテゴリーは削除できません。');
    }
  };

  return (
    <div className={styles.container}>
      <h1>ディベート情報共有用サイト</h1>
      <Link href="/usage" className={styles.usageButton}>
        使い方
      </Link>
      <Link href="/video-guide" className={styles.button}>
          動画説明
        </Link>
      <h1>新規カテゴリー作成</h1>
      <form onSubmit={handleCreateCategory}>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="カテゴリー名を入力"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>カテゴリーを作成</button>
      </form>
      <h2>作成済みカテゴリー一覧</h2>
      <ul className={styles.categoryList}>
        {categories.map((category, index) => (
          <li key={index} className={styles.categoryItem}>
            <input
              type="checkbox"
              checked={category.isLocked}
              onChange={() => handleToggleLock(index)}
              className={styles.lockCheckbox}
            />
            <button
              onClick={() => handleNavigateToCategory(category.name)}
              className={styles.categoryButton}
            >
              {category.name}
            </button>
            <button
              onClick={() => handleDeleteCategory(category.name)}
              className={styles.deleteButton}
              disabled={category.isLocked}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}



