import React, { useState } from 'react';
import axios from 'axios';
import Filters from './Filters';

function HomeSearch() {
    const [homes, setHomes] = useState([]);

    const fetchHomes = async (filters) => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await axios.get(`/homes?${queryParams}`);
            setHomes(response.data);
        } catch (err) {
            console.error('Error fetching homes:', err);
        }
    };

    return (
        <div>
            <Filters onSubmit={fetchHomes} />
            <h3>Available Homes</h3>
            <ul>
                {homes.map((home) => (
                    <li key={home.id}>
                        {home.address}, {home.city}, {home.state} - ${home.house_value}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HomeSearch;
