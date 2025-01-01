import React from 'react';

const Results = ({ homes }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Results</h3>
      {homes.length > 0 ? (
        <div className="grid gap-4">
          {homes.map((home, index) => (
            <div key={index} className="border border-gray-300 rounded-md p-4 shadow-md">
              <div className="text-lg font-semibold">{home.address}, {home.city}, {home.state} {home.zip_code}</div>
              <div className="mt-2">
                <p><strong>House Value:</strong> ${home.house_value}</p>
                <p><strong>Estimated Rent:</strong> ${home.estimated_rent}</p>
                <p><strong>Bedrooms:</strong> {home.bedrooms}</p>
                <p><strong>Bathrooms:</strong> {home.bathrooms}</p>
                <p><strong>Square Feet:</strong> {home.square_feet}</p>
                <p><strong>ROI</strong> {home.square_feet}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No homes match your criteria.</p>
      )}
    </div>
  );
};

export default Results;
