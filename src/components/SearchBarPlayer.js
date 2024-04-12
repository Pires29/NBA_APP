import React, { useEffect, useState } from 'react';
import RostersData from '../hooks/RostersData';
import StatsContainer from './StatsContainer';
import { useSeason } from '../components/SeasonContext';
import SeasonText from './SeasonText';
import '../styles/SearchBar.css'

function SearchBarPlayer({nomePlayer}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [player, setPlayer] = useState([]);
  const [selectedSeason, changeSeason] = useSeason();
  const { players , clearPlayers} = RostersData(selectedSeason);
  
  
  useEffect(() => {

   clearPlayers()
  }, [selectedSeason]);

 
  
  console.log("SELECTED NOME:",nomePlayer)

  useEffect(() => {
    if (nomePlayer && selectedPlayers.length < 1) {
      setPlayer(nomePlayer)
      console.log("ESCUTA BEM", players)
      const playerLinked = players.find(player => player.player_name === nomePlayer);
      console.log("LINKEDDDD", playerLinked)
  
      if (playerLinked) {
        setSelectedPlayers(prevPlayers => [...prevPlayers, playerLinked]);
      }
    };
   }, [nomePlayer, players]);

useEffect(() => {

  console.log("LIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII com play", players)
  console.log("AAAAAAAAAAAAAAAAAAAA", player)
  if(players!=undefined){
    const playerSearched = players.find(player1 => {
      return player1.player_name.includes(player);
    });


    console.log("PLAYERRRTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", playerSearched)
    if(playerSearched!=undefined){
    setSelectedPlayers(prevPlayers => [ playerSearched]);}
}
  }, [players]);


  console.log("SELECTED:",players)

  console.log("SELECTED:",selectedSeason)
  console.log("SELECTED:",selectedPlayers)

  const normalizeString = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const handleSearch = (player) => {
    setPlayer(player)
    console.log("SUGESTÔES", suggestions)

    if (selectedPlayers.length < 3) {
      console.log("PASSOU AQUI")
      // Adiciona o jogador à lista de jogadores selecionados (limitada a 3)
      setSelectedPlayers(prevPlayers => [...prevPlayers, player]);
      // Limpa o termo de pesquisa e sugestões
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    const normalizedInput = normalizeString(input);
    const suggestionsList = players
      .filter(player => {
        const normalizedPlayerName = normalizeString(player.player_name);
        return normalizedPlayerName.includes(normalizedInput);
      })
      .slice(0, 5); // Limitando para cinco sugestões

    setSuggestions(suggestionsList);
  };

  console.log("OPAAAAAAAA")


  // Renderiza os cards dos jogadores selecionados

  return (
    <div className='search-bar-container'>
      <h1>Search your NBA Player Stat</h1>
      <p>Everything you need to know down here, just search it!</p>
      <div class="search-local">
        <div class="icon">
          <ion-icon name="location-outline"></ion-icon>
        </div>

        <input className='search-bar-input'
        type="text" 
        placeholder="Search for a player..."
        value={searchTerm}
        onChange={handleInputChange}/>
        <button onClick={() => handleSearch(suggestions[0])}>Search</button>

      {suggestions.length > 0 && (
        <ul className='suggestion-list'>
          {suggestions.map((suggestion) => (
            <li className='suggestion-list-row' key={suggestion.id} onClick={() => handleSearch(suggestion)}>
              {suggestion.player_name}
            </li>
          ))}
        </ul>
      )}
      </div>
      <div style={{margin:"5rem 0"}}>
        <StatsContainer selectedPlayers={selectedPlayers} setSelectedPlayers={setSelectedPlayers}/>
      </div>

    </div>
  );
}

export default SearchBarPlayer;
