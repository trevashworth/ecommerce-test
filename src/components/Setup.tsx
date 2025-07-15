import React from "react";
import { db } from "../lib/firebase/firebase";
import { collection, setDoc, doc } from "firebase/firestore";

const Setup: React.FC = () => {
  const importFakeStoreProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();

    for (const product of products) {
      await setDoc(doc(collection(db, "products"), String(product.id)), product);
    }
    alert("Products imported into Firestore!");
  };

  return (
    <div style={{padding: 40, textAlign: 'center'}}>
      <button style={{fontSize: 18, padding: 10}} onClick={importFakeStoreProducts}>
        Import Products from FakeStore API
      </button>
      <p style={{color: 'orange', marginTop: 16}}>
        Only click this button ONCE. Remove this page after products import!
      </p>
    </div>
  );
};

export default Setup;