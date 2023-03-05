import { useFormik } from "formik";
import React, { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  fetchRemoveProduct,
  fetchUpdateProduct,
} from "../../features/productSlice";
import { Product } from "../../types/common";

const EditProductCard: FC<{
  item: Product;
}> = (props) => {
  const { item } = props;
  const { name, description, price, quantity, image, _id } = item;

  const dispatch = useAppDispatch();
  const thisRef = useRef<HTMLDivElement>(null);
  const [editProduct, setEditProduct] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        editProduct &&
        thisRef.current &&
        !thisRef.current.contains(event.target)
      ) {
        setEditProduct(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [thisRef, editProduct]);

  const ininialValues: Product = {
    name: name,
    description: description,
    image: image,
    price: price,
    quantity: quantity,
    _id: _id,
  };

  const formik = useFormik({
    initialValues: ininialValues,
    onSubmit: async (values, {}) => {
      try {
        await dispatch(fetchUpdateProduct(values));
        setEditProduct(false);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleDelete = async () => {
    try {
      await dispatch(fetchRemoveProduct(item));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-xl bg-white shadow-lg flex p-4" ref={thisRef}>
      <div className="h-[70px] w-auto rounded-xl overflow-hidden">
        <img
          src={`http://localhost:5000/images/${image?.[0]}`}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="w-full flex justify-between items-center pl-4">
        {editProduct ? (
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="md:w-1/4 border border-2 rounded-md p-2 px-4 text-sm outline-none"
              />
              <input
                type="text"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                className="md:w-1/4 border border-2 rounded-md p-2 px-4 text-sm outline-none"
              />
              <div className="md:w-2/4 flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  name="quantity"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.quantity}
                  className="w-1/2 border border-2 rounded-md p-2 px-4 text-sm outline-none"
                />
                <input
                  type="text"
                  name="price"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                  className="w-1/2 border-2 rounded-md p-2 px-4 text-sm outline-none"
                />
              </div>
              <input
                type={"submit"}
                className="text-sm bg-[#fdc886] py-1.5 px-4 rounded-md"
                value={"Update"}
              />
            </div>
          </form>
        ) : (
          <>
            <h4 className="w-1/4 text-sm font-semibold mb-2">{name}</h4>
            <p className="w-1/4 text-sm mb-2">{description} </p>
            <p className="w-1/4 text-center text-sm mb-2">{quantity} </p>
            <p className="w-1/4 text-center text-sm text-red-700 mb-2">
              &#8377; {price.toLocaleString("en-IN")}
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="text-sm bg-[#fdc886] py-1 px-4 rounded-md"
                onClick={() => setEditProduct(true)}
              >
                Edit
              </button>
              <button
                type="button"
                className="text-sm bg-[#ff658460] py-1 px-4 rounded-md"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProductCard;
