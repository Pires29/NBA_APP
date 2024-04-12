import React, { useState, useEffect } from 'react';
import '../styles/SeasonsHub.css';
import SeasonText from '../components/SeasonText';
import { useSeason } from '../components/SeasonContext';

function SeasonsHub() {
  const [standingData, setStandingData] = useState(null);
  const [teamsData, setTeamsData] = useState([]);
  const [selectedSeason] = useSeason();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=${selectedSeason}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": "824a688facmsh8f8761fd64264c5p1098c9jsn2002d216def3",
              "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            },
          }
        );
        const data = await response.json();
        const dados = data.response;
        console.log(dados);
        setStandingData(dados);

        const teams = [];
        for (let i = 0; i < dados.length && i < 30; i++) {
          teams.push({
            teamLogo: dados[i].team.logo,
            teamName: dados[i].team.name,
            percentage: dados[i].win.percentage,
            wins: dados[i].win.total,
            losses: dados[i].loss.total,
            standings: {
              rank: dados[i].conference.rank,
              conference: dados[i].conference.name,
            },
            homeWins: dados[i].win.home,     // Vitórias em casa
            homeLosses: dados[i].loss.home,  // Derrotas em casa
            awayWins: dados[i].win.away,     // Vitórias fora
            awayLosses: dados[i].loss.away,
          });
        }

        // Ordenar as equipes por classificação (standings)
        const sortedTeams = [...teams].sort((a, b) => a.standings.rank - b.standings.rank);

        // Dividir as equipes por conferência
        const eastConferenceTeams = sortedTeams.filter(team => team.standings.conference === 'east');
        const westConferenceTeams = sortedTeams.filter(team => team.standings.conference === 'west');

        // Atualizar o estado com as equipes ordenadas e divididas por conferência
        setTeamsData({ eastConferenceTeams, westConferenceTeams });
      } catch (error) {
        console.error("Error fetching standing data:", error);
      }
    };

    fetchData();
  }, [selectedSeason]);

  return (
    <div className='main-container'>
            <SeasonText page={"Standings"}/>
      <div className='tabela-container' style={{ display: 'flex', flexDirection: 'row', justifyContent:"center"}}>
        <div>
          <h2>Eastern Conference</h2>
          <table className="standings-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Logo</th>
                <th>Team</th>
                <th>GP</th>
                <th>W</th>
                <th>L</th>
                <th>%</th>
                <th>Home</th>
                <th>Away</th>
              </tr>
            </thead>
            <tbody>
              {teamsData.eastConferenceTeams && teamsData.eastConferenceTeams.map((team, index) => (
                <tr className='standings-row' key={index}>
                  <td>{team.standings.rank}</td>
                  <td><img style={{ width: '40px', height: '40px' }} src={team.teamLogo} alt={`${team.teamName} logo`} /></td>
                  <td>{team.teamName}</td>
                  <td>{team.wins + team.losses}</td>
                  <td>{team.wins}</td>
                  <td>{team.losses}</td>
                  <td>{team.percentage}</td>
                  <td>{team.homeWins}-{team.homeLosses}</td>
                  <td>{team.awayWins}-{team.awayLosses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginLeft: '20px' }}>
          <h2>Western Conference</h2>
          <table className="standings-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Logo</th>
                <th>Team</th>
                <th>GP</th>
                <th>W</th>
                <th>L</th>
                <th>%</th>
                <th>Home</th>
                <th>Away</th>
              </tr>
            </thead>
            <tbody>
              {teamsData.westConferenceTeams && teamsData.westConferenceTeams.map((team, index) => (
                <tr className='standings-row' key={index}>
                  <td>{team.standings.rank}</td>
                  <td><img style={{ width: '40px', height: '40px' }} src={team.teamLogo} alt={`${team.teamName} logo`} /></td>
                  <td>{team.teamName}</td>
                  <td>{team.wins + team.losses}</td>
                  <td>{team.wins}</td>
                  <td>{team.losses}</td>
                  <td>{team.percentage}</td>
                  <td>{team.homeWins}-{team.homeLosses}</td>
                  <td>{team.awayWins}-{team.awayLosses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SeasonsHub;
