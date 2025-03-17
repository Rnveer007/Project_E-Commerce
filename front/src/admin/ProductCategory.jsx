import React, { useEffect } from 'react'
import { useEcom } from '../Context/DataProvider';

function ProductCategory() {
    const { categories, fetchCategories, handleDelete } = useEcom();

    useEffect(() => {
        fetchCategories();
    }, []);
    console.log(categories)

    return (
        <div className='p-4'>
            <h2 className="font-bold text-2xl my-5">Products Categories</h2>
            <table className="w-full">
                <thead>
                    <tr className="text-left my-2 pb-4">
                        <th className='pl-3'>Category Name</th>
                        <th>Category ID</th>
                        <th>Category Image</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((item, index) => {
                        return (
                            <tr key={item._id}
                                className={`mb-2 mt-4 ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                                    }`}>
                                <td className="py-3 px-3 capitalize">{item.name}</td>
                                <td className="py-3">{item._id}</td>
                                <td className="py-3"><img src={item.image} alt="" className='w-[100px]' /></td>
                                <td className="py-3">
                                    <button className="bg-red-500 text-white p-1 rounded"
                                        onClick={() => handleDelete(item._id, "category")}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ProductCategory