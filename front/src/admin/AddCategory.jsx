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
            <div className='p-4'>
                <h1 className='text-center font-bold my-3 text-2xl'>List Your Prodocut's Categories Here</h1>
                <form action="" encType='multipart/form-data' onSubmit={handleSubmit}
                    className=' w-[600px] m-auto mt-8 p-4 px-10'>
                    <input type="text"
                        name='name'
                        value={form.name}
                        onChange={handleChange}
                        placeholder='Enter Category' className='border-2 px-3 py-1' />

                    <input type="file"
                        name='image'
                        onChange={handleChange}
                        className='cursor-pointer border-1 py-1 mt-5'
                    />
                    <button type='submit' className='border-2 rounded px-3 py-1 ml-5 bg-cyan-600 text-white  cursor-pointer font-bold' > submit</button>
                </form>
            </div>
        </>
    )
}

export default AddCategory