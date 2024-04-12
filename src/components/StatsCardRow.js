import { Link } from 'react-router-dom';

function StatsCardRow({ data, position }) {

  const { name, teamID, stat } = data;

  
    return (
      <div className="points-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <p>{position}</p>
          <Link style={{textDecoration:"none", color:"white"}}
          to="/statsplayer"
        state={{ nomePlayer: name}} className="card-link"><p>{name}</p></Link>
          <p style={{color:"grey"}}>{teamID}</p>
        </div>
        <div>
          <p>{stat}</p>
        </div>
      </div>
    );
}

export default StatsCardRow;
  