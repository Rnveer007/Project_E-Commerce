import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Components/Loader';
import DisplayProducts from '../Components/DisplayProducts';
import { dataContext } from '../Context/DataProvider';

function SingleCatProduct() {
  const { id } = useParams()
  const { productFilterByCategory, singleCatProduct, loading } = useContext(dataContext);

  useEffect(() => {
    if(id)
    productFilterByCategory(id)
  }, [id])
  return loading ? <Loader /> : <DisplayProducts products={singleCatProduct} />
}

export default SingleCatProduct