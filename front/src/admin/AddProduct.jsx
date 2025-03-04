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
        discountPrice: "",
        image: "",
    })

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
            frm.append("image", form.image)

            // console.log(form); 

            const response = await instance.post("/product/add", frm, { withCredentials: true })
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form action="" onSubmit={handleSubmit} encType='multipart/form-data' className='flex gap-10 px-2'>
                <input type="text"
                    placeholder='Enter Product Title'
                    name='title'
                    value={form.title}
                    onChange={handleChange} className='border-2 ' />
                <input type="text"
                    placeholder='Enter Product Brand'
                    name='brand'
                    value={form.brand}
                    onChange={handleChange} className='border-2 ' />

                {/* <input type="text"
                    placeholder='Enter Product Category'
                    name='category'
                    value={form.category}
                    onChange={handleChange} className='border-2 ' /> */}

                <select name="category" id="" value={form.category} onChange={handleChange}>
                    <option value="" selected disabled>Select Category</option>
                    {categories.map((category, index) => {
                        return (
                            <option value={category._id} key={index}> {category.name} </option>
                        )
                    })
                    }
                </select>

                <input type="text"
                    placeholder='Enter Product Usual Price'
                    name='usualPrice'
                    value={form.usualPrice}
                    onChange={handleChange} className='border-2 ' />
                <input type="text"
                    placeholder='Enter Product Discount Price'
                    name='discountPrice'
                    value={form.discountPrice}
                    onChange={handleChange} className='border-2 ' />
                <input type="file" name="image" onChange={handleChange} className='border-2 ' />
                <button type="submit" className='border-2'>Add Poduct</button>
            </form>
        </>
    )
}

export default AddProduct