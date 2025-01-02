import React from 'react';
import HomeCard from './HomeCard';

const Results = ({ homes }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Results</h3>
      {homes.length > 0 ? (
        <HomeCard homes={homes}></HomeCard>
      ) : (
        <p>No homes match your criteria.</p>
      )}
    </div>
  );
};

export default Results;
