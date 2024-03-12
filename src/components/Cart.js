import React, { useEffect, useState } from "react";
import IndividualProduct from "./IndividualProduct";
import data from "./Products.json";
import Header from "./Header";

const Cart = () => {
  const [productData, setProductData] = useState(data);
  const [productCount, setProductCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalRealCost, setTotalRealCost] = useState(0);

  useEffect(() => {
    const total = productData.reduce(
      (acc, cur) => acc + parseInt(cur.quantity, 10),
      0
    );
    setProductCount(total);

    const cost = productData.reduce(
      (acc, cur) =>
        acc +
        parseInt(cur.price.replace(/,/g, ""), 10) * parseInt(cur.quantity, 10),
      0
    );
    setTotalCost(cost);

    const totalRealPrice = productData.reduce(
      (acc, item) =>
        acc + parseInt(item.real_price.replace(/,/g, ""), 10) * item.quantity,
      0
    );
    setTotalRealCost(totalRealPrice);
  }, [productData]);

  function clearAllHandler() {
    setProductData([]);
    setProductCount(0);
    setTotalCost(0);
  }

  return (
    <>
      <Header productCount={productCount} />
      <main className="mt-8 flex flex-col justify-center items-center">
        <h1 className="text-3xl uppercase underline">Your cart</h1>
        {productData.length === 0 && <p>is Empty</p>}

        {productData.map((item, index) => {
          return (
            <IndividualProduct
              img={item.img}
              name={item.name}
              price={item.price}
              real_price={item.real_price}
              count={item.quantity}
              key={index}
              setProductCount={setProductCount}
              setTotalCost={setTotalCost}
              productData={productData}
              setProductData={setProductData}
              id={index}
            />
          );
        })}
      </main>
      <>
        <hr className="mx-auto w-4/5 border-t-2 bg-blue-800 my-2" />
        <footer className="mb-16 ">
          <div className="flex justify-between flex-col mb-8 items-center gap-8 w-full">
            <div className="flex justify-evenly gap-8  w-full">
              <p className="text-lg">Real Prize :</p>
              <p className="text-white bg-blue-800 px-4 rounded-md">
                ₹{totalRealCost > 0 ? totalRealCost : 0}
              </p>
            </div>
            <div className="flex justify-evenly gap-8  w-full">
              <p className="text-lg">Discount Amount:</p>
              <p className="text-white bg-green-600 px-4 rounded-md">
                ₹{totalRealCost - totalCost > 0 ? totalRealCost - totalCost : 0}
              </p>
            </div>
            <hr className="mx-auto w-4/5 border-t-2 bg-blue-800 my-2" />
            <div className="flex justify-evenly gap-8 w-full">
              <p className="text-lg">Pay :</p>
              <p className="text-white bg-blue-800 px-4 rounded-md">
                ₹{totalCost > 0 ? totalCost : 0}
              </p>
            </div>
          </div>
          <button
            className="hover:bg-blue-600 hover:text-white mx-auto flex bg-blue-200 py-2 px-4 text-blue-400  rounded-full"
            onClick={clearAllHandler}
          >
            Clear Cart
          </button>
        </footer>
      </>
    </>
  );
};

export default Cart;
