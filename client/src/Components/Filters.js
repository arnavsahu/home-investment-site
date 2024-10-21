import React, { useState } from 'react';

const filterConfig = [
  { name: 'id', label: 'ID', type: 'text' },
  { name: 'address', label: 'Address', type: 'text' },
  { name: 'city', label: 'City', type: 'text' },
  { name: 'state', label: 'State', type: 'text' },
  { name: 'zip_code', label: 'Zip Code', type: 'text' },
  { name: 'min_house_value', label: 'Min House Value', type: 'number' },
  { name: 'max_house_value', label: 'Max House Value', type: 'number' },
  { name: 'min_estimated_rent', label: 'Min Estimated Rent', type: 'number' },
  { name: 'max_estimated_rent', label: 'Max Estimated Rent', type: 'number' },
  { name: 'bedrooms', label: 'Bedrooms', type: 'number' },
  { name: 'bathrooms', label: 'Bathrooms', type: 'number' },
  { name: 'min_square_feet', label: 'Min Square Feet', type: 'number' },
  { name: 'max_square_feet', label: 'Max Square Feet', type: 'number' },
];

const Filters = ({ onFilterSubmit }) => {
  const [filters, setFilters] = useState(
    filterConfig.reduce((acc, filter) => ({ ...acc, [filter.name]: '' }), {})
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {filterConfig.map((filter) => (
        <div key={filter.name} className="px-1">
          <label htmlFor={filter.name} className="font-medium px-1">
            {filter.label}:
          </label>
          <input
            type={filter.type}
            id={filter.name}
            name={filter.name}
            value={filters[filter.name]}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-3 py-1"
          />
        </div>
      ))}
      <button
        type="submit"
        className="px-4 py-2 rounded-md bg-blue-900 hover:bg-blue-500 text-white"
        >
        Filter Homes
      </button>
    </form>
  );
};

export default Filters;