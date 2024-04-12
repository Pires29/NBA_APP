import React, { useState, useEffect } from "react";

const Teste = () => {
    const [standingData, setStandingData] = useState(null);
    const [teamsData, setTeamsData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2021",
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
              wins: dados[i].win.total,
              losses: dados[i].loss.total,
              standings: {
                rank: dados[i].conference.rank,
                conference: dados[i].conference.name,
              },
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
    }, []);
  
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <h2>Eastern Conference</h2>
          {teamsData.eastConferenceTeams && teamsData.eastConferenceTeams.map((team, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <h1>{team.standings.rank}</h1>
              <img style={{ width: '75px', height: '75px' }} src={team.teamLogo} alt={`${team.teamName} logo`} />
              <h1>{team.teamName}</h1>
              <h3>Wins: {team.wins}</h3>
              <h3>Losses: {team.losses}</h3>
            </div>
          ))}
        </div>
      
        <div style={{ marginLeft: '20px' }}>
          <h2>Western Conference</h2>
          {teamsData.westConferenceTeams && teamsData.westConferenceTeams.map((team, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <h1>{team.standings.rank}</h1>
              <img style={{ width: '75px', height: '75px' }} src={team.teamLogo} alt={`${team.teamName} logo`} />
              <h1>{team.teamName}</h1>
              <h3>Wins: {team.wins}</h3>
              <h3>Losses: {team.losses}</h3>
            </div>
          ))}
        </div>
      </div>
      
    );
  };
  
  export default Teste;
  