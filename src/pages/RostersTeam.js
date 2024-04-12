// Em RostersTeam.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RosterTeamCard.css';
import RosterTeamCard from '../components/RosterTeamCard';
import RostersData from '../hooks/RostersData';
import SeasonText from '../components/SeasonText';

function RostersTeam() {
  const { teamName } = RostersData();
  if (!teamName) {
    // Se teamName não contiver dados válidos, renderize uma mensagem alternativa
    return (
      <div className="main-container">
        <p style={{color:"white"}}>Loading or no team data available.</p>
      </div>
    );
  }


  return (
    <div className="main-container">
      <SeasonText page={"Teams"}/>
      <div className="roster-container">
        <div className='roster-team-card-container'>
          {teamName.map(team => (
            <Link style={{textDecoration:"none"}}
            to="/rosters"
            state={{ teamName: team.name|| null, 
            teamCode: team.code || null ,
            teamLogo: team.logo || null }
          }
            key={team.id}
            >
              <RosterTeamCard
                team={team.name}
                logo={team.logo}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RostersTeam;
