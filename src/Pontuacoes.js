import React, { useState, useEffect } from 'react';

const Pontuacoes = () => {
    const [players, setPlayers] = useState([]);
    const [seasonAverages, setSeasonAverages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.balldontlie.io/api/v1/players?search=Stephen%20Curry');
                const data = await response.json();
                setPlayers(data.data);
            } catch (error) {
                console.error('Erro ao obter dados dos jogadores:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Verifica se há pelo menos um jogador na lista
        if (players.length > 0) {
            // Acessa o id do primeiro jogador (no caso, é o único na lista)
            const playerId = players[0].id;
            console.log('ID do jogador:', playerId);

            // Faz uma segunda solicitação para obter as season averages com o ID do jogador
            const fetchSeasonAverages = async () => {
                try {
                    const response = await fetch(`https://www.balldontlie.io/api/v1/season_averages?season=2015&player_ids[]=${playerId}`);
                    const data = await response.json();
                    setSeasonAverages(data.data);
                    console.log(data)
                } catch (error) {
                    console.error('Erro ao obter dados de média de temporada:', error);
                }
            };

            fetchSeasonAverages();
        }
    }, [players]);

    useEffect(() => {
        // Console.log das médias de temporada quando o estado é atualizado
        console.log('Médias de temporada do jogador:', seasonAverages);
    }, [seasonAverages]);

    return (
        <div>
            <div>
            <h2>Dados de Média de Temporada</h2>
            {seasonAverages.length > 0 ? (
                <ul>
                    <li>Pontos (PTS): {seasonAverages[0].pts}</li>
                    <li>Assistências (AST): {seasonAverages[0].ast}</li>
                    {/* Adicione mais informações conforme necessário */}
                </ul>
            ) : (
                <p>Nenhum dado de média de temporada disponível</p>
            )}
        </div>
        </div>
    );
}

export default Pontuacoes;
