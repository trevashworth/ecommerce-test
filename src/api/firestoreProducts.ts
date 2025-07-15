import { db } from "../lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { Product } from "../types/Types";

export const fetchFirestoreProducts = async (): Promise<Product[]> => {
  const productsCol = collection(db, "products");
  const productSnapshot = await getDocs(productsCol);
  return productSnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id, // Firestore's id is always a string!
  })) as Product[];
};