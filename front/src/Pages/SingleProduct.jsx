import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEcom } from "../Context/DataProvider";

function SingleProduct() {
    const { id } = useParams();
    const {
        fetchSingleProduct,
        singleProduct,
        categories,
        singleProductByCat,
        productFilterByCategory,
    } = useEcom();

    const [categoryName, setCategoryName] = useState("");
    const [similiarProduct, setSimiliarProduct] = useState([])

    useEffect(() => {
        fetchSingleProduct(id);

    }, []);

    useEffect(() => {
        setCategoryName(
            categories?.find((obj) => obj._id === singleProduct.category)?.name
        );

        productFilterByCategory(singleProduct?.category)

    }, [categories, singleProduct]);

    // console.log(similiarProduct)

    useEffect(() => {
        fetchSimilarProducts()
    }, [singleProduct, singleProductByCat])

    function fetchSimilarProducts() {
        setSimiliarProduct(singleProductByCat?.filter((item) => item._id !== singleProduct?._id))
    }
    return (
        <>
            {singleProduct && (
                <>
                    <div>
                        <div className="left flex items-center">
                            <div className="left w-[300px]  p-4">
                                <img src={singleProduct.image} className="w-[200px] m-auto" />
                            </div>
                            <div className="right pl-4">
                                <h2 className="my-2 text-2xl">{singleProduct.title}</h2>
                                <p className="my-2">
                                    <strong className="mr-2">Brand:</strong>
                                    {singleProduct.brand}
                                </p>
                                <p className="my-2">
                                    <strong className="mr-2">Category:</strong>
                                    {categoryName}
                                </p>
                                <p className="my-2">{singleProduct.description}</p>
                                <button className="border-1 bg-black text-white px-3 py-1 cursor-pointer mr-3">Add To Cart</button>
                                <button className="border-1 bg-black text-white px-3 py-1 cursor-pointer">Add To Wishlist</button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h1 className="text-center bg-blue-500 text-white font-bold py-1">SIMILAR PRODUCTS HERE</h1>
                        <div className="flex flex-wrap gap-20 justify-center pt-8">
                            {
                                similiarProduct.map((item) => {
                                    return (
                                        <div key={item._id}>
                                            <img src={item.image} alt="" className="w-[200px]" />
                                            <p className="text-center my-4 font-bold">{item.title}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default SingleProduct;