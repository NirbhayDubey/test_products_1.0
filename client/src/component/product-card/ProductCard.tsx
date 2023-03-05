import React, { FC } from "react";
import { Product } from "../../types/common";

const ProductCard: FC<{
  item: Product;
}> = (props) => {
  const { name, description, price, image } = props.item;

  return (
    <div className="rounded-xl bg-white shadow-lg flex flex-col">
      <div className="h-[200px] w-full rounded-t-xl overflow-hidden">
        <img
          src={`http://localhost:5000/images/${image?.[0]}`}
          alt=""
          className="h-full w-full object-contain object-center"
        />
      </div>
      <div className="flex-auto flex flex-col text-center items-center py-4">
        <h4 className="text-sm font-semibold mb-2">{name}</h4>
        <p className="text-xs mb-2 opacity-70 px-4">{description}</p>
        <p className="text-sm text-red-700 mt-auto mb-2 font-semibold">
          &#8377; {price.toLocaleString("en-IN")}
        </p>
        <button className="text-sm bg-[#fdc886] py-1.5 px-4 rounded-md">
          Shop now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
