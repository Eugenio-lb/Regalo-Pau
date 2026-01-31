// IndexedDB wrapper for persistent auth storage in iOS PWA
const DB_NAME = 'regalo-pau-db';
const STORE_NAME = 'auth';

export async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

export async function saveAuthToken(token: string, user: any) {
  try {
    const db = (await initDB()) as IDBDatabase;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    
    store.put({ token, user, timestamp: Date.now() }, 'auth');
    
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch (error) {
    console.error('Failed to save auth to IndexedDB:', error);
    // Fallback to localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export async function getAuthToken() {
  try {
    const db = (await initDB()) as IDBDatabase;
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.get('auth');
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  } catch (error) {
    console.error('Failed to read auth from IndexedDB:', error);
    // Fallback to localStorage
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return null;
  }
}

export async function clearAuthToken() {
  try {
    const db = (await initDB()) as IDBDatabase;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    
    store.delete('auth');
    
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch (error) {
    console.error('Failed to clear auth from IndexedDB:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
