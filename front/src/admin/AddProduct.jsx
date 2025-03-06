import React, { useState } from 'react'
import instance from '../axiosConfig'
import { useEcom } from '../Context/DataProvider';

function AddProduct() {
    const { categories } = useEcom()
    const [form, setForm] = useState({
        title: "",
        brand: "",
        category: "",
        usualPrice: "",
        discountType: "",
        discount: "",
        discountPrice: "",
        image: "",
    })

    function handleDiscountPriceChange(e) {
        const a =
            form.discountType === "%"
                ? form.usualPrice - (e.target.value * form.usualPrice) / 100 :
                form.usualPrice - e.target.value

        setForm((prevForm) => ({ ...prevForm, discountPrice: a }))

    }

    function handleChange(e) {
        if (e.target.name === "image") {
            // console.log("Selected File:", e.target.files[0]); // Debugging
            setForm(prevForm => ({ ...prevForm, image: e.target.files[0] }));
        } else {
            const { name, value } = e.target;
            setForm(prevForm => ({ ...prevForm, [name]: value }));
        }
    };


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const frm = new FormData();
            frm.append("title", form.title)
            frm.append("brand", form.brand)
            frm.append("category", form.category)
            frm.append("usualPrice", form.usualPrice)
            frm.append("discountPrice", form.discountPrice);
            frm.append("discount", form.discount.discountType);
            frm.append("image", form.image);

            // console.log(form); 

            const response = await instance.post("/product/add", frm, { withCredentials: true })
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form action="" onSubmit={handleSubmit} encType='multipart/form-data' className='flex flex-col items-center py-8 gap-10 '>
                <input type="text"
                    placeholder='Enter Product Title'
                    name='title'
                    value={form.title}
                    onChange={handleChange} className='border-2 pl-3 w-[250px]  py-1' />
                <input type="text"
                    placeholder='Enter Product Brand'
                    name='brand'
                    value={form.brand}
                    onChange={handleChange} className='border-2 pl-3 w-[250px]  py-1' />

                {/* <input type="text"
                    placeholder='Enter Product Category'
                    name='category'
                    value={form.category}
                    onChange={handleChange} className='border-2 ' /> */}

                <select name="category" id="" value={form.category} onChange={handleChange} className='capitalize border-2 w-[250px] py-1'>
                    <option value="" selected disabled>Select Category</option>
                    {categories.map((category, index) => {
                        return (
                            <option value={category._id} key={index} > {category.name} </option>
                        )
                    })
                    }
                </select>

                <input type="text"
                    placeholder='Enter M.R.P.'
                    name='usualPrice'
                    value={form.usualPrice}
                    onChange={handleChange} className='border-2 pl-3 py-1 w-[250px]' />

                <div>
                    <select name="discountType" id="discountType" value={form.discountType} onChange={handleChange}  >
                        <option value="" selected disabled>Select Discount Type</option>
                        <option value="%">In Percentage</option>
                        <option value="inr">In Rupees</option>
                    </select>
                    <input type="text" name='discount' placeholder={form.discountType === "%" ? "Discount in Percentage" : "Discount in Rupees"} value={form.discount} onChange={handleChange} onBlur={handleDiscountPriceChange} />
                </div>


                <input type="text"
                    placeholder='Product Dis. Price'
                    name='discountPrice'
                    value={form.discountPrice}
                    onChange={handleChange} className='border-2 pl-3 w-[250px]' />

                <input type="file" name="image" onChange={handleChange} className='border-2 items-center pl-3  w-[250px] py-1' />
                <button type="submit" className='border-2 py-1 px-3 bg-cyan-600 text-white cursor-pointer font-bold w-[250px] '>Add Poduct</button>
            </form>
        </>
    )
}

export default AddProduct