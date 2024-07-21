import React, { useEffect, useState } from "react";
import { LuShirt } from "react-icons/lu";
import { upload, upload2, upload3, upload4 } from "../assets";
import { useFormik } from "formik";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { addProduct } from "../helper/helper";
// import { image } from "@nextui-org/react";
import { Textarea, Input } from "@nextui-org/react";
import { loader } from "../assets";
import { useNavigate } from "react-router-dom";
import toast , { Toaster } from 'react-hot-toast';


const AddProduct = () => {
  const [photos, setPhotos] = useState([]);
  const [imageUrl, setImageUrl] = useState(upload); 
  const [loading ,setLoader] = useState(false);

  const navigate = useNavigate();

  const fileHandler = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prevPhotos) => {
      const updatedPhotos = [...prevPhotos, ...files];
      console.log("photos", updatedPhotos); 
      formik.setFieldValue("photos", updatedPhotos); // Set the updated photos array
      return updatedPhotos;
    });

    if (files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        setImageUrl(event.target.result);
      };
      fileReader.readAsDataURL(files[0]); // Read the first file to set the image URL
    }
  };

  const deletePhoto = (index) => {
    setPhotos((prevPhotos) => {
      const updatedPhotos = prevPhotos.filter((_, i) => i !== index);
      formik.setFieldValue("photos", updatedPhotos);
      return updatedPhotos;
    });
  };

  const formik = useFormik({
    initialValues: {
      productName: "",
      category: "",
      price: "",
      discountPrice: "",
      stock: "",
      orderType: "",
      shortDescription: "",
      longDescription: "",
      variant: "",
      photos: [],
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // console.log("values", values.photos);
      // console.log("photos", photos);
      // setLoader(true);
      // const { product } = await addProduct(values);
      // setLoader(false);
      // // navigate("/inventory");
      // toast.success('Product added successfully');
      // console.log(product);

      let addProductPromise = addProduct(values);
      toast.promise(addProductPromise, {
        loading: "Creating...",
        success: <b>Product Added Successfully... !</b>,
        error: <b>Error Creating Product... !</b>,
      });

      addProductPromise.then(function () {
        navigate("/inventory");
      });
    },
  });
  return (
    <>
    <div>
      <Toaster position="top-center" reverseOrder="false"></Toaster>
      {loading && <div><img src={loader}/> </div>}
      {!loading && <div className="w-[100%]">
        <div className="flex px-[40px] py-[20px] bg-white justify-between items-center">
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
          <div className="px-[40px] w-full flex bg-white">
            <div className="w-[35%] font-poppins">
              <div className="w-[370px] mb-[20px]">
                <Input
                  {...formik.getFieldProps("productName")}
                  type="text"
                  placeholder="Product Name"
                  labelPlacement="outside"
                  radius="sm"
                  size="lg"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 w-[full] text-medium">
                        <LuShirt />
                      </span>
                    </div>
                  }
                />
              </div>

              <div className="w-[370px] mb-[20px]">
                <Input
                  {...formik.getFieldProps("category")}
                  type="text"
                  placeholder="Category"
                  labelPlacement="outside"
                  radius="sm"
                  size="lg"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 w-[full] text-medium">
                        <LuShirt />
                      </span>
                    </div>
                  }
                />
              </div>

              <div className="mb-[20px] w-[370px]">
                <Input
                  {...formik.getFieldProps("price")}
                  type="number"
                  placeholder="Price"
                  labelPlacement="outside"
                  radius="sm"
                  size="lg"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 w-[full] text-medium">
                        $
                      </span>
                    </div>
                  }
                />
              </div>

              <div className="mb-[20px] w-[370px]">
                <Input
                  {...formik.getFieldProps("discountPrice")}
                  type="number"
                  placeholder="Discount Price"
                  labelPlacement="outside"
                  radius="sm"
                  size="lg"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 w-[full] text-medium">
                        $
                      </span>
                    </div>
                  }
                />
              </div>

              <div className="w-[370px] mb-[20px]">
                <Input
                  {...formik.getFieldProps("stock")}
                  type="number"
                  placeholder="Stock"
                  labelPlacement="outside"
                  radius="sm"
                  size="lg"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 w-[full] text-medium">
                        <LuShirt />
                      </span>
                    </div>
                  }
                />
              </div>

              <div className="w-[370px] mb-[20px]">
                <Input
                  {...formik.getFieldProps("orderType")}
                  type="text"
                  placeholder="Order Type"
                  labelPlacement="outside"
                  radius="sm"
                  size="lg"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 w-[full] text-medium">
                        <LuShirt />
                      </span>
                    </div>
                  }
                />
              </div>
            </div>
            <div className="w-[35%] mx-[30px]">
              <div className="mb-[20px]">
                <Textarea
                  variant="faded"
                  label="Short Description"
                  placeholder="Enter a Short description ..."
                  className="bg-txtArea bg-[#EFF1F9] outline-none"
                  {...formik.getFieldProps("shortDescription")}
                />
              </div>

              <div className="mb-[20px]">
                <Textarea
                  variant="faded"
                  label="Description"
                  placeholder="Enter a description ..."
                  // className="bg-txtArea bg-[#EFF1F9] outline-none".
                  className="bg-txtArea"
                  {...formik.getFieldProps("longDescription")}
                />
              </div>

              <div className="mb-[20px]">
                <Textarea
                  variant="faded"
                  label="Description"
                  placeholder="Enter a description ..."
                  className="bg-txtArea bg-[#EFF1F9] outline-none"
                  {...formik.getFieldProps("longDescription")}
                />
              </div>

              <div className="mb-[20px]">
                <Input
                  {...formik.getFieldProps("variant")}
                  type="text"
                  placeholder="Variant"
                  labelPlacement="outside"
                  radius="sm"
                  size="lg"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 w-[full] text-medium">
                        <LuShirt />
                      </span>
                    </div>
                  }
                />
              </div>
            </div>

            <div className="w-[33%] flex justify-center items-center flex-col bg-[white]">
              <div>
                <div>
                  <img
                    className="rounded-xl p-2 w-[300px] h-[300px] cursor-pointer"
                    src={imageUrl}
                    onClick={() => document.getElementById("photos").click()}
                  />
                  <input
                    onChange={fileHandler}
                    type="file"
                    id="photos"
                    name="photos"
                    multiple
                    className="hidden"
                  />
                </div>
                <h3 className="font-medium text-[20px] mt-4">
                  Additional Images
                </h3>
                <div className="grid grid-cols-3 relative pb-[40px] gap-4 mt-2">
                  {photos.map((photo, index) => (
                    <div className="relative" key={index}>
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Photo ${index}`}
                        className="rounded-lg relative w-[100px] h-[100px]"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => deletePhoto(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>}
    </div>
    </>
  );
};

export default AddProduct;
