import React, { useEffect } from "react";
import { LuShirt } from "react-icons/lu";
import { upload, upload2 } from "../assets";
import { useFormik } from "formik";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { addProduct } from "../helper/helper";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/productContext";
import { updateProduct } from "../helper/helper";
 
const API = "http://localhost:8000/api/products";
 
const UpdateComponent = () => {
    const navigate = useNavigate();
    const { getSingleProduct, isSingleLoading, singleProduct } = useProductContext();
    const { id } = useParams();

    console.log("id", id);

    useEffect(() => {
      console.log("id", id);
      getSingleProduct(`${API}/${id}`);
    }, []);

    console.log("sun" , singleProduct.category);

  const fileHandler = (e) => {
    formik.setFieldValue("photos", singleProduct.photos | e.target.files);
  };
  const formik = useFormik({
    initialValues: {
      _id: singleProduct._id,
      productName: singleProduct.productName,
      category: singleProduct.category ,
      price: singleProduct.price ,
      discountPrice: singleProduct.discountPrice ,
      stock: singleProduct.stock,
      orderType: singleProduct.orderType,
      shortDescription: singleProduct.shortDescription,
      longDescription: singleProduct.longDescription,
      variant: singleProduct.variant,
      photos: [singleProduct.photos],
    },
    // validate : registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log("valu", values);

      console.log("val", values._id);
      const { product } = await updateProduct(values);
      navigate('/inventory');
    //   console.log(product);
    },
  });

  return (
    <div className="w-full">
      <div className="flex px-[40px] py-[20px] bg-white justify-between w-full items-center">
        <p className="text-[22px] font-medium">Add New Product</p>

        <div className="flex justify-center items-center">
          <button className="bg-black mx-[15px] rounded-lg flex justify-center items-center text-white px-6 text-[18px] py-2">
            <MdOutlineArrowDropDown className="mr-[15px]" />
            Save as Draft
          </button>
          <button
            onClick={formik.handleSubmit}
            className="bg-primary rounded-lg flex justify-center items-center text-white px-6 text-[18px] py-2"
          >
            Save & Publish
          </button>
        </div>
      </div>
      <form>
        <div className="px-[40px] flex bg-white">
          <div className="flex flex-col font-poppins bg-white items-center">
            <div className="flex rounded-lg px-[20px] text-[18px] mb-[20px] justify-center items-center bg-[#EFF1F9] mx-w-[375px] h-[52px]">
              <LuShirt />
              <input
                {...formik.getFieldProps("productName")}
                className="max-w-[303px] ml-[10px] h-[36px] outline-none bg-[#EFF1F9]"
                placeholder="Product Name"
                type="text"
              />
            </div>

            <div className="flex rounded-lg px-[20px] text-[18px] mb-[20px] justify-center items-center bg-[#EFF1F9] mx-w-[375px] h-[52px]">
              <LuShirt />
              <input
                {...formik.getFieldProps("category")}
                className="max-w-[303px]  ml-[10px] h-[36px] outline-none bg-[#EFF1F9]"
                placeholder="Product Category"
                type="text"
              />
            </div>

            <div className="flex rounded-lg px-[20px] text-[18px] mb-[20px] justify-center items-center bg-[#EFF1F9] mx-w-[375px] h-[52px]">
              <LuShirt />
              <input
                {...formik.getFieldProps("price")}
                className="max-w-[303px] ml-[10px] h-[36px] outline-none bg-[#EFF1F9]"
                placeholder="Price"
                type="text"
              />
            </div>

            <div className="flex rounded-lg px-[20px] text-[18px] mb-[20px] justify-center items-center bg-[#EFF1F9] mx-w-[375px] h-[52px]">
              <LuShirt />
              <input
                {...formik.getFieldProps("discountPrice")}
                className="max-w-[303px] ml-[10px] h-[36px] outline-none bg-[#EFF1F9]"
                placeholder="Discount Price"
                type="text"
              />
            </div>

            <div className="flex rounded-lg px-[20px] text-[18px] mb-[20px] justify-center items-center bg-[#EFF1F9] mx-w-[375px] h-[52px]">
              <LuShirt />
              <input
                {...formik.getFieldProps("stock")}
                className="max-w-[303px] ml-[10px] h-[36px] outline-none bg-[#EFF1F9]"
                placeholder="Stock"
                type="text"
              />
            </div>

            <div className="flex rounded-lg px-[20px] text-[18px] mb-[20px] justify-center items-center bg-[#EFF1F9] mx-w-[375px] h-[52px]">
              <LuShirt />
              <input
                {...formik.getFieldProps("orderType")}
                className="max-w-[303px] ml-[10px] h-[36px] outline-none bg-[#EFF1F9]"
                placeholder="Order type"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col mx-[30px]">
            <div className="flex rounded-lg px-[20px] text-[18px] mb-[20px] justify-center items-center bg-[#EFF1F9] mx-w-[375px] h-[110px]">
              <textarea
                {...formik.getFieldProps("shortDescription")}
                className="w-[340px] ml-[4px] h-[100px] outline-none bg-[#EFF1F9]"
                placeholder="Short Discription"
                type="textarea"
              />
            </div>

            <div className="flex rounded-lg px-[20px] text-[18px] mb-[20px] justify-center items-center bg-[#EFF1F9] mx-w-[375px] h-[110px]">
              <textarea
                {...formik.getFieldProps("longDescription")}
                className="w-[340px] ml-[4px] h-[100px] outline-none bg-[#EFF1F9]"
                placeholder="Long Discription"
                type="textarea"
              />
            </div>

            <div className="flex rounded-lg px-[20px] text-[18px] mb-[20px] justify-center items-center bg-[#EFF1F9] mx-w-[375px] h-[110px]">
              <textarea
                className="w-[340px] ml-[4px] h-[100px] outline-none bg-[#EFF1F9]"
                placeholder="Long Discription"
                type="textarea"
              />
            </div>

            <div className="flex rounded-lg px-[20px] text-[18px] mb-[20px] justify-center items-center bg-[#EFF1F9] mx-w-[375px] h-[52px]">
              <LuShirt />
              <input
                {...formik.getFieldProps("variant")}
                className="w-[340px] ml-[10px] h-[36px] outline-none bg-[#EFF1F9]"
                placeholder="Variant"
                type="text"
              />
            </div>
          </div>

          <div className="">
            <div className="min-w-[300px]">
              <input
                onChange={(e) => {
                  fileHandler(e);
                }}
                type="file"
                id="photos"
                name="photos"
                multiple
                // {...formik.getFieldProps("photos")}
              />
              <img src={upload} />
            </div>
            <div className="py-[30px]">
              {/* <input
                type="file"
                multiple
                onChange={(e) => {
                  formik.setFieldValue("photos", e.target.files[1]);
                }}
              />
              <img src={upload2} /> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateComponent;
