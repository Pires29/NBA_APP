import { createContext, useContext, useState } from 'react';

const SeasonContext = createContext();

export const SeasonProvider = ({ children }) => {
  const [selectedSeason, setSelectedSeason] = useState('2023');

  const changeSeason = (newSeason) => {
    setSelectedSeason(newSeason);
  };

  console.log("OLHA MAIS UM BIFEEEEE:", selectedSeason)

  return (
    <SeasonContext.Provider value={{ selectedSeason, changeSeason }}>
      {children}
    </SeasonContext.Provider>
  );
};

export const useSeason = () => {
  const context = useContext(SeasonContext);
  if (!context) {
    throw new Error('useSeason must be used within a SeasonProvider');
  }
  return [context.selectedSeason, context.changeSeason];
};
