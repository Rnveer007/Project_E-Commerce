import { Link } from "react-router-dom";
import { useEcom } from "../Context/DataProvider";
import { useEffect, useState } from "react";

function AdminProducts() {
    const { products, fetchData, handleDelete } = useEcom();
    const [page, setPage] = useState(1);


    useEffect(() => {
        if (page > 1) fetchData(page)
        else fetchData();
    }, [page]);



    return (
        <div className="min-h-screen flex">
            <aside className="w-1/5 p-4 bg-gray-200 rounded h-screen">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <ul className="mt-4">
                    <li className="py-2">
                        <Link to="/admin/home">Dashboard</Link>
                    </li>
                    <li className="py-2">
                        <Link to="">Products</Link>
                    </li>
                    <li className="py-2">
                        <Link to="">Orders</Link>
                    </li>
                    <li className="py-2">
                        <Link to="">Users</Link>
                    </li>
                </ul>
            </aside>
            <main className="w-4/5 p-6">
                <h2 className=" my-2">Products</h2>
                <table className="w-full">
                    <thead>
                        <tr className="text-left my-2 pb-4">
                            <th>Product Name</th>
                            <th>Original Price</th>
                            <th>Discounted Price</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.products?.map((item, index) => {
                            return (
                                <tr key={item._id}
                                    className={`mb-2 mt-4 ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                                        }`}>
                                    <td className="py-3">{item.title}</td>
                                    <td className="py-3">{item.usualPrice}</td>
                                    <td className="py-3">{item.discountPrice}</td>
                                    <td className="py-3">{item.category.name}</td>
                                    <td className="py-3">
                                        <button className="bg-red-500 text-white p-1 rounded"
                                            onClick={() => handleDelete(item._id, "products")}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>


                <div className="pagenation my-3">
                    {products.currentPage > 1 && (
                        <Link
                            to={`?page=${products.currentPage - 1}`}
                            className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer"
                            onClick={() => setPage(products.currentPage - 1)}
                        >
                            Previous

                        </Link>
                    )}

                    {Array.from({ length: products.totalPages }).map((_, index) => {
                        return (
                            <Link key={index} to={`?page=${index + 1}`} className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer"
                                onClick={() => setPage(index + 1)}
                            >{index + 1}</Link>
                        );
                    })}
                    {
                        products.currentPage < products.totalPages && (
                            <Link
                                to={`?page=${products.currentPage + 1}`}
                                className="bg-blue-500 text-white p-1 rounded mx-2 px-2 cursor-pointer"
                                onClick={() => setPage(products.currentPage + 1)}
                            >
                                Next
                            </Link>
                        )
                    }
                </div>
            </main>
        </div>
    );
}

export default AdminProducts;