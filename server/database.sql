CREATE DATABASE homerentals;

CREATE TABLE rentals(
    id SERIAL PRIMARY KEY,
    address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    house_value DOUBLE PRECISION,
    estimated_rent DOUBLE PRECISION,
    bedrooms INTEGER,
    bathrooms INTEGER,
    square_feet INTEGER,
    description TEXT
);

