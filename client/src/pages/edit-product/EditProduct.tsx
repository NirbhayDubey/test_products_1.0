import React, { FC } from "react";
import EditProductCard from "../../component/product-card/EditProductCard";

const EditProduct: FC<unknown> = () => {
  return (
    <div className="py-10">
      <section className="max-w-4xl mx-auto">
        {/* pRODUCTS lIST */}
        <section className="flex flex-col gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
            return <EditProductCard />;
          })}
        </section>
      </section>
    </div>
  );
};

export default EditProduct;
