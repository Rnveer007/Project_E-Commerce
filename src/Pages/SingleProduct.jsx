import { useContext, useEffect, useState } from "react"
import instance from "../axiosConfig";
import { useParams } from "react-router-dom";
import { dataContext } from "../Context/DataProvider";

function SingleProduct() {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false)
    const { addToCart } = useContext(dataContext)
    const { id } = useParams()

    async function singleProductShow(id) {
        try {
            setLoading(true)
            const response = await instance.get(`/product/${id}`);
            setProduct(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            singleProductShow(id)
        }
    }, [id])


    return (
        <div className="flex gap-30 items-center justify-center py-26">
            <div>
                <img src={product.url} alt="" className="w-[300px] h-[300px]" />
            </div>
            <div className="">
                <h1 className="my-3 text-3xl font-bold ">
                    {product.name}
                </h1>
                <p className="my-3">$ {product.price} </p>
                <div>
                    <h1 className="my-3"><strong>Rating :</strong></h1>
                    <p className="my-3">{product.totalRating}</p>
                    {/* <p>{product.totalRating.rating}</p> */}
                </div>
                <h1 className="my-3"><strong>Brand :</strong> {product.brand}</h1>
                <p className="my-3"><strong>Description :</strong> {product.description} </p>
                <div className="mt-5">
                    <button onClick={() => addToCart(product)} className="border-2 px-3 py-1 cursor-pointer  ">Add to Cart</button>
                    <button className="border-2 px-3 py-1 cursor-pointer ml-3">Add to Wishlist</button>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct