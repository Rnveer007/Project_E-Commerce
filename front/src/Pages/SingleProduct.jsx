import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useEcom } from "../Context/DataProvider";
import DisplayProducts from "../Components/DisplayProducts";
// import axios from "axios";
import instance from "../axiosConfig";

function SingleProduct() {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false)
    const { addToCart,
        existInCart,
        removeFromCart,
        singleProductByCat,
        productFilterByCategory,
    } = useEcom()


    const { id } = useParams()

    async function singleProductShow(id) {
        try {
            setLoading(true)
            const response = await instance.get(`/product/get/${id}`);
            setProduct(response.data[0]);
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
        if (product.category) {
            productFilterByCategory(product.category)
        }
    }, [id, product.category])


    return (
        <>
            <div className="flex gap-30 items-center justify-center py-26">
                <div>
                    <img src={product.image} alt="" className="w-[300px] h-[300px]" />
                </div>
                <div className="">
                    <h1 className="my-3 text-3xl font-bold ">
                        {product.title}
                    </h1>
                    <p className="my-3">$ {product.usualPrice} </p>
                    <div className="flex">
                        <h1 className="my-3"><strong>Rating :</strong></h1>
                        <p className="my-3">{product.totalRating}</p>
                        {/* <p>{product.totalRating.rating}</p> */}
                    </div>
                    <h1 className="my-3"><strong>Brand :</strong> {product.brand}</h1>
                    <h1 className="my-3"><strong>Category :</strong> {product.category}</h1>
                    <p className="my-3"><strong>Description :</strong> {product.description} </p>
                    <div className="mt-5">
                        {
                            existInCart(product._id) ? (
                                <button onClick={() => removeFromCart(product._id)} className="border-2 px-3 py-1 cursor-pointer ">Remove from Cart</button>
                            ) :
                                <button onClick={() => addToCart(product)} className="border-2 px-3 py-1 cursor-pointer  ">Add to Cart</button>
                        }
                        <button className="border-2 px-3 py-1 cursor-pointer ml-3">Add to Wishlist</button>
                    </div>
                </div>
            </div>

            <div>
                <h1>What other items do customers buy after viewing this item?</h1>
                <div>
                    <DisplayProducts products={singleProductByCat.filter((item) => item._id !== product._id)} />

                </div>
            </div>
        </>
    )
}

export default SingleProduct