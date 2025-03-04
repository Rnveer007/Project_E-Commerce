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
            <form action="" encType='multipart/form-data' onSubmit={handleSubmit} className=' w-[800px] px-10 flex   gap-10'>
                <input type="text"
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    placeholder='Enter Category' className='border-2 px-3 py-1' />

                <input type="file"
                    name='image'
                    onChange={handleChange}
                    className='cursor-pointer'
                />
                <button type='submit' className='border-2 rounded px-3 py-1 bg-cyan-600 text-white  cursor-pointer font-bold' > submit</button>
            </form>
        </>
    )
}

export default AddCategory