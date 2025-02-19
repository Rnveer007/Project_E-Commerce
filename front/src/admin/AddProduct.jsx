import React, { useState } from 'react'
import instance from 'axios'

function AddProduct() {
    const [form, setForm] = useState({
        title: "",
        brand: "",
        category: "",
        usualPrice: "",
        discountPrice: "",

    })

    function handleChange(e) {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const frm = new FormData();
            frm.append("title", form.title)
            frm.append("brand", form.brand)
            frm.append("category", form.category)
            frm.append("usualPrice", form.usualPrice)
            frm.append("discountPrice", form.discountPrice);

            const response = await instance.post("/product/add", frm)
            console.log(response)

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <input type="text"
                    placeholder='Enter Product Title'
                    name='title'
                    value={form.title}
                    onChange={handleChange} />
                <input type="text"
                    placeholder='Enter Product Brand'
                    name='brand'
                    value={form.brand}
                    onChange={handleChange} />
                <input type="text"
                    placeholder='Enter Product Category'
                    name='category'
                    value={form.category}
                    onChange={handleChange} />
                <input type="text"
                    placeholder='Enter Product Usual Price'
                    name='usualPrice'
                    value={form.usualPrice}
                    onChange={handleChange} />
                <input type="text"
                    placeholder='Enter Product Discount Price'
                    name='discountPrice'
                    value={form.discountPrice}
                    onChange={handleChange} />
                <button type="submit">Add Poduct</button>
            </form>
        </>
    )
}

export default AddProduct