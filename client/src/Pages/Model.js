// src/pages/Model.js

import React from 'react';
import Filters from '../Components/Filters';
import FuturePredictions from '../Components/FuturePredictions';
import Results from '../Components/Results';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

function Model() {
  return (
    <div className="container-fluid p-3">
      <div className="row">
        {/* Left column (Filters and Future Predictions) */}
        <div className="col-md-6">
          <div className="mb-3">
            <Filters />
          </div>
          <div>
            <FuturePredictions />
          </div>
        </div>

        {/* Right column (Results) */}
        <div className="col-md-6">
          <Results />
        </div>
      </div>
    </div>
  );
}

export default Model;
