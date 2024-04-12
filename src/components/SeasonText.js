import React, { useState } from 'react';
import { useSeason } from './SeasonContext';

function SeasonText({ page }) {
  const [selectedSeason, changeSeason] = useSeason(); // Valor inicial

  const handleSeasonChange = (event) => {
    const newSeason = event.target.value;
    changeSeason(newSeason);
  };
  console.log("SELECTED SEASON", selectedSeason)

  return (
    <div>
      <div className="season-container">
        <label className="custom-label">
          <select
            name="filter"
            id="filter"
            value={selectedSeason}
            onChange={handleSeasonChange}
          >
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            <option value="2009">2009</option>
            <option value="2008">2008</option>
          </select>
        </label>
        <p>Season</p>
      </div>
      <div className="page-container">
        <h3>{page}</h3>
        <hr />
      </div>
    </div>
  );
}

export default SeasonText;
