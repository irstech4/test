'use client'
import React, { useState } from "react";

export default function Cart() {
  const products = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      name: "Nike Air Max 2019",
      size: "36EU - 4US",
      price: 259000,
      quantity: 1,
      GST: 18,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80",
      name: "Another Product Name",
      size: "One Size",
      price: 49999,
      quantity: 1,
      GST:18
    },
  ];

  const [subtotal, setSubtotal] = useState(
    products.reduce((acc, product) => acc + product.price * product.quantity, 0)
  );
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(null); // State to store coupon error message
  const [appliedCoupon, setAppliedCoupon] = useState(""); // State to store applied coupon

  const handleCoupon = (event:any) => {
    const couponCode = event.target.value.toUpperCase(); // Convert code to uppercase for case-insensitive matching
    setCouponError(null); // Clear any previous error message

    if (couponCode === "MYSECRETDISCOUNT") {
      const discountAmount = subtotal * 0.1; // Apply 10% discount
      setDiscount(discountAmount);
      setIsCouponApplied(true);
      setAppliedCoupon(couponCode); // Set the applied coupon code
    } else if (couponCode === "FLATPCT50") {
      // Handle flat percentage discount with a maximum cap (replace with your logic)
      const maxDiscount = 1000; // Set a maximum discount cap (e.g., INR 100,000)
      const discountAmount = Math.min(subtotal * 0.5, maxDiscount);
      setDiscount(discountAmount);
      setIsCouponApplied(true);
      setAppliedCoupon(couponCode); // Set the applied coupon code
    } else {
      setDiscount(0);
      setIsCouponApplied(false);
      setAppliedCoupon(""); // Reset applied coupon code
      // setCouponError("Invalid coupon code!");
    }

    // Recalculate subtotal after applying discount
    setSubtotal(subtotal - discount);
  };

  const handleRemoveCoupon = () => {
    setIsCouponApplied(false);
    setDiscount(0);
    setAppliedCoupon(""); // Reset applied coupon code
    setSubtotal(
      products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      )
    ); // Recalculate subtotal without discount
  };

  return (
    <div className="bg-gray-100 pt-10 pb-10">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {products.map((product) => (
            <div
              key={product.id}
              className="justify-between mb-6 rounded-lg bg-white p-6 shadow-sm sm:flex sm:justify-start"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg sm:w-40"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-xs text-gray-700">{product.size}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                      {" "}
                      -{" "}
                    </span>

                    <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                      {" "}
                      +{" "}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">
                      {product.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">
              {subtotal.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </p>
          </div>
          {isCouponApplied && (
            <div className="flex justify-between">
              <p className="text-gray-700">
                Discount ({appliedCoupon || "Applied"})
              </p>
              <p className="text-gray-700">
                {discount.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </p>
            </div>
          )}
          <div className="flex justify-between">
            <p className="text-gray-700">GST</p>
            <p className="text-gray-700">18%</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipment</p>
            <p className="text-gray-700">60</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">
                {(subtotal - discount + 4.99).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </p>
              {/* <p className="text-sm text-gray-700">including VAT</p> */}
            </div>
          </div>

       
     
            <button
              type="button"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 mt-2"
            >
              Checkout
            </button>
        
        </div>
      </div>
    </div>
  );
}
