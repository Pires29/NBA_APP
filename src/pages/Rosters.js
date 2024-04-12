// Em Rosters.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RosterCard from "../components/RosterCard";
import '../styles/Roster.css';
import RostersData from '../hooks/RostersData';
import SeasonText from '../components/SeasonText';
import { useSeason } from '../components/SeasonContext';

function Rosters() {
  const location = useLocation()
  const { teamName, teamLogo,teamCode } = location.state || {};
  const [selectedSeason] = useSeason();

  useEffect(() => {
    // Quando selectedSeason mudar, chame a função fetchData novamente
    console.log("Limpa")
    clearPlayers();
  }, [selectedSeason]);

  console.log("REPETIU")
  const { players, clearPlayers } = RostersData();
  console.log("AQUI AMIGO", players)
  console.log("DESTA TEM DE SER:",selectedSeason)

  return (
    <div className="main-container">
      <SeasonText page={"Roster"}/>
      <div className="roster-container">
        <h3>{teamName}</h3>
        <div className="roster-card-container">
        {players
          .filter(player => player.team === `${teamCode}`)
          .map((player, index) => (
            <RosterCard
              key={index}
              data={player}
              dataTeam ={player.team}
              teamLogo ={teamLogo}
              playerName={player.player_name}
              //logo={logo}
            />
          ))}

        </div>
      </div>
    </div>
  );
}

export default Rosters;
