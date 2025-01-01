import React, { useState } from 'react';
import Filters from '../Components/Filters';
import Results from '../Components/Results';
import axios from 'axios';

const Model = () => {
  const [homes, setHomes] = useState([]);

  const fetchFilteredHomes = async (filters) => {
    
    try {
      const response = await axios.get('/homes', { params: filters });
      setHomes(response.data);  // Update the state with the filtered homes
    } catch (error) {
      console.error('Error fetching homes:', error);
    }
  };

  return (
    <div className="flex flex-row h-screen space-x-4">
      <div className="flex flex-col w-1/3 bg-white p-4 rounded-md shadow-sm">
        <Filters onFilterSubmit={fetchFilteredHomes} />
      </div>

      <div className="flex flex-col w-2/3 bg-gray-100 p-4 rounded-md shadow-sm">
        <div className="flex-grow overflow-y-auto border border-gray-300 rounded-md p-4">
          <Results homes={homes} /> {/* Pass homes to Results */}
        </div>
      </div>
    </div>
  );
};

export default Model;
