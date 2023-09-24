import React from "react"
import { useLocation } from "react-router-dom"

export default function Home() {
    const location = useLocation();
    const firstName = location.state.firstName;
    
    return ( 
        <div className="home-container">
            <h1>Hello {firstName}</h1>
        </div>
    )
}

