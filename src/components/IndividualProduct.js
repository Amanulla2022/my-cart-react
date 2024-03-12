import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const IndividualProduct = ({
  img,
  name,
  price,
  real_price,
  count,
  setProductCount,
  setTotalCost,
  productData,
  setProductData,
  id,
}) => {
  const [quantity, setQuantity] = useState(count);

  useEffect(() => {
    if (count === 0) {
      removeHandler(id);
    }
  }, [quantity]);

  function incrementQuantity() {
    const updatedArray = productData.map((elem, index) => {
      if (index === id) {
        const updatedQuantity = parseInt(elem.quantity, 10) + 1;
        elem.quantity = updatedQuantity.toString(); // If you wish to keep quantity as a string in state
        setQuantity(updatedQuantity);
        setProductCount((previousValue) => previousValue + 1);
        setTotalCost((previousValue) =>
          Math.round(previousValue + parseInt(price, 10))
        );
      }
      return elem;
    });

    setProductData(updatedArray);
  }

  function decrementQuantity() {
    if (count > 0) {
      const updatedArray = productData.map((elem, index) => {
        if (index === id) {
          elem.quantity -= 1;

          setQuantity(quantity - 1);
          setProductCount((previousValue) => previousValue - 1);
          setTotalCost((previousValue) => Math.round(previousValue - price));
        }
        return elem;
      });

      setProductData(updatedArray);
    }
  }

  function removeHandler(id) {
    setProductData((previousState) => {
      const data = [...previousState];
      data.splice(id, 1);
      return data;
    });
  }
  return (
    <>
      <div className="flex justify-evenly gap-10 w-4/5 mb-8 ">
        <img className="h-48 w-48 object-contain" src={img} alt={name} />
        <div className="flex flex-col flex-grow  justify-center gap-4">
          <p className="text-lg">{name}</p>
          <div className="flex gap-8 items-center">
            <p
              className="text-gray-500 text-sm"
              style={{
                textDecorationLine: "line-through",
                textDecorationColor: "red",
              }}
            >
              ₹{real_price}
            </p>
            <p className="text-lg ">
              <span className="text-green-600">₹ </span>
              {price}
            </p>
          </div>
          <MdDelete
            onClick={() => {
              removeHandler(id);
            }}
            className="text-2xl cursor-pointer text-red-600 transform hover:scale-125 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col items-center gap-2 justify-center">
          <FaAngleUp
            onClick={incrementQuantity}
            className="text-2xl cursor-pointer text-green-400"
          />
          <p>{productData[id].quantity}</p>
          <FaAngleDown
            onClick={decrementQuantity}
            className="text-2xl cursor-pointer text-red-400"
          />
        </div>
      </div>
    </>
  );
};

export default IndividualProduct;
