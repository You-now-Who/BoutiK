import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'


export default function Home() {
    const navigate = useNavigate()
    if (!auth.currentUser) {
        navigate("/login")
    }
  return (
    <div>Home</div>
  )
}
