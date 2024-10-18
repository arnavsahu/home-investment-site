// src/pages/Model.js

import React, { useState } from 'react';
import Filters from '../Components/Filters';
//import FuturePredictions from '../Components/FuturePredictions';
//import Results from '../Components/Results';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Import axios

const Model = () => {
  const [homes, setHomes] = useState([]);

  const fetchFilteredHomes = async (filters) => {
    try {
      const response = await axios.get('/homes', { params: filters }); // Use axios with query parameters
      setHomes(response.data);  // Update the state with the filtered homes
    } catch (error) {
      console.error('Error fetching homes:', error);
    }
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