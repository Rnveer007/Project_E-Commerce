import { useContext } from "react"
import { dataContext } from "../Context/DataProvider"

function Cart() {
  const { cart } = useContext(dataContext);

  return (
    <div>

      {
        cart.map((item) => {
          return <div key={item.product._id} className="flex justify-center gap-30 py-8">
            <div>
              <img src={item.product.url} alt="" className="w-[300px] h-[300px]" />
            </div>

            <div className="">
              <h1 className="my-3 text-3xl font-bold ">
                {item.product.name}
              </h1>
              <p className="my-3">$ {item.product.price} </p>
              <div>
                <h1 className="my-3"><strong>Rating :</strong></h1>
                <p className="my-3">{item.product.totalRating}</p>
                {/* <p>{product.totalRating.rating}</p> */}
              </div>
              <h1 className="my-3"><strong>Brand :</strong> {item.product.brand}</h1>
              <p className="my-3"><strong>Description :</strong> {item.product.description} </p>
            </div>
          </div>
        })
      }

    </div>
  )
}

export default Cart