import { useState, useEffect, useCallback } from 'react';

const DB_NAME = 'oporto-trip-photos';
const DB_VERSION = 1;
const STORE_NAME = 'photos';

interface StoredPhoto {
  id: string;
  placeId: string;
  dataUrl: string;
  timestamp: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('placeId', 'placeId', { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function resizeImage(file: File, maxWidth = 1200, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function usePlacePhotos(placeId: string) {
  const [photos, setPhotos] = useState<StoredPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPhotos = useCallback(async () => {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readonly');
      const index = tx.objectStore(STORE_NAME).index('placeId');
      const request = index.getAll(placeId);
      request.onsuccess = () => {
        const sorted = (request.result as StoredPhoto[]).sort((a, b) => b.timestamp - a.timestamp);
        setPhotos(sorted);
        setLoading(false);
      };
      request.onerror = () => setLoading(false);
    } catch {
      setLoading(false);
    }
  }, [placeId]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const addPhoto = useCallback(async (file: File) => {
    try {
      const dataUrl = await resizeImage(file);
      const photo: StoredPhoto = {
        id: `${placeId}-${Date.now()}`,
        placeId,
        dataUrl,
        timestamp: Date.now(),
      };
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(photo);
      await new Promise<void>((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
      setPhotos(prev => [photo, ...prev]);
    } catch (err) {
      console.error('Error saving photo:', err);
    }
  }, [placeId]);

  const removePhoto = useCallback(async (photoId: string) => {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(photoId);
      await new Promise<void>((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
      setPhotos(prev => prev.filter(p => p.id !== photoId));
    } catch (err) {
      console.error('Error deleting photo:', err);
    }
  }, []);

  return { photos, loading, addPhoto, removePhoto };
}
