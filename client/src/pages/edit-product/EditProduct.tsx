import React, { FC, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AddProductModal from "../../component/modals/AddProductModal";
import EditProductCard from "../../component/product-card/EditProductCard";
import { fetchProducts } from "../../features/productSlice";
import { Product } from "../../types/common";

const EditProduct: FC<unknown> = () => {
  const { products } = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);
  const [searchStr, setSearchStr] = useState<string>("");
  const [showProducts, setShowProducts] = useState<Array<Product>>(products);

  useEffect(() => {
    (async () => {
      await dispatch(fetchProducts());
    })();
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter((pro) =>
      pro.name.toLowerCase().includes(searchStr.toLowerCase())
    );
    setShowProducts(filteredProducts);
  }, [products, searchStr]);

  const handleSearch = useCallback((e: any) => {
    setSearchStr(e.currentTarget.value);
  }, []);

  return (
    <div className="py-10">
      {showModal && <AddProductModal handleClose={() => setShowModal(false)} />}
      <section className="max-w-4xl mx-auto">
        {/* PRODUCT ADD */}
        <section className="flex justify-end gap-4 items-center mb-4">
          <div className="">
            <input
              type="text"
              name=""
              id=""
              onChange={handleSearch}
              placeholder="Search Product"
              className="w-[200px] border border-2 rounded-md p-2 px-4 text-sm outline-none"
            />
          </div>
          <button
            className="bg-[#fdc886] py-2 px-6 rounded-lg shadow text-sm"
            onClick={() => setShowModal(true)}
          >
            Add new product
          </button>
        </section>
        {/* PRODUCTS lIST */}
        <section className="flex flex-col gap-6">
          {showProducts?.map((item, index) => {
            return <EditProductCard item={item} key={index} />;
          })}
        </section>
      </section>
    </div>
  );
};

export default EditProduct;
