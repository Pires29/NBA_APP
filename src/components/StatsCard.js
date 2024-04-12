import React from 'react';
import StatsCardRow from './StatsCardRow';
import '../styles/StatsCard.css';

function StatsCard({stat, label}) {

  console.log("STATE:", stat)
  return (
    <div>
      <div className="points-container">
        <div className="text-stat-container">
          <h4>{label}</h4>
          <hr></hr>
        </div>
        <div>
        <div>
          {label === "Points" &&
          stat.map((player, index) => (
            <StatsCardRow
              key={index}
              position={index + 1}
              data={{ name: player.player_name, teamID: player.team, stat: player.pointsPerGame }}
            />
          ))
        }
        </div>

        {label === "Assists" &&
          stat.map((player, index) => (
            <StatsCardRow
              key={index}
              position={index + 1}
              data={{ name: player.player_name, teamID: player.team, stat: player.assistsPerGame }}
            />
          ))
        }

        {label === "Rebounds" &&
          stat.map((player, index) => (
            <StatsCardRow
            key={index}
            position={index + 1}
            data={{ name: player.player_name, teamID: player.team, stat: player.reboundsPerGame}}
            />
          ))
        }

        {label === "Blocks" &&
          stat.map((player, index) => (
            <StatsCardRow
            key={index}
            position={index + 1}
            data={{ name: player.player_name, teamID: player.team, stat: player.blocksPerGame}}
            />
          ))
        }

        {label === "Steals" &&
          stat.map((player, index) => (
            <StatsCardRow
            key={index}
            position={index + 1}
            data={{ name: player.player_name, teamID: player.team, stat: player.stealsPerGame}}
            />
          ))
        }

        {label === "FG" &&
          stat.map((player, index) => (
            <StatsCardRow
            key={index}
            position={index + 1}
            data={{ name: player.player_name, teamID: player.team, stat: player.fg}}
            />
          ))
        }

        {label === "3PT" &&
          stat.map((player, index) => (
            <StatsCardRow
            key={index}
            position={index + 1}
            data={{ name: player.player_name, teamID: player.team, stat: player.threept}}
            />
          ))
        }

        {label === "FT" &&
          stat.map((player, index) => (
            <StatsCardRow
            key={index}
            position={index + 1}
            data={{ name: player.player_name, teamID: player.team, stat: player.ft}}
            />
          ))
        }


        
        </div>

        

      </div>
    </div>
  );
}

export default StatsCard;
