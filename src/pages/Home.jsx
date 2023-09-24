import React from "react"
import { useLocation } from "react-router-dom"

export default function Home() {
    const location = useLocation();
    const firstName = localStorage.getItem('firstName')
    
    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
    }
    
    console.log(location.state)
    return ( 
        <div className="home-container">
            <h1>Hello {firstName}</h1>
            <button onClick={handleSignOut}>Signout</button>
        </div>
    )
}

