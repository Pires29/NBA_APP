import warriorsLogo from "../assets/warriors.png"
import '../styles/RosterCard.css'
import { Link } from 'react-router-dom';

function RosterCard({playerName, data,dataTeam, teamLogo}){

    const teamColor = (dataTeam) => {
        // Usando um objeto para mapear teamCode para cor
        const colorMap = {
            'ATL': '#E03A3E',
            'BOS': '#008348',  
            'BKN': '#000000', 
            'CHA': '#00788C',  
            'CHI': '#CE1141',  
            'CLE': '#6F263D', 
            'DAL': '#00538C', 
            'DEN': '#0E2240',  
            'DET': '#C8102E',  
            'GSW': '#006BB6',  
            'HOU': '#CE1141', 
            'IND': '#002D62',
            'LAC': '#C8102E', 
            'LAL': '#552583', 
            'MEM': '#5D76A9',  
            'MIA': '#98002E',
            'MIL': '#00471B', 
            'MIN': '#1D42BA', 
            'NOP': '#85714D',
            'NYK': '#F58426', 
            'OKC': '#007AC1',  
            'ORL': '#0077C0',  
            'PHI': '#006BB6', 
            'PHX': '#1D1160', 
            'POR': '#E03A3E',  
            'SAC': '#5A2D81', 
            'SAS': '#C4CED4', 
            'TOR': '#CE1141', 
            'UTA': '#002B5C', 
            'WAS': '#002B5C',  
          };
          
        return colorMap[dataTeam] || 'defaultColor';
      };      
      
      const bottomCardStyle = { backgroundColor: teamColor(dataTeam) };

    return(

        <Link to="/statsplayer"
        state={{ nomePlayer: playerName }} className="card-link">
        <div className="card">
            <div className="top-card">
                <img src={teamLogo}/>
                <div className="top-text-container">
                    <p className="firstName">{playerName}</p>
                </div>
            </div>
            <div style={bottomCardStyle} className="bottom-card">
                <p>{dataTeam}</p>
            </div>
        </div>
        </Link>
    )
}

export default RosterCard;