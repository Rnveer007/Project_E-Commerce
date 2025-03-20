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
            categories?.find((obj) => obj._id === singleProduct.category?._id)?.name
        );

        productFilterByCategory(singleProduct.category?._id)

    }, [categories, singleProduct]);

    useEffect(() => {
        fetchSimilarProducts()
    }, [singleProduct, singleProductByCat])

    function fetchSimilarProducts() {
        setSimiliarProduct(singleProductByCat.filter((item) => item._id !== singleProduct._id))
    }
    return (
        <>
            {singleProduct && (
                <>
                    <div>
                        <div className="left">
                            <img src={singleProduct.image} className="w-[200px]" />
                        </div>
                        <div className="right">
                            <h2>{singleProduct.title}</h2>
                            <p>
                                <strong>Brand:</strong>
                                {singleProduct.brand}
                            </p>
                            <p>
                                <strong>Category:</strong>
                                {categoryName}
                            </p>
                            <p>{singleProduct.description}</p>
                            <button>Add To Cart</button>
                            <button>Add To Wishlist</button>
                        </div>
                    </div>

                    <div>
                        <h1>SIMILAR PRODUCTS HERE</h1>
                        {
                            similiarProduct.map((item) => {
                                return (
                                    <div key={item._id}>
                                        <img src={item.image} alt="" className="w-[200px]" />
                                        <p>{item.title}</p>

                                    </div>
                                )
                            })
                        }
                    </div>
                </>
            )}
        </>
    );
}

export default SingleProduct;