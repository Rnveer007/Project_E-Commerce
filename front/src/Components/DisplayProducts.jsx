import React from 'react'
import { Link } from 'react-router-dom'

function DisplayProducts({ products }) {
    //    console.log("rishi" + products)
    return (
        <>
            <div className='pl-8'>
                <div className="flex flex-wrap gap-10">
                    {/*Short Circuit Evaluation */}
                    {products?.length > 0 ?
                        products?.map((item) => {
                            return (
                                <div key={item._id}
                                    className=" text-center border-1 border-gray-300 p-4 ">
                                    <Link to={`/product/${item._id}`}>
                                        <img src={item.image} alt=""
                                            className=" w-[150px] h-[150px] object-contain" />
                                    </Link>
                                    <h1 className=" my-4">
                                        {item.title.split(" ").slice(0, 5).join(" ") + "..."}
                                    </h1>
                                    <p className=" my-4">
                                        {"M.R.P."} ₹ {item.usualPrice}
                                    </p>
                                    <p className=" my-4 text-red-500">
                                        {"Discounted Price"} ₹ {item.discountPrice}
                                    </p>
                                    <button
                                        className="border-2 px-3 py-1 mx-3 cursor-pointer bg-cyan-300 border-cyan-50 font-bold hover:transition-all hover:text-white hover:bg-black">
                                        Add to Wishlist
                                    </button>
                                </div>
                            )
                        })
                        : ''}
                </div>
            </div>

        </>
    )
}

export default DisplayProducts