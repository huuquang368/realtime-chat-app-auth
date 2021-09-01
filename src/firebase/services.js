import { addDoc, collection, Timestamp } from '@firebase/firestore';
import { db } from './config';

export const addDocument = async (collectionName, data) => {
  const usersRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: Timestamp.now(),
  });
  console.log(usersRef.id);
};
