import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "firebase/storage";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const ProductRow = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const productCollection = db.collection("products");
      const productsSnapshot = await productCollection.get();

      const productsData = productsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setProducts(productsData);
    };

    fetchData();
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleNextClick = () => {
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      <div className="absolute left-0 flex items-center justify-center h-full w-12">
        {currentIndex !== 0 && (
          <button onClick={handlePrevClick} className="p-2 rounded-full bg-gray-700 text-white">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        )}
      </div>
      <div className="flex overflow-x-auto w-full">
        {products.length > 0 ? (
          products
            .slice(currentIndex, currentIndex + 10)
            .map((product) => (
              <div
                key={product.id}
                className="flex-none h-72 w-72 m-4 p-4 bg-gray-200 rounded-lg flex flex-col items-center justify-center"
              >
                <img
                  className="h-40 w-40 object-contain"
                  src={product.imageUrl}
                  alt={product.name}
                />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-500">{product.price}</p>
              </div>
            ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="absolute right-0 flex items-center justify-center h-full w-12">
        {currentIndex + 10 < products.length && (
          <button onClick={handleNextClick} className="p-2 rounded-full bg-gray-700 text-white">
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductRow;
