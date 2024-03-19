import React, { useRef } from 'react';
function Bar() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <div className="max-w-full mx-4 md:mx-10 lg:mx-20 bg-red-400 min-h-24 overflow-x-auto">
        <div className="flex justify-center space-x-4 p-4 md:p-10">
          <div className="w-48 md:w-38 h-48 md:h-38">
            <img
              className="object-cover w-full h-full"
              src="https://rukminim2.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100"
              alt="Product 1"
            />
          </div>
          <div className="w-48 md:w-38 h-48 md:h-38">
            <img
              className="object-cover w-full h-full"
              src="https://rukminim2.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100"
              alt="Product 2"
            />
          </div>
          <div className="w-48 md:w-38 h-48 md:h-38">
            <img
              className="object-cover w-full h-full"
              src="https://rukminim2.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100"
              alt="Product 3"
            />
          </div>
          <div className="w-48 md:w-38 h-48 md:h-38">
            <img
              className="object-cover w-full h-full"
              src="https://rukminim2.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100"
              alt="Product 4"
            />
          </div>
          <div className="w-48 md:w-38 h-48 md:h-38">
            <img
              className="object-cover w-full h-full"
              src="https://rukminim2.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100"
              alt="Product 5"
            />
          </div>
          <div className="w-48 md:w-38 h-48 md:h-38">
            <img
              className="object-cover w-full h-full"
              src="https://rukminim2.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100"
              alt="Product 6"
            />
          </div>
          <div className="w-48 md:w-38 h-48 md:h-38">
            <img
              className="object-cover w-full h-full"
              src="https://rukminim2.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100"
              alt="Product 7"
            />
          </div>
          <div className="w-48 md:w-38 h-48 md:h-38">
            <img
              className="object-cover w-full h-full"
              src="https://rukminim2.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100"
              alt="Product 8"
            />
          </div>
          <div className="w-48 md:w-38 h-48 md:h-38">
            <img
              className="object-cover w-full h-full"
              src="https://rukminim2.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100"
              alt="Product 9"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Bar;
