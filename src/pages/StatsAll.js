import React, { useState , useEffect} from 'react';
import RostersData from '../hooks/RostersData';
import { Link } from 'react-router-dom';
import { useSeason } from '../components/SeasonContext';
import '../styles/StatsAll.css';

const StatsAll = () => {
  const [selectedSeason] = useSeason();
  const [sortDirection, setSortDirection] = useState('asc');

  const [componentSelected, setComponentSelected] = useState(1)
  const [sortedStat, setSortedStat] = useState({ stat: 'PPG', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1)
  const [activeHeader, setActiveHeader] = useState(null);
  const playersPerPage = 25;

  useEffect(() => {
    // Quando selectedSeason mudar, chame a função fetchData novamente
    console.log("Limpa")
    clearPlayers();
  }, [selectedSeason]);

  const handleClick = (numComponent) =>{
    setComponentSelected(numComponent)
}

  const { players , clearPlayers} = RostersData();

  const getSortedPlayers = () => {
    const sortedPlayers = players.slice().sort((a, b) => {
      const statA = calculateStat(a, sortedStat.stat);
      const statB = calculateStat(b, sortedStat.stat);
      const order = sortedStat.order === 'asc' ? 1 : -1;
      return order * (statB - statA);
    });

    const indexOfLastPlayer = currentPage * playersPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
    return sortedPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);
  };

  const calculateStat = (player, stat) => {
    switch (stat) {
      case 'teams':
        return player.team
      case 'games':
        return  player.games
      case 'MPG':
        return +(player.minutes_played / player.games).toFixed(1);
      case 'PPG':
        return +(player.PTS / player.games).toFixed(1);
      case 'AST':
        return +(player.AST / player.games).toFixed(1);
      case 'FGA':
        return player.field_attempts;
      case 'FGM':
        return player.field_goals;
      case 'FG%':
        return player.field_percent;
      case '3PA':
        return player.three_attempts;
      case '3PM':
        return player.three_fg;
      case '3P%':
        return player.three_percent;
      case 'FTA':
        return player.fta;
      case 'FTM':
        return player.ft;
      case 'FT%':
        return player.ft_percent;
      case 'OREB':
        return +(player.ORB / player.games).toFixed(1);
      case 'DREB':
        return +(player.DRB / player.games).toFixed(1);
      case 'REB':
        return +(player.TRB / player.games).toFixed(1);
      case 'TOV':
        return +(player.TOV / player.games).toFixed(1);
      case 'STL':
        return +(player.STL / player.games).toFixed(1);
      case 'BLK':
        return +(player.BLK / player.games).toFixed(1);
      case 'PF':
        return player.PF;
      default:
        return 0;
    }
  };

  const toggleOrder = (stat) => {
    setSortedStat((prevSortedStat) => {
      const isSameStat = prevSortedStat.stat === stat;
      const order = isSameStat ? (prevSortedStat.order === 'asc' ? 'desc' : 'asc') : 'asc';
  
      // Atualiza o estado do cabeçalho ativo
      setActiveHeader(isSameStat ? activeHeader : stat);
  
      return {
        stat,
        order,
      };
    });
  };
  
  
  const pageNumbers = Math.ceil(players.length / playersPerPage);

  const handlePageChange = (pageNumber) =>{
    setCurrentPage(pageNumber)
  }

  const sortedPlayers = getSortedPlayers();

  return (
    <div>
    <div>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Recua</button>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageNumbers}>Avança</button>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <table className="standings-table">
        <thead>
          <tr>
            <th>Player</th>
            <th onClick={() => toggleOrder('teams')}>Team</th>
            <th onClick={() => toggleOrder('games')}
            className={activeHeader === 'games' ? 'active' : ''}>GP</th>
            <th onClick={() => toggleOrder('MPG')}
            className={activeHeader === 'MPG' ? 'active' : ''}>MPG</th>
            <th onClick={() => toggleOrder('PPG')}
            className={activeHeader === 'PPG' ? 'active' : ''}>PPG</th>
            <th onClick={() => toggleOrder('FGA')}
            className={activeHeader === 'FGA' ? 'active' : ''}>FGA</th>
            <th onClick={() => toggleOrder('FGM')}
            className={activeHeader === 'FGM' ? 'active' : ''}>FGM</th>
            <th onClick={() => toggleOrder('FG%')}
            className={activeHeader === 'FG%' ? 'active' : ''}>FG%</th>
            <th onClick={() => toggleOrder('3PA')}
            className={activeHeader === '3PA' ? 'active' : ''}>3PA</th>
            <th onClick={() => toggleOrder('3PM')}
            className={activeHeader === '3PM' ? 'active' : ''}>3PM</th>
            <th onClick={() => toggleOrder('3P%')}
            className={activeHeader === '3P%' ? 'active' : ''}>3P%</th>
            <th onClick={() => toggleOrder('FTA')}
            className={activeHeader === 'FTA' ? 'active' : ''}>FTA</th>
            <th onClick={() => toggleOrder('FTM')}
              className={activeHeader === 'FTM' ? 'active' : ''}>FTM</th>
            <th onClick={() => toggleOrder('FT%')}
              className={activeHeader === 'FT%' ? 'active' : ''}>FT%</th>
            <th onClick={() => toggleOrder('OREB')}
              className={activeHeader === 'OREB' ? 'active' : ''}>OREB</th>
            <th onClick={() => toggleOrder('DREB')}
              className={activeHeader === 'DREB' ? 'active' : ''}>DREB</th>
            <th onClick={() => toggleOrder('REB')}
              className={activeHeader === 'REB' ? 'active' : ''}>REB</th>
            <th onClick={() => toggleOrder('AST')}
              className={activeHeader === 'AST' ? 'active' : ''}>AST</th>
            <th onClick={() => toggleOrder('TOV')}
              className={activeHeader === 'TOV' ? 'active' : ''}>TOV</th>
            <th onClick={() => toggleOrder('STL')}
              className={activeHeader === 'STL' ? 'active' : ''}>STL</th>
            <th onClick={() => toggleOrder('BLK')}
              className={activeHeader === 'BLK' ? 'active' : ''}>BLK</th>
            <th onClick={() => toggleOrder('PF')}
              className={activeHeader === 'PF' ? 'active' : ''}>PF</th>

          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player, index) => {
            const games = calculateStat(player, 'games');
            const mpg = calculateStat(player, 'MPG');
            const ppg = calculateStat(player, 'PPG');
            const apg = calculateStat(player, 'AST');
            const rpg = calculateStat(player, 'REB');
            const spg = calculateStat(player, 'STL');
            const tov = calculateStat(player, 'TOV');
            const blk = calculateStat(player, 'BLK');
            const oreb = calculateStat(player, 'OREB');
            const dreb = calculateStat(player, 'DREB');
            return (
              <tr key={index} className="standings-row">
                <Link to="/statsplayer" state={{ nomePlayer: player.player_name }} className="card-link">
                  <td>{player.player_name}</td>
                </Link>
                <td style={{ backgroundColor: activeHeader === 'teams' ? 'grey' : '' }}>{player.team}</td>
                <td style={{ backgroundColor: activeHeader === 'games' ? 'grey' : '' }}>{games}</td>
                <td style={{ backgroundColor: activeHeader === 'MPG' ? 'grey' : '' }}>{mpg}</td>
                <td style={{ backgroundColor: activeHeader === 'PPG' ? 'grey' : '' }}>{ppg}</td>
                <td style={{ backgroundColor: activeHeader === 'FGA' ? 'grey' : '' }}>{player.field_attempts}</td>
                <td style={{ backgroundColor: activeHeader === 'FGM' ? 'grey' : '' }}>{player.field_goals}</td>
                <td style={{ backgroundColor: activeHeader === 'FG%' ? 'grey' : '' }}>{player.field_percent}</td>
                <td style={{ backgroundColor: activeHeader === '3PA' ? 'grey' : '' }}>{player.three_attempts}</td>
                <td style={{ backgroundColor: activeHeader === '3PM' ? 'grey' : '' }}>{player.three_fg}</td>
                <td style={{ backgroundColor: activeHeader === '3P%' ? 'grey' : '' }}>{player.three_percent}</td>
                <td style={{ backgroundColor: activeHeader === 'FTA' ? 'grey' : '' }}>{player.fta}</td>
                <td style={{ backgroundColor: activeHeader === 'FTM' ? 'grey' : '' }}>{player.ft}</td>
                <td style={{ backgroundColor: activeHeader === 'FT%' ? 'grey' : '' }}>{player.ft_percent}</td>
                <td style={{ backgroundColor: activeHeader === 'OREB' ? 'grey' : '' }}>{oreb}</td>
                <td style={{ backgroundColor: activeHeader === 'DREB' ? 'grey' : '' }}>{dreb}</td>
                <td style={{ backgroundColor: activeHeader === 'REB' ? 'grey' : '' }}>{rpg}</td>
                <td style={{ backgroundColor: activeHeader === 'AST' ? 'grey' : '' }}>{apg}</td>
                <td style={{ backgroundColor: activeHeader === 'TOV' ? 'grey' : '' }}>{tov}</td>
                <td style={{ backgroundColor: activeHeader === 'STL' ? 'grey' : '' }}>{spg}</td>
                <td style={{ backgroundColor: activeHeader === 'BLK' ? 'grey' : '' }}>{blk}</td>
                <td style={{ backgroundColor: activeHeader === 'PF' ? 'grey' : '' }}>{player.PF}</td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div> 
    </div>
  );
};

export default StatsAll;
