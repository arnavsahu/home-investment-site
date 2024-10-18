// src/pages/Model.js

import React, { useState } from 'react';
import Filters from '../Components/Filters';
import FuturePredictions from '../Components/FuturePredictions';
import Results from '../Components/Results';
import 'bootstrap/dist/css/bootstrap.min.css';

function Model() {
  const [filters, setFilters] = useState({});

  // Define a function that handles form submissions from Filters
  const handleFiltersSubmit = (formValues) => {
    setFilters(formValues);
    console.log('Filters applied:', formValues);
    // You can add any logic to use these filters, such as making an API call
  };

  return (
    <div className="container-fluid p-3">
      <div className="row">
        {/* Left column (Filters and Future Predictions) */}
        <div className="col-md-6">
          <div className="mb-3">
            <Filters onSubmit={handleFiltersSubmit} /> {/* Pass the handler function */}
          </div>
          <div>
            <FuturePredictions />
          </div>
        </div>

        {/* Right column (Results) */}
        <div className="col-md-6">
          <Results filters={filters} /> {/* Optionally, pass the filters to other components */}
        </div>
      </div>
    </div>
  );
}

export default Model;
