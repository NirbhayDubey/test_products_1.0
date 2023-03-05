import React, { FC, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ProductCard from "../../component/product-card/ProductCard";
import { fetchProducts } from "../../features/productSlice";

const Products: FC<unknown> = () => {
  const { products } = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 3;
  const pageArr = Array.from(
    { length: Math.ceil(products.length / perPage) },
    (_, i) => i + 1
  );

  const showProducts = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * perPage;
    const lastPageIndex = firstPageIndex + perPage;
    return products.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, products]);

  useEffect(() => {
    (async () => {
      await dispatch(fetchProducts());
    })();
  }, []);

  return (
    <div className="py-10">
      <section className="max-w-4xl mx-auto">
        {/* pRODUCTS lIST */}
        <section className="grid md:grid-cols-3 gap-6 gap-y-10 m-6 lg:m-0">
          {showProducts?.map((item, index) => {
            return <ProductCard item={item} key={index} />;
          })}
        </section>
      </section>
      <section className="max-w-4xl mx-auto mt-8 px-4 flex gap-4">
        {pageArr.map((item) => {
          return (
            <button
              key={item}
              className="hover:bg-[#fdc886] bg-white px-3 py-3 border border-gray-500 shadow-lg rounded-lg font-semibold"
              onClick={() => setCurrentPage(item)}
            >
              {item}
            </button>
          );
        })}
      </section>
    </div>
  );
};

export default Products;
