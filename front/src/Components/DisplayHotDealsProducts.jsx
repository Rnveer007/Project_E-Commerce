import React, { useEffect } from 'react';
import { useEcom } from '../Context/DataProvider';

function DisplayHotDealsProducts() {
    const { fetchHotDeals, hotDeals, loading } = useEcom();

    useEffect(() => {
        fetchHotDeals();
    }, [fetchHotDeals]); // Best practice to include dependencies

    return (
        <>
            <h1>Hot Deals</h1>
            {loading && <p>Loading hot deals...</p>}
            {hotDeals.length === 0 && !loading && <p>No hot deals available.</p>}
            <ul>
                {hotDeals.map((deal) => (
                    <li key={deal._id}>{deal.name} - ${deal.price}</li>
                ))}
            </ul>
        </>
    );
}

export default DisplayHotDealsProducts;
