import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEcom } from "../Context/DataProvider";
import DisplayProducts from "../Components/DisplayProducts";
import instance from "../axiosConfig";
import { useAuth } from "../Context/AuthProvider.jsx";

function SingleProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const {
        addToCart,
        existInCart,
        removeFromCart,
        singleProductByCat,
        productFilterByCategory,
        categories,
    } = useEcom();

    const { isUserLoggedIn } = useAuth();


    const { id } = useParams();  // It retrieves the 'id' parameter from the URL.


    // Fetch product
    async function singleProductShow(productId) {
        try {
            setLoading(true);
            const response = await instance.get(`/product/get/${productId}`);
            setProduct(response.data.products[0]);
            console.log(response.data.products[0]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function userCartAuthentication() {
        if (isUserLoggedIn) {
            addToCart(product);
        } else {
            navigate("/user/login/?referer=" + window.location.href);
        }
    }

    // First: Fetch product when ID changes
    useEffect(() => {
        if (id) {
            singleProductShow(id);
        }
    }, [id]);

    // Second: Set category name when product or categories change
    useEffect(() => {
        if (product && product?.category && categories?.length > 0) {
            const foundCategory = categories.find((obj) => obj._id === product.category);
            setCategoryName(foundCategory?.name || "");
        }
    }, [product, categories]);

    // Third: Filter products by category
    useEffect(() => {
        if (categoryName) {
            productFilterByCategory(categoryName);
        }
    }, [categoryName]);

    return (
        <>
            {loading ? (
                <p className="text-center py-10">Loading...</p>
            ) : (
                <div className="flex gap-10 items-center justify-center py-10 flex-wrap">
                    <div>
                        <img
                            src={product?.image}
                            alt={product?.title}
                            className="w-[300px] h-[300px] object-contain"
                        />
                    </div>
                    <div>
                        <h1 className="my-3 text-3xl font-bold">{product?.title}</h1>
                        <p className="my-3">$ {product?.usualPrice}</p>
                        <div className="flex gap-2">
                            <strong>Rating :</strong>
                            <p>{product?.totalRating}</p>
                        </div>
                        <p className="my-3"><strong>Brand :</strong> {product?.brand}</p>
                        <p className="my-3"><strong>Category :</strong> {categoryName}</p>
                        <p className="my-3"><strong>Description :</strong> {product?.description}</p>
                        <div className="mt-5 flex gap-3">
                            {existInCart(product?._id) ? (
                                <button
                                    onClick={() => removeFromCart(product._id)}
                                    className="border-2 px-4 py-2 bg-red-500 text-white rounded"
                                >
                                    Remove from Cart
                                </button>
                            ) : (
                                <button
                                    onClick={userCartAuthentication}
                                    className="border-2 px-4 py-2 bg-cyan-600 text-white rounded cursor-pointer"
                                >
                                    Add to Cart
                                </button>
                            )}

                            <button className="border-2 px-4 py-2 bg-black text-white rounded">Buy Now</button>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <h1 className="text-center bg-blue-400 py-2 my-6">Similiar Products</h1>
                <div className="mt-8">
                    <DisplayProducts products={singleProductByCat.filter((item) => item._id !== product?._id)} />
                </div>
            </div>
        </>
    );
}

export default SingleProduct;
