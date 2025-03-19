import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEcom } from "../Context/DataProvider";

function SingleProduct() {
    const { id } = useParams();
    const {
        fetchSingleProduct,
        singleProduct,
        categories,
        productsByCat,
        productFilterByCategory,
    } = useEcom();


    const [categoryName, setCategoryName] = useState("");
    useEffect(() => {
        fetchSingleProduct(id);

    }, []);

    useEffect(() => {
        if (singleProduct && categories) {
            setCategoryName(
                categories.find((obj) => obj._id === singleProduct.category)?.name
            );
        }
        productFilterByCategory(singleProduct.category);
    }, [categories, singleProduct]);

    console.log(singleProduct);
    return (
        <>
            {singleProduct && (
                <>
                    <div>
                        <div className="left">
                            <img src={singleProduct.image} />
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
                    <div>SIMILAR PRODUCTS HERE</div>
                </>
            )}
        </>
    );
}

export default SingleProduct;