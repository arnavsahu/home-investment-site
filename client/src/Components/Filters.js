import React, { useState } from 'react';

const filterConfig = [
  { name: 'address', label: 'Address', type: 'text' },
  { name: 'city', label: 'City', type: 'text' },
  { name: 'state', label: 'State', type: 'text' },
  { name: 'zip_code', label: 'Zip Code', type: 'text' },
  { name: 'min_house_value', label: 'Min House Value', type: 'range', min: 0, max: 1000000 },
  { name: 'max_house_value', label: 'Max House Value', type: 'range', min: 0, max: 10000000 },
  { name: 'min_estimated_rent', label: 'Min Estimated Rent', type: 'range', min: 0, max: 10000 },
  { name: 'max_estimated_rent', label: 'Max Estimated Rent', type: 'range', min: 0, max: 100000 },
  { name: 'min_square_feet', label: 'Min Square Feet', type: 'range', min: 0, max: 5000 },
  { name: 'max_square_feet', label: 'Max Square Feet', type: 'range', min: 0, max: 10000 },
  { name: 'bedrooms', label: 'Bedrooms', type: 'number' },
  { name: 'bathrooms', label: 'Bathrooms', type: 'number' },
];

const Filters = ({ onFilterSubmit }) => {
  const [filters, setFilters] = useState(
    filterConfig.reduce((acc, filter) => ({ ...acc, [filter.name]: filter.min || '' }), {})
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterSubmit(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-blue-900">Filter Homes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filterConfig.map((filter) => (
          <div key={filter.name} className="flex flex-col">
            <label htmlFor={filter.name} className="text-gray-700 font-medium mb-1">
              {filter.label}:
            </label>
            {filter.type === 'range' ? (
              <div className="flex flex-col space-y-2">
                {/* Range Slider */}
                <input
                  type="range"
                  id={filter.name}
                  name={filter.name}
                  min={filter.min}
                  max={filter.max}
                  value={filters[filter.name]}
                  onChange={handleInputChange}
                  className="w-full"
                />
                {/* Numeric Input */}
                <input
                  type="number"
                  value={filters[filter.name]}
                  min={filter.min}
                  max={filter.max}
                  name={filter.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-1"
                />
              </div>
            ) : (
              <input
                type={filter.type}
                id={filter.name}
                name={filter.name}
                value={filters[filter.name]}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            )}
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 transition"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default Filters;
