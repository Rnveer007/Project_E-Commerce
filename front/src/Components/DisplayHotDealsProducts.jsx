import React, { useEffect } from 'react';
import { useEcom } from '../Context/DataProvider';
import DisplayProducts from './DisplayProducts';
import Loader from './Loader';

function DisplayHotDealsProducts() {
    const {
        fetchHotDeals,
        dealProducts,
        loading
    } = useEcom();

    useEffect(() => {
        fetchHotDeals();
    }, []);

    return (loading) ? <Loader /> : <DisplayProducts products={dealProducts} />
}

export default DisplayHotDealsProducts;
