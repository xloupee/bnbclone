import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function Home() {
    const location=useLocation()
    
    return ( 
        <div className="home-container">
            <h1>Hello {location.state.id}</h1>
        </div>
    )
}

