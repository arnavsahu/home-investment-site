import React, { useState } from 'react';

const Filters = ({ onFilterSubmit }) => {
  const [filters, setFilters] = useState({
    id: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    min_house_value: '',
    max_house_value: '',
    min_estimated_rent: '',
    max_estimated_rent: '',
    bedrooms: '',
    bathrooms: '',
    min_square_feet: '',
    max_square_feet: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterSubmit(filters); // Pass the filters to the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* String filters */}
      <div>
        <label>ID:</label>
        <input
          type="text"
          name="id"
          value={filters.id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={filters.address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={filters.city}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          name="state"
          value={filters.state}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Zip Code:</label>
        <input
          type="text"
          name="zip_code"
          value={filters.zip_code}
          onChange={handleInputChange}
        />
      </div>

      {/* Numerical filters */}
      <div>
        <label>Min House Value:</label>
        <input
          type="number"
          name="min_house_value"
          value={filters.min_house_value}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Max House Value:</label>
        <input
          type="number"
          name="max_house_value"
          value={filters.max_house_value}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Min Estimated Rent:</label>
        <input
          type="number"
          name="min_estimated_rent"
          value={filters.min_estimated_rent}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Max Estimated Rent:</label>
        <input
          type="number"
          name="max_estimated_rent"
          value={filters.max_estimated_rent}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Bedrooms:</label>
        <input
          type="number"
          name="bedrooms"
          value={filters.bedrooms}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Bathrooms:</label>
        <input
          type="number"
          name="bathrooms"
          value={filters.bathrooms}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Min Square Feet:</label>
        <input
          type="number"
          name="min_square_feet"
          value={filters.min_square_feet}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Max Square Feet:</label>
        <input
          type="number"
          name="max_square_feet"
          value={filters.max_square_feet}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit">Filter Homes</button>
    </form>
  );
};

export default Filters;
