import React from "react";

function ProductCard() {
  return (
    <div className="rounded-xl bg-white shadow-lg">
      <div className="h-[200px] w-full rounded-t-xl overflow-hidden">
        <img
          src="https://img.freepik.com/premium-vector/smart-watch-black-color-with-time-display-light-blue-background-with-shadow-flat-style_149852-475.jpg?w=2000"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col items-center py-4">
        <h4 className="text-sm font-semibold mb-2">DJ mavrick Pro</h4>
        <p className="text-sm text-red-700 mb-2">$ 500.00 </p>
        <button className="text-sm bg-[#fdc886] py-1.5 px-4 rounded-md">
          Shop now
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
