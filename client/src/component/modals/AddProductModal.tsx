import { useFormik } from "formik";
import React, { FC, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetchAddProduct } from "../../features/productSlice";
import { Product } from "../../types/common";

const AddProductModal: FC<any> = (props) => {
  const { handleClose } = props;

  const dispatch = useAppDispatch();

  const [previewImg, setPreviewImg] = useState<string>(
    "/assets/images/image_upload.svg"
  );

  const initialValues: Product = {
    name: "",
    description: "",
    image: "",
    price: 0,
    quantity: 0,
    _id: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values: any, { setErrors }) => {
      try {
        const formData = new FormData();
        for (const item in values) {
          if (item === "image") continue;
          formData.append(item, values[item]);
        }
        for (const image in values.image) {
          formData.append("image", values.image[image]);
        }
        await dispatch(fetchAddProduct(formData));
        handleClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="fixed inset-0 h-screen w-full bg-[#00000080] flex justify-center items-center">
      <section className="relative lg:h-[85vh] lg:w-[40vw] m-4 md:m-0 bg-white rounded-3xl py-8">
        <div className="absolute top-4 right-4">
          <button
            onClick={handleClose}
            className="text-xl rounded-full shadow flex justify-center items-center h-8 w-8
          bg-[#fdc88699]"
          >
            &#x2715;
          </button>
        </div>
        <header className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold">Add New Product</h1>
        </header>
        <section className="flex flex-col items-center mt-4 justify-between">
          <form onSubmit={formik.handleSubmit} className="w-3/4">
            <div className="mb-3 h-max flex justify-center">
              <label htmlFor="imageUpload" className="cursor-pointer">
                <div className="h-[25vh] w-[14vw] rounded-xl overflow-hidden">
                  <img
                    src={previewImg}
                    alt=""
                    className="h-full w-full object-center object-contain"
                  />
                </div>
                <p className="text-xs text-center mt-2 opacity-70">
                  Choose images to upload
                </p>
              </label>
              <input
                type="file"
                name="image"
                id="imageUpload"
                className="hidden"
                multiple
                onChange={(e) => {
                  if (
                    e.currentTarget.files &&
                    e.currentTarget.files?.length > 0
                  ) {
                    formik.setFieldValue("image", e.currentTarget.files);
                    setPreviewImg(
                      URL.createObjectURL(e.currentTarget.files[0])
                    );
                  }
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Product name"
                className="w-full border border-2 rounded-md p-2 px-4 text-sm outline-none"
              />
            </div>
            <div className="flex gap-4 mb-3">
              <input
                type="number"
                name="price"
                value={formik.values.price === 0 ? "" : formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Price"
                className="w-full border border-2 rounded-md p-2 px-4 text-sm outline-none"
              />
              <input
                type="number"
                name="quantity"
                value={
                  formik.values.quantity === 0 ? "" : formik.values.quantity
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Quantity"
                className="w-full border border-2 rounded-md p-2 px-4 text-sm outline-none"
              />
            </div>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Product Description"
              className="w-full border border-2 rounded-md p-2 px-4 text-sm outline-none"
            ></textarea>
            <div className="mt-4">
              <input
                type="submit"
                value="Add Product"
                className="hover:bg-[#ffbc69] mt-3 font-semibold w-full p-2.5 text-sm text-[#47301a] text-center bg-[#fdc886] rounded-lg"
              />
            </div>
          </form>
        </section>
      </section>
    </div>
  );
};

export default AddProductModal;
