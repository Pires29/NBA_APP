import React from 'react'
import StatsCard from "../components/StatsCard";
import '../styles/Stats.css'
import RostersData from '../hooks/RostersData';
import { useSeason } from '../components/SeasonContext';
import { useState, useEffect } from 'react';

function StatsLeader() {
  const [selectedSeason] = useSeason();

  useEffect(() => {
    // Quando selectedSeason mudar, chame a função fetchData novamente
    console.log("Limpa")
    clearPlayers();
  }, [selectedSeason]);

    const { players , clearPlayers} = RostersData();

    const playersWithAvg = players.map(player => ({
        ...player,
        pointsPerGame: +(player.PTS / player.games).toFixed(1),
        assistsPerGame: +(player.AST / player.games).toFixed(1),
        reboundsPerGame: +(player.TRB / player.games).toFixed(1),
        blocksPerGame: +(player.BLK / player.games).toFixed(1),
        stealsPerGame: +(player.STL / player.games).toFixed(1),
        fg: player.field_percent,
        threept: player.three_percent,
        ft: player.ft_percent,
      }));
      
  
    // Sort players by points per game in descending order
    const sortedPoints = playersWithAvg.slice().sort((a, b) => b.pointsPerGame - a.pointsPerGame);
    const sortedAssists = playersWithAvg.slice().sort((a, b) => b.assistsPerGame - a.assistsPerGame);
    const sortedRebounds = playersWithAvg.slice().sort((a, b) => b.reboundsPerGame - a.reboundsPerGame);
    const sortedBlocks = playersWithAvg.slice().sort((a, b) => b.blocksPerGame - a.blocksPerGame);
    const sortedSteals = playersWithAvg.slice().sort((a, b) => b.stealsPerGame - a.stealsPerGame);
    const sortedFG = playersWithAvg.slice().sort((a, b) => b.fg - a.fg);
    const sorted3PT = playersWithAvg.slice().sort((a, b) => b.threept - a.threept);
    const sortedFT = playersWithAvg.slice().sort((a, b) => b.ft - a.ft);

    // Get the top 5 players by points per game
    const top5PlayersPoints = sortedPoints.slice(0, 5);
    const top5PlayersAssists = sortedAssists.slice(0, 5);
    const top5PlayersRebounds = sortedRebounds.slice(0, 5);
    const top5PlayersBlocks = sortedBlocks.slice(0, 5);
    const top5PlayersSteals = sortedSteals.slice(0, 5);
    const top5PlayersFG = sortedFG.slice(0, 5);
    const top5Players3PT = sorted3PT.slice(0, 5);
    const top5PlayersFT = sortedFT.slice(0, 5);

    console.log("STAT:", top5PlayersRebounds)
  return (
    <div className="stats-container">
                <StatsCard
                //logo={logo}
                stat={top5PlayersPoints}
                label="Points"
                />
                <StatsCard
                //logo={logo}
                stat={top5PlayersAssists}
                label="Assists"
                />
                <StatsCard
                //logo={logo}
                stat={top5PlayersRebounds}
                label="Rebounds"
                />
                <StatsCard
                //logo={logo}
                stat={top5PlayersBlocks}
                label="Blocks"
                />
                <StatsCard
                //logo={logo}
                stat={top5PlayersSteals}
                label="Steals"
                />
                <StatsCard
                //logo={logo}
                stat={top5PlayersFG}
                label="FG"
                />
                <StatsCard
                //logo={logo}
                stat={top5Players3PT}
                label="3PT"
                />
                <StatsCard
                //logo={logo}
                stat={top5PlayersFT}
                label="FT"
                />
            </div>
  )
}

export default StatsLeader;
