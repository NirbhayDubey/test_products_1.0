import React, { FC } from "react";
import ProductCard from "../../component/product-card/ProductCard";

const Products: FC<unknown> = () => {
  return (
    <div className="py-10">
      <section className="max-w-4xl mx-auto">
        {/* pRODUCTS lIST */}
        <section className="grid grid-cols-3 gap-6 gap-y-10">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
            return <ProductCard />;
          })}
        </section>
      </section>
    </div>
  );
};

export default Products;
