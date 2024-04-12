import React, { useState, useEffect } from 'react';

const Jogadores = ({logo}) => {
  // Verifica se os dados já foram carregados anteriormente
  const dataLoadedPreviously = localStorage.getItem('dataLoaded') === 'true';

  // Tente obter os dados do localStorage ao inicializar o componente
  const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
  const [players, setPlayers] = useState(storedPlayers);
  const [dataLoaded, setDataLoaded] = useState(dataLoadedPreviously);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verifique se os dados já foram carregados
        if (!dataLoaded) {
          console.log("Fetching data from API...");

          const response = await fetch(
            "https://api-nba-v1.p.rapidapi.com/players?season=2021&team=1",
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
          console.log("API data:", dados);

          // Atualize o estado local
          setPlayers(dados);

          // Armazene os dados no localStorage
          localStorage.setItem('players', JSON.stringify(dados));

          // Marque os dados como carregados
          setDataLoaded(true);

          // Marque a flag no localStorage indicando que os dados foram carregados
          localStorage.setItem('dataLoaded', 'true');
        } else {
          console.log("Data already loaded. Skipping API request.");
        }

      } catch (error) {
        console.error("Error fetching standing data:", error);
      }
    };

    fetchData();
  }, [dataLoaded]); // Execute o efeito apenas quando dataLoaded mudar

  console.log("Rendering component...");

  return (
    <div>
      <h1>Dados dos Jogadores</h1>
      <ul>
        {players.map(player => (
          <li key={player.id}>
            {player.firstname} {player.lastname}
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default Jogadores;
