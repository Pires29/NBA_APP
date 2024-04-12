import React from 'react'
import { Link } from "react-router-dom";
import warriorsLogo from "../assets/warriors.png"
import RostersData from "../hooks/RostersData";

function RosterTeamCard({team,logo}) {
  return (
    <div className="team-card">
      <div className='team-logo-container'>
        <img src={logo} alt={`Logo of ${team}`} />
      </div>
      <div className='team-name-container'>
        <p style={{textDecoration:"none"}}>{team}</p>
      </div>
    </div>
  )
}

export default RosterTeamCard
