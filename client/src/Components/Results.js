import React, { useState, useMemo } from 'react';
import HomeCard from './HomeCard';

const Results = ({ homes }) => {
  // Single state storing the current sort choice
  const [sortOption, setSortOption] = useState(null);

  // Configuration for sorting
  const sortConfig = [
    { sort_display_name: 'House Value', field: 'house_value', source: 'home_details' },
    { sort_display_name: 'Estimated Rent Income', field: 'estimated_rent_income', source: 'results' },
    { sort_display_name: 'Estimated ROI', field: 'estimated_roi', source: 'results' },
  ];

  const handleSort = (field, source) => {
    setSortOption((prev) => {
      if (prev?.field === field) {
        return {
          ...prev,
          order: prev.order === 'asc' ? 'desc' : 'asc',
        };
      }
      return { field, source, order: 'asc' };
    });
  };

  // Sort homes whenever the sortOption changes
  const sortedHomes = useMemo(() => {
    if (!sortOption) return homes;
    const { field, source, order } = sortOption;

    return [...homes].sort((a, b) => {
      const valueA = a[source][field];
      const valueB = b[source][field];
      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [homes, sortOption]);

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Results</h3>

      {/* Render all sort buttons from our config */}
      <div className="flex flex-wrap gap-2 mb-4">
        {sortConfig.map(({ sort_display_name, field, source }) => (
          <button
            key={field}
            onClick={() => handleSort(field, source)}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
          >
            {sort_display_name}
            {sortOption?.field === field && ` (${sortOption.order})`}
          </button>
        ))}
      </div>

      {sortedHomes.length > 0 ? (
        <HomeCard homes={sortedHomes} />
      ) : (
        <p>No homes match your criteria.</p>
      )}
    </div>
  );
};

export default Results;
