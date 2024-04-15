"use client";
import React, { useState } from "react";

export default function Checkout() {
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
      GST: 18,
    },
  ];

  const [subtotal, setSubtotal] = useState(
    products.reduce((acc, product) => acc + product.price * product.quantity, 0)
  );
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(null); // State to store coupon error message
  const [appliedCoupon, setAppliedCoupon] = useState(""); // State to store applied coupon

  const handleCoupon = (event: any) => {
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

  const [address, setAddress] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gray-100 pt-10 pb-10">
      <h1 className="mb-10 text-center text-2xl font-bold">Checkout</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-sm sm:flex sm:justify-start">
            {/* create a Address form */}
            <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={address.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  id="addressLine1"
                  value={address.addressLine1}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="123 Main St"
                />
              </div>
              <div>
                <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  id="addressLine2"
                  value={address.addressLine2}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Apartment, studio, or floor"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={address.city}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="City"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State/Province
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={address.state}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="State/Province"
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                  ZIP/Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  value={address.postalCode}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="ZIP/Postal Code"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={address.country}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Country"
                />
              </div>
            </form>
          
          </div>
        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2">
            <div className="rounded-lg">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="justify-between rounded-lg sm:flex sm:justify-start"
                >
                  <div className="sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-md font-medium text-gray-900">
                        {product.name}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">
                        {product.quantity}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">
                          {product.price.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr className="my-4" />
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
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$4.99</p>
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
          {!isCouponApplied && (
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                onChange={handleCoupon}
                className="w-full mb-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {couponError && (
                <p className="text-sm text-red-500">{couponError}</p>
              )}
              <p className="text-sm text-gray-500">
                Click "Apply" to use a coupon.
              </p>
              <button
                onClick={handleCoupon}
                className="mt-2 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
              >
                Apply Coupon
              </button>
            </div>
          )}
          {isCouponApplied && (
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-700">Discount Applied</p>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="flex items-center text-sm text-red-500 hover:text-red-700 focus:outline-none"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Remove Coupon
              </button>
            </div>
          )}

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
