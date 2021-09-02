import { collection, onSnapshot, orderBy, query, where } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

export const useFileStore = (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const collectionDb = collection(db, collectionName);
    let collectionRef = query(collectionDb, orderBy('createdAt'));

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // reset documents data
        setDocuments([]);
        return;
      }
      collectionRef = query(
        collectionDb,
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy('createdAt')
      );
    }
    const unsubscribe = onSnapshot(collectionRef, snapshot => {
      const documents = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(documents);
    });

    return () => unsubscribe();
  }, [collectionName, condition]);

  return documents;
};
