// src/pages/Model.js

import React, { useState } from 'react';
import Filters from '../Components/Filters';
//import FuturePredictions from '../Components/FuturePredictions';
//import Results from '../Components/Results';
import 'bootstrap/dist/css/bootstrap.min.css';

const Model = () => {
  const [homes, setHomes] = useState([]);

  const fetchFilteredHomes = async (filters) => {
    const queryString = Object.keys(filters)
      .map(key => `${key}=${encodeURIComponent(filters[key])}`)
      .join('&');

    const response = await fetch(`/homes?${queryString}`);
    const data = await response.json();
    setHomes(data);  // Update the state with the filtered homes
  };

  return (
    <div>
      <h1>Filtered Homes</h1>
      <Filters onFilterSubmit={fetchFilteredHomes} />
      
      {/* Display the filtered homes */}
      <div>
        {homes.length > 0 ? (
          homes.map(home => (
            <div key={home.id}>
              <h2>{home.address}</h2>
              <p>City: {home.city}</p>
              <p>State: {home.state}</p>
              <p>House Value: ${home.house_value}</p>
              <p>Bedrooms: {home.bedrooms}</p>
              <p>Bathrooms: {home.bathrooms}</p>
            </div>
          ))
        ) : (
          <p>No homes found.</p>
        )}
      </div>
    </div>
  );
};

export default Model;