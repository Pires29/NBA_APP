import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBarPlayer from '../components/SearchBarPlayer';
import StatsContainer from '../components/StatsContainer';
import SeasonText from '../components/SeasonText';

function StatsPlayer() {
  const location = useLocation();
  const { nomePlayer } = location.state || {};

  console.log("Location State:", location.state);
  console.log("É ESTE CHAVALOOO:", nomePlayer)
    return (
      <div className="main-container">
          <SeasonText page={"Compare Stats"}/>
        <div style={{ color: "white" }}>
          <SearchBarPlayer nomePlayer={nomePlayer}/>
        </div>
      </div>
    );
}
export default StatsPlayer;
