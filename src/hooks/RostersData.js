// RostersData.js
import { useState, useEffect } from 'react';
import { useSeason } from '../components/SeasonContext';

const RostersData = () => {
  const [selectedSeason, changeSeason] = useSeason();
  const [players, setPlayers] = useState([]);
  const [teamName, setTeamName] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  console.log("OLHA AQUI MORCAO:", selectedSeason)

  const clearPlayers = () => {
    setPlayers([]);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        const response = await fetch(
          `https://api-nba-v1.p.rapidapi.com/teams`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": "824a688facmsh8f8761fd64264c5p1098c9jsn2002d216def3",
              "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            },
          }
        );
        const data = await response.json();
        const teamData = data.response;
        console.log("OLHAAAAA AQUIIIII",teamData);
  

        // Filtrar as equipes com nbaFranchise como true
        const nbaFranchiseTeams = teamData.filter(team => team.nbaFranchise === true);
        console.log("NBA Franchise Teams:", nbaFranchiseTeams);
  
        // Armazenar as equipes da NBA que são franquias no localStorage
        localStorage.setItem('nbaFranchiseTeams', JSON.stringify(nbaFranchiseTeams));
  
        setTeamName(nbaFranchiseTeams);
      } catch (error) {
        setTeamName([]);
        console.error("Error fetching team info:", error);
      }
    };
  

      // Se não existirem, fazer o pedido à API
      fetchTeamInfo();

  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {


        // Adiciona console.log quando selectedSeason estiver definido
        console.log("selectedSeason definido:", selectedSeason);
        console.log("Fetching data do nba rapid ATENCAO");
  
        const response = await fetch(
          `https://nba-stats-db.herokuapp.com/api/playerdata/season/${selectedSeason}?page=${currentPage}`,
        );
  
        const data = await response.json();

      // Verifique se a estrutura dos dados é como esperado
      if (data && data.results && Array.isArray(data.results)) {
        const dados = data.results; // Use diretamente os dados se forem um array
        console.log("API data as array:", dados);
        setPlayers((prevPlayers) => [...prevPlayers, ...dados]);
        if(dados.length < 100){
          console.log("ERRROOOOOO")
          return
        }
        else{
          setCurrentPage(currentPage + 1);
        }
      } else {
        console.error("Formato de dados inesperado:", data);
      }
      } catch (error) {
        console.error("Error fetching standing data:", error);
      }
    };
  
    fetchData();
  
  },[currentPage, selectedSeason]);

  console.log("AQUI APARECES BOI", selectedSeason)

  return { teamName, players, clearPlayers};
};

export default RostersData;
