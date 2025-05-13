import { useEffect, useState } from "react";
import instance from '../axiosConfig';
import slugify from "slugify";
import { useEcom } from '../Context/DataProvider';

function AddProduct() {
    const { fetchCategories } = useEcom();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await fetchCategories();
        setCategories(response.category);
    }

    const [form, setForm] = useState({
        title: "",
        slug: "",
        brand: "",
        category: [],
        usualPrice: "",
        discountType: "%",
        discount: "",
        discountPrice: "",
        image: "",
        description: "",
    });

    const [error, setError] = useState("");

    // Function to handle discount price calculation
    function handleDiscountPriceChange(e) {
        const discountValue = form.discountType === "%" 
            ? form.usualPrice - (e.target.value * form.usualPrice) / 100 
            : form.usualPrice - e.target.value;

        setForm((prevForm) => ({ ...prevForm, discountPrice: discountValue }));
    }

    function handleChange(e) {
        if (e.target.name === "image") {
            setForm((form) => ({ ...form, image: e.target.files[0] }));
        } else {
            const { name, value } = e.target;
            setForm((form) => ({ ...form, [name]: value }));
        }
    };

    // Form submit handler
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const frm = new FormData();
            frm.append("title", form.title);
            frm.append("brand", form.brand);
            frm.append("slug", form.slug);
            frm.append("category", form.category);
            frm.append("usualPrice", form.usualPrice);
            frm.append("discountPrice", form.discountPrice);
            frm.append("discount", form.discount + "" + form.discountType);
            frm.append("image", form.image);

            const response = await instance.post("/product/add", frm, {
                withCredentials: true
            });

            if (response.status === 200) {
                alert("Product added successfully!");
            } else {
                setError("Failed to add the product.");
            }
        } catch (error) {
            setError("An error occurred while adding the product.");
            console.error(error);
        }
    }

    return (
        <>
            <div className='p-4'>
                <form onSubmit={handleSubmit} encType='multipart/form-data' className='flex flex-col w-[500px] m-auto items-center py-8 gap-10 border-1 border-gray-300'>
                    <input 
                        type="text"
                        placeholder='Enter Product Title'
                        name='title'
                        value={form.title}
                        onChange={handleChange}
                        onBlur={(e) => 
                            setForm((form) => ({
                                ...form,
                                slug: slugify(e.target.value, {
                                    lower: true,
                                    remove: /[*+~.()'"!:@/]/g,
                                }),
                            }))
                        }
                        className='border-2 pl-3 w-[250px] py-1'
                    />
                    <input 
                        type="text"
                        placeholder='Enter Product Slug'
                        name='slug'
                        value={form.slug}
                        onChange={handleChange}
                        className='border-2 pl-3 w-[250px] py-1'
                    />
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className='capitalize border-2 w-[250px] py-1'>
                        <option value="" disabled>Select Category</option>
                        {categories.map((category, index) => (
                            <option value={category._id} key={index}>{category.name}</option>
                        ))}
                    </select>
                    <input 
                        type="text"
                        placeholder='Enter M.R.P.'
                        name='usualPrice'
                        value={form.usualPrice}
                        onChange={handleChange}
                        className='border-2 pl-3 py-1 w-[250px]'
                    />
                    <div>
                        <select 
                            name="discountType" 
                            value={form.discountType} 
                            onChange={handleChange} 
                            className='border-2'>
                            <option value="%">In Percentage</option>
                            <option value="inr">In Rupees</option>
                        </select>
                        <input 
                            type="text" 
                            name='discount' 
                            placeholder={form.discountType === "%" ? "Discount in Percentage" : "Discount in Rupees"} 
                            value={form.discount} 
                            onChange={(e) => {
                                handleChange(e);
                                handleDiscountPriceChange(e);
                            }} 
                            className='pl-2'
                        />
                    </div>
                    <input 
                        type="text"
                        placeholder='Product Discounted Price'
                        name='discountPrice'
                        value={form.discountPrice}
                        onChange={handleChange}
                        className='border-2 pl-3 py-1 w-[250px]'
                    />
                    <input 
                        type="file" 
                        name="image" 
                        onChange={handleChange} 
                        className='border-2 items-center pl-3 w-[250px] py-1'
                    />
                    <button 
                        type="submit" 
                        className='border-2 py-1 px-3 bg-cyan-600 text-white cursor-pointer font-bold w-[250px]'>
                        Add Product
                    </button>
                    {error && <div className="text-red-500">{error}</div>}
                </form>
            </div>
        </>
    );
}

export default AddProduct;
