// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from '../../nba_app/src/components/Navbar';
import Home from './pages/Home';
import Rosters from './pages/Rosters';
import Stats from './pages/Stats';
import SeasonsHub from './pages/SeasonsHub';
import StatsPlayer from './pages/StatsPlayer';
import RostersTeam from './pages/RostersTeam';
import StatsLeader from './pages/StatsLeader';
import StatsAll from './pages/StatsAll';
import { SeasonProvider } from './components/SeasonContext';  // Importe o SeasonProvider

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SeasonProvider>
          <Navbar />
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/rostersteam" element={<RostersTeam />} />
            <Route path="/rosters" element={<Rosters />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/statsleaders" element={<StatsLeader />} />
            <Route path="/statsall" element={<StatsAll />} />
            <Route path="/statsplayer" element={<StatsPlayer />} />
            <Route path="/seasons" element={<SeasonsHub />} />
          </Routes>
        </SeasonProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
