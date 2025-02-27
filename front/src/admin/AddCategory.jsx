import { useState } from 'react'
import instance from '../axiosConfig';

function AddCategory() {
    let [form, setform] = useState({
        name: '',
        image: '',
    })

    function handleChange(e) {
        let { name, value } = e.target;
        if (name === "image") {
            value = e.target.files[0]
        }
        setform((prev) => { return { ...prev, [name]: value } })
    }


    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const frm = new FormData();
            frm.append("name", form.name)
            frm.append("image", form.image)
            const response = await instance.post("/product/category/add", frm, { withCredentials: true })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form action="" encType='multipart/form-data' onSubmit={handleSubmit}>
                <input type="text"
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    placeholder='Enter Category' />
                <input type="file"
                    name='image'
                    onChange={handleChange}
                />
                <button type='submit'> submit</button>
            </form>
        </>
    )
}

export default AddCategory