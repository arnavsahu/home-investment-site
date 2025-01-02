import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';

const filterConfig = [
  { name: 'address', label: 'Address', type: 'text' },
  { name: 'city', label: 'City', type: 'text' },
  { name: 'state', label: 'State', type: 'text' },
  { name: 'zip_code', label: 'Zip Code', type: 'text' },
  { name: 'house_value', label: 'House Value', type: 'range', min: 0, max: 1000000 },
  { name: 'estimated_rent', label: 'Estimated Rent', type: 'range', min: 0, max: 10000 },
  { name: 'square_feet', label: 'Square Feet', type: 'range', min: 0, max: 10000 },
  { name: 'bedrooms', label: 'Bedrooms', type: 'number' },
  { name: 'bathrooms', label: 'Bathrooms', type: 'number' },
  { name: 'down_payment', label: 'Down Payment', type: 'number' },
  { name: 'interest_rate', label: 'Interest Rate', type: 'number' },
  { name: 'loan_term_years', label: 'Loan Term Years', type: 'number' },
  { name: 'analysis_year', label: 'Analysis Year', type: 'number' },
  { name: 'apprentice_rate', label: 'Apprentice Rate', type: 'number' }
];

const Filters = ({ onFilterSubmit }) => {
  const [filters, setFilters] = useState(
    filterConfig.reduce((acc, filter) => ({
      ...acc,
      [filter.name]: filter.type === 'range' ? [filter.min, filter.max] : '',
    }), {})
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleRangeChange = (name, values) => {
    setFilters({ ...filters, [name]: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const queryParams = {};

    // Build query parameters for the API request
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (Array.isArray(value)) {
        const [min, max] = value;
        if (min <= max) {
          queryParams[`min_${key}`] = min;
          queryParams[`max_${key}`] = max;
        }
      } else if (value) {
        queryParams[key] = value;
      }
    });

    try {
      onFilterSubmit(queryParams);
    } catch (error) {
      console.error('Error fetching homes:', error);
    }
  };

  const formatNumber = (num) => num.toLocaleString();

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
                {/* Dual Range Slider */}
                <Slider
                  range
                  min={filter.min}
                  max={filter.max}
                  value={filters[filter.name]}
                  onChange={(values) => handleRangeChange(filter.name, values)}
                />
                <div className="flex justify-between">
                  {/* Display formatted min and max values */}
                  <span>{formatNumber(filters[filter.name][0])}</span>
                  <span>{formatNumber(filters[filter.name][1])}</span>
                </div>
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
