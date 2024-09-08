'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface Category {
  name: string;
  isLocked: boolean;
}

export default function DeleteConfirmation() {
  const params = useParams();
  const router = useRouter();
  const categoryName = params.categoryName as string;

  const handleConfirmDelete = () => {
    // カテゴリーリストを取得
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      const categories: Category[] = JSON.parse(storedCategories);
      // 削除対象のカテゴリーを除外
      const newCategories = categories.filter(c => c.name !== decodeURIComponent(categoryName));
      // 更新されたカテゴリーリストを保存
      localStorage.setItem('categories', JSON.stringify(newCategories));
    }

    // カテゴリーに関連するコンテンツを削除
    localStorage.removeItem(`category_${categoryName}`);

    // ホームページにリダイレクト
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>カテゴリー削除の確認</h1>
      <p className={styles.warning}>この操作は取り消せません。カテゴリーとそのすべてのコンテンツが完全に削除されます。</p>
      <div className={styles.content}>
        <p>「{decodeURIComponent(categoryName)}」を削除してもよろしいですか？</p>
      </div>
      <button onClick={handleConfirmDelete} className={styles.deleteButton}>削除する</button>
      <button onClick={() => router.back()} className={styles.cancelButton}>キャンセル</button>
    </div>
  );
}