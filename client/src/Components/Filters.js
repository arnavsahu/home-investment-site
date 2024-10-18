// Components/Filters.js
import React, { useState } from 'react';

function Filters({ onSubmit }) {
  const [formValues, setFormValues] = useState({
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
    max_square_feet: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Filter Homes</h3>

      <input type="text" name="id" placeholder="ID" onChange={handleChange} />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} />
      <input type="text" name="city" placeholder="City" onChange={handleChange} />
      <input type="text" name="state" placeholder="State" onChange={handleChange} />
      <input type="text" name="zip_code" placeholder="ZIP Code" onChange={handleChange} />

      <input type="number" name="min_house_value" placeholder="Min House Value" onChange={handleChange} />
      <input type="number" name="max_house_value" placeholder="Max House Value" onChange={handleChange} />

      <input type="number" name="min_estimated_rent" placeholder="Min Rent" onChange={handleChange} />
      <input type="number" name="max_estimated_rent" placeholder="Max Rent" onChange={handleChange} />

      <input type="number" name="bedrooms" placeholder="Bedrooms" onChange={handleChange} />
      <input type="number" name="bathrooms" placeholder="Bathrooms" onChange={handleChange} />

      <input type="number" name="min_square_feet" placeholder="Min Sq Ft" onChange={handleChange} />
      <input type="number" name="max_square_feet" placeholder="Max Sq Ft" onChange={handleChange} />

      <button type="submit">Search</button>
    </form>
  );
}

export default Filters;

