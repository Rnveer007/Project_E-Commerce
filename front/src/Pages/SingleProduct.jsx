import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEcom } from "../Context/DataProvider";
import Loader from "../Components/Loader";
import { useAuth } from "../Context/AuthProvider";

function SingleProduct() {
    const { id } = useParams();
    const {
        fetchSingleProduct,
        // singleProduct,
        // categories,
        fetchCategories
        // singleProductByCat,
        // productFilterByCategory,
    } = useEcom();

    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([]);
    const [singleProduct, setSingleProduct] = useState([]);

    const { isUserLoggedIn } = useAuth()


    useEffect(() => {
        if (id) initial();
    }, [id]);

    async function initial() {
        // setLoading(true);
        const product = await fetchSingleProduct(id);
        setSingleProduct(product);
        const categories = await fetchCategories();
        setCategories(categories);
        // setLoading(false);
    }
    // console.log("cat", categories)
    // console.log("sing", singleProduct)

    useEffect(() => {
        setCategoryName(
            categories.find((category) => category._id === singleProduct.category)
        );
    }, [singleProduct, categories]);

    if (loading) return <Loader />;

    return (
        <>
            {singleProduct && (
                <div>
                    <div className="left">
                        <img src={singleProduct.image} alt={singleProduct.title} />
                    </div>
                    <div className="right">
                        <h2>{singleProduct.title}</h2>
                        <p>
                            <strong>Brand: </strong>
                            {singleProduct.brand}
                        </p>
                        <p>
                            <strong>Category: </strong>
                            {categoryName}
                        </p>
                        <p>{singleProduct.description}</p>

                        <button>Add To Cart</button>
                        <button>Add To Wishlist</button>
                    </div>
                </div>
            )}
        </>
    );

}



export default SingleProduct;