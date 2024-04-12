import React, { useState , useEffect} from 'react';
import RostersData from '../hooks/RostersData'; // Certifique-se de fornecer o caminho correto
import { useSeason } from '../components/SeasonContext';
import SeasonText from '../components/SeasonText';
import '../styles/StatsContainer.css'

function StatsContainer({selectedPlayers, setSelectedPlayers}) {

  console.log("SELECTED AQUI: ", selectedPlayers)

  const handleDelete = (index) =>{
    console.log("SERAAAAAA")
    setSelectedPlayers((prevPlayers) => prevPlayers.filter((_, i) => i !== index));
    console.log("AQUI:", selectedPlayers)
  }
  return (
    <div className="stats-card-player-container">
      {selectedPlayers.map((player, index) => {
        const name = player.player_name;
        const gp = player.games;
        const pts = player.PTS;
        const ppg = (pts / gp).toFixed(1);
        const ast = player.AST;
        const apg = (ast / gp).toFixed(1);
        const reb = player.TRB;
        const rpg = (reb / gp).toFixed(1);
        const stl = player.STL;
        const spg = (stl / gp).toFixed(1);
        const blk = player.BLK;
        const bpg = (blk / gp).toFixed(1);
        const turnover = player.TOV;
        const tpg = (turnover / gp).toFixed(1);
        const fgP = player.field_percent;
        const fg3P = player.three_percent;
        const ftP = player.ft_percent;

        return (
          <div className="card-player" key={index}>
            <h3>{name}</h3>
            <p>Points: {ppg}</p>
            <p>Assists: {apg}</p>
            <p>Rebounds: {rpg}</p>
            <p>Steals: {spg}</p>
            <p>Blocks: {bpg}</p>
            <p>FG %: {fgP}</p>
            <p>3P %: {fg3P}</p>
            <p>FT %: {ftP}</p>
            <p>Turnovers: {tpg}</p>
            <div className='button-delete'>
              <button onClick={() => handleDelete(index)}>DELETE</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsContainer;
