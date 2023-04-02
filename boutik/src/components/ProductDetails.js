import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);


  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    getProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="flex justify-center items-center">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full max-w-lg rounded-lg shadow-lg mb-8"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-base mb-6">{product.description}</p>
          <p className="text-2xl font-bold text-green-600 mb-4">${product.price}</p>
          <div className="flex items-center mb-8">
            <span className="text-gray-600 text-sm mr-2">In Stock.</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.293-10.293a1 1 0 00-1.414-1.414L9 10.586 6.121 7.707a1 1 0 00-1.414 1.414l3.172 3.172a1 1 0 001.414 0l5.172-5.172a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <button className="bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-md py-2 px-4 mb-4 mx-5">
            Add to Cart
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md py-2 px-4 mx-5">
            Buy Now
          </button>
          <div className="flex items-center justify-center my-10">
            <div className="w-24 mr-5">
                <p className="text-sm font-medium text-gray-800">Eco-Friendly:</p>
            </div>
            <div className="flex items-center justify-center space-x-2">

            {[...Array(product.ecoFriendly)].map((_, index) => (
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                ))}
                
                {[...Array(5 - product.ecoFriendly)].map((_, index) => (
                  <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                ))}
                
                {/* <div className="w-3 h-3 bg-gray-200 rounded-full"></div> */}
            </div>
        </div>
        </div>
      </div>
    </div>
  );
  
};

export default ProductDetails;
