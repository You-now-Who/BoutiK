import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { onAuthStateChanged } from "firebase/auth";
import Carousel from './home/Carousel';
import ProductRow from './home/ProductRow';

export default function Home() {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        console.log("ASJDASUDIu ")
        const listen = onAuthStateChanged(auth, (user) => {
          if (user) {
            setAuthUser(user);
            console.log(user)
          } else {
            setAuthUser(null);
          }
        });
        return () => listen();
    }, []);

  
    return (
      <div>
        {authUser ? (
            <>
            <div className="max-w-screen mx-auto flex justify-center bg-white">
                <Carousel style={{ width: '100vw' }} />                    
            </div>

            <ProductRow type="LATEST IN FASHION"/>

            <ProductRow type="TODAY'S DEALS"/>

            <ProductRow type="MOST ECO-FRIENDLY"/>

            
            </>
        ) : (
            <div className="max-w-screen mx-auto px-4">
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-4xl font-bold text-gray-800">Welcome to Boutik</h1>
                     <p className="text-gray-600">Please login or register to continue</p>
                </div>

            </div>
        )}
        {/* your login and logout components go here */}
      </div>
    );
}
