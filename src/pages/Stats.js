import { useState, useEffect } from "react";
import StatsCard from "../components/StatsCard";
import '../styles/Stats.css'
import RostersData from '../hooks/RostersData';
import StatsLeader from "./StatsLeader";
import StatsAll from "./StatsAll";
import SeasonText from "../components/SeasonText";

function Stats(){
    const[componentSelected, setComponentSelected] = useState(1)

    const handleClick = (numComponent) =>{
        setComponentSelected(numComponent)
    }

    return(
        <div className="main-container">
            <SeasonText page={"Player Stats"}/>
            <div style={{display: "flex", justifyContent: "center", marginBottom:"2rem"}}>
                <div style={{color:"#FC7417", borderBottom: componentSelected === 1 ? "2px solid #FC7417" : "2px solid gray", padding:"0 3rem"}}>
                    <button style={{color: componentSelected === 1 ? "#FC7417" : "gray",cursor:"pointer", backgroundColor:"transparent", border:"none", fontSize:"1rem",fontWeight:"bold", padding:"1rem"}} onClick={() => handleClick(1)}>Season Leaders</button>
                </div>
                <div style={{borderBottom: componentSelected === 2 ? "2px solid #FC7417" : "2px solid gray", padding:"0 3rem"}}>
                    <button style={{color: componentSelected === 2 ? "#FC7417" : "gray",cursor:"pointer", backgroundColor:"transparent", border:"none", fontSize:"1rem",fontWeight:"bold", padding:"1rem"}} onClick={() => handleClick(2)}>All Players</button>
                </div>
            </div>
            {componentSelected === 1 && <StatsLeader />}
            {componentSelected === 2 && <StatsAll />}
        </div>
    )
}

export default Stats;