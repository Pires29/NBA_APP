import React from "react";
import { Link } from "react-router-dom";
import backgroundImg from "../assets/homepage.jpg"
import '../styles/Homepage.css'

function Home() {
    return(
        <div className="homepage">
            <div className="text-content">
                <h1>Hoops Haven</h1>
                <h2>Your Ultimate NBA Hub</h2>
                <p>Immerse yourself in the game with real-time stats and historic moments.</p>
                <div className="button-container">
                   <button className="mainButton">
                    <Link to="/seasons">STANDINGS</Link>
                    </button>
                    <button className="blackButton">
                        <Link to="/stats">COMPARISON</Link>
                    </button> 
                </div>
            </div>
            
        </div>
    )
}

export default Home;