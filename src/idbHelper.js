// idbHelper.js
const DB_NAME = "BlogAppDB";
const STORE_NAME = "posts";

const openDB = () =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = ({ target }) => {
      const db = target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = ({ target }) => reject(target.error);
  });

export const getAllPosts = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db
      .transaction(STORE_NAME, "readonly")
      .objectStore(STORE_NAME)
      .getAll();
    tx.onsuccess = () => resolve(tx.result);
    tx.onerror = ({ target }) => reject(target.error);
  });
};

export const saveAllPosts = async (posts) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const clearReq = store.clear();
    clearReq.onsuccess = () => {
      posts.forEach((post) => store.put(post));
      tx.oncomplete = () => resolve();
      tx.onerror = ({ target }) => reject(target.error);
    };
    clearReq.onerror = ({ target }) => reject(target.error);
  });
};
