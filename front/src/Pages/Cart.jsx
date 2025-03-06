import { useContext, useEffect, useState } from "react";
import { useEcom } from "../Context/DataProvider";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, updateProductQuantity, removeFromCart } = useEcom();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cart) {
      setTotalPrice(
        cart.reduce((acc, curr) => {
          return acc + curr.product.usualPrice * curr.quantity
        }, 0)
      )
    }
  }, [totalPrice, cart]);

  return (
    <div>
      {
        cart.length === 0 ? (
          <div>
            <h2>Nothing to show</h2>
            <p> <Link to="/">Go to home</Link> </p>
          </div>

        ) : (
          <>
            <div className="flex items-center justify-around">
              {
                cart.map((item) => {
                  return (
                    <div key={item.product._id} className="flex gap-30 py-8">
                      <div>
                        <img src={item.product.image} alt="" className="w-[300px] h-[300px]" />
                      </div>

                      <div className="">
                        <h1 className="my-3 text-3xl font-bold ">
                          {item.product.title}
                        </h1>
                        <p className="my-3">$ {item.product.usualPrice} </p>
                        <div>
                          <h1 className="my-3"><strong>Rating :</strong> {item.product.totalRating}</h1>
                          {/* <p>{product.totalRating.rating}</p> */}
                        </div>
                        <h1 className="my-3"><strong>Brand :</strong> {item.product.brand}</h1>
                        <p className="my-3"><strong>Description :</strong> {item.product.description} </p>
                        <div className="flex justify-between border-2 px-3 w-[120px] rounded-2xl border-amber-600 py-1 items-center">
                          {
                            item.quantity === 1 ? (
                              <p onClick={() => removeFromCart(item.product._id)} className="cursor-pointer">  <MdOutlineDeleteForever className="cursor-pointer font-bold" /> </p>
                            ) : (
                              <p onClick={() => updateProductQuantity(item.product._id, '-')} className="cursor-pointer font-bold"> - </p>

                            )
                          }
                          <p> {item.quantity} </p>
                          <p onClick={() => updateProductQuantity(item.product._id, '+')} className="cursor-pointer font-bold">  + </p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }

              <div className="cartTotal w-1/3 max-h-64 bg-amber-100 rounded-lg p-4">
                <h2 className="text-xl font-bold text-center">Order Summary</h2>

                <div className="itemTotalPrice flex justify-between items-center py-1">
                  <p>Items:</p>
                  <p className="inline-flex items-center">
                    <MdOutlineCurrencyRupee /> <span>{(totalPrice).toFixed(2)}</span>
                  </p>
                </div>

                <div className="deliveryCharges flex justify-between items-center py-1">
                  <p>Delivery:</p>
                  <p>--</p>
                </div>

                <div className="spacer py-2 border-b-1 border-gray-400"></div>

                <div className="cartTotal flex justify-between items-center py-1 text-green-700 text-xl font-bold">
                  <p>Order Total:</p>
                  <p className="inline-flex items-center">
                    <MdOutlineCurrencyRupee />{" "}
                    <span>{(totalPrice).toFixed(2)}</span>
                  </p>
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}
export default Cart