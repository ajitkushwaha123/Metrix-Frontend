import React, { useEffect , useState } from "react";
import { LuShirt } from "react-icons/lu";
import { upload, upload2 } from "../assets";
import { useFormik } from "formik";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/productContext";
import { updateProduct } from "../helper/helper";
import { Textarea, Input } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
 
const API = "http://localhost:8000/api/products";

const UpdateComponent = () => {
  const navigate = useNavigate();
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();
  const { id } = useParams();

  const [cloudinaryPhotos, setCloudinaryPhotos] = useState([]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [imageUrl, setImageUrl] = useState(); // Replace with your initial image URL
  const [draft, setDraft] = useState(false);


  useEffect(() => {
    getSingleProduct(`${API}/${id}`);
  }, [id]);

  useEffect(() => {
    if (singleProduct.photos) {
      setCloudinaryPhotos(singleProduct.photos);
      setImageUrl(singleProduct.photos[0]);
      formik.setFieldValue("productName", singleProduct.productName);
      formik.setFieldValue("category", singleProduct.category);
      formik.setFieldValue("price", singleProduct.price);
      formik.setFieldValue("discountPrice", singleProduct.discountPrice);
      formik.setFieldValue("stock", singleProduct.stock);
    }
  }, [singleProduct]);

  const fileHandler = (e) => {
    const files = Array.from(e.target.files);
    setUploadedPhotos((prevPhotos) => {
      const updatedPhotos = [...prevPhotos, ...files];
      formik.setFieldValue("photos", [...cloudinaryPhotos, ...updatedPhotos]);
      return updatedPhotos;
    });

    if (files.length > 0) {
      const file = files[0];
      if (file instanceof Blob) {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          setImageUrl(event.target.result);
        };
        fileReader.readAsDataURL(file);
      } else {
        console.error("The selected file is not a valid Blob or File object.");
      }
    }
  };

  const deletePhoto = (index, type) => {
    if (type === "cloudinary") {
      setCloudinaryPhotos((prevPhotos) =>
        prevPhotos.filter((_, i) => i !== index)
      );
    } else {
      setUploadedPhotos((prevPhotos) =>
        prevPhotos.filter((_, i) => i !== index)
      );
    }
    formik.setFieldValue("photos", [...cloudinaryPhotos, ...uploadedPhotos]);
  };

  const formik = useFormik({
    initialValues: {
      _id: singleProduct._id,
      productName: singleProduct.productName,
      category: singleProduct.category,
      price: singleProduct.price,
      discountPrice: singleProduct.discountPrice,
      stock: singleProduct.stock,
      photos: [...cloudinaryPhotos, ...uploadedPhotos],
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // console.log("valu", values.photos);

      // console.log("val", values._id);
      // const { product } = await updateProduct(values);
      let updateProductPromise = updateProduct(values);
      toast.promise(updateProductPromise, {
        loading: "Creating...",
        success: <b>Product Updated Successfully... !</b>,
        error: <b>Error Updating Product... !</b>,
      });

      updateProductPromise.then(function () {
        navigate("/inventory");
      });
    },
  });

  
  const handleDraft = () => {
    setDraft(true);
    formik.handleSubmit();
  };

  const handlePublished = () => {
    setDraft(false);
    formik.handleSubmit();
  };
  

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex px-[40px] py-[20px] items-center">
        <p className="text-[22px] font-medium">Update New Product</p>
      </div>
      <form className="flex justify-center rounded-xl w-[full] items-center">
        <div className="px-[40px] mb-[30px] bg-white py-[20px] justify-center items-center flex ">
          <div className="font-poppins bg-white">
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
                    <span className="text-default-400 text-medium">
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
                    <span className="text-default-400 text-medium">
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
                    <span className="text-default-400 text-medium">$</span>
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
                    <span className="text-default-400 text-medium">$</span>
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
                    <span className="text-default-400 text-medium">
                      <LuShirt />
                    </span>
                  </div>
                }
              />
            </div>

            <div className="flex justify-center items-center">
              <button
                onClick={handleDraft}
                className="bg-black mx-[15px] rounded-lg flex justify-center items-center text-white px-6 text-[18px] py-2"
              >
                <MdOutlineArrowDropDown className="mr-[15px]" />
                Save as Draft
              </button>
              <button
                onClick={handlePublished}
                className="bg-primary rounded-lg flex justify-center items-center text-white px-6 text-[18px] py-2"
              >
                Save & Publish
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center flex-col">
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
              <div className="grid grid-cols-3 pb-[40px] gap-4 mt-2">
                {cloudinaryPhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt={`Cloudinary Photo ${index}`}
                      className="rounded-lg w-[100px] h-[100px]"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => deletePhoto(index, "cloudinary")}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {uploadedPhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Uploaded Photo ${index}`}
                      className="rounded-lg w-[100px] h-[100px]"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => deletePhoto(index, "uploaded")}
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
    </div>
  );
};

export default UpdateComponent;
