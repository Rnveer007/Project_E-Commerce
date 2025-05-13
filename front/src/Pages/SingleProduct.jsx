import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEcom } from "../Context/DataProvider";
import Loader from "../Components/Loader";
import { useAuth } from "../Context/AuthProvider";

function SingleProduct() {
  const { id } = useParams();
  const { fetchSingleProduct, fetchCategories, addToWishlist, addToCart } = useEcom();
  const { isUserLoggedIn } = useAuth();
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null); 

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    setLoading(true);
    
    try {
      const product = await fetchSingleProduct(id);
      setSingleProduct(product || {}); 
      
      const categoryList = await fetchCategories();
      setCategories(Array.isArray(categoryList) ? categoryList : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (Array.isArray(categories) && singleProduct?.category) {
      const category = categories.find((obj) => obj._id === singleProduct.category);
      setCategoryName(category ? category.name : "Unknown");
    }
  }, [singleProduct, categories]);

  function handleAddToWishlist() {
    isUserLoggedIn
      ? addToWishlist(singleProduct.slug)
      : (window.location.href = `/user/login?referer=/product/${singleProduct.slug}`);
  }

  function handleAddToCart() {
    isUserLoggedIn
      ? addToCart(singleProduct.slug)
      : (window.location.href = `/user/login?referer=/product/${singleProduct.slug}`);
  }

  if (loading) return <Loader />;

  return (
    <>
      {singleProduct && (
        <>
          <div className="flex items-center gap-10">
            <div className="left">
              <img src={singleProduct.image} alt={singleProduct.title} />
            </div>
            <div className="right">
              <span className="flex py-2">
                <span className="text-4xl">{singleProduct.brand}</span>
                <h1 className="text-4xl px-2">{singleProduct.title}</h1>
              </span>
              <div>
                <strong>Brand: </strong>{singleProduct.brand}
              </div>
              <div>
                <strong>Category: </strong>{categoryName}
              </div>
              <div>
                <strong>Description: </strong>{singleProduct.description}
              </div>
              <div className="flex gap-3 py-2">
                <button
                  className="rounded px-2 py-1 bg-blue-400 text-white"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </button>
                <button
                  className="rounded px-2 py-1 bg-blue-400 text-white"
                  onClick={handleAddToWishlist}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>

          <div>
            <h1>SIMILAR PRODUCTS HERE</h1>
            {/* Add logic to display similar products */}
          </div>
        </>
      )}
    </>
  );
}

export default SingleProduct;
