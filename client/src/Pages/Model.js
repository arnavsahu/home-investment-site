// src/pages/Model.js

import React, { useState } from 'react';
import Filters from '../Components/Filters';
import FuturePredictions from '../Components/FuturePredictions';
import Results from '../Components/Results';
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
    <div className='flex flex-row'>
      <div className='flex flex-col w-1/2'>
        <h2>Filtered Homes</h2>
        <Filters onFilterSubmit={fetchFilteredHomes} />

        <h2>Future Predictions</h2>
        <FuturePredictions onFilterSubmit={fetchFilteredHomes} />
      </div>
      <div className='flex flex-col w-1/2'>
        <h2>Filtered Homes</h2>
        <Results onFilterSubmit={fetchFilteredHomes} />
      </div>
    </div>
  );
};

export default Model;