import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
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
          <p>Welcome, {authUser.email}!</p>
        ) : (
          <p>Please log in.</p>
        )}
        {/* your login and logout components go here */}
      </div>
    );
}
