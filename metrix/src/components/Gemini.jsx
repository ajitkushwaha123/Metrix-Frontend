import React, { useState } from "react"; // Import useState for handling preview images
import { useFormik } from "formik"; // Import useFormik for form handling


const Prod = () => {
  const [previewImages, setPreviewImages] = useState([]); // State for preview images

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
      photos: [], // Array to store selected photos
    },
    validateOnBlur: false, // Prevent unnecessary validation
    validateOnChange: false, // Prevent unnecessary validation
    onSubmit: async (values) => {
      console.log("Selected photos:", values.photos);
      console.log(typeof values.photos);
      const formData = new FormData(); // Create FormData for multipart submission
      values.photos.forEach((photo) => formData.append("photos", photo)); // Append photos

      // Add other form fields to formData if needed
      formData.append("productName", values.productName);
      // ... (add other fields)

      // Send data using your preferred method (e.g., fetch, axios)
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      // Handle response from server
      const data = await response.json();
      console.log("Product added:", data);
    },
  });

  const fileHandler = (event) => {
    const selectedFiles = event.target.files;

    // Handle multiple file selection and preview
    if (selectedFiles.length > 1) {
      console.log(
        "Multiple files selected. Only the first one will be shown in preview."
      );
    }

    const newPhoto = selectedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setPreviewImages([...previewImages, e.target.result]); // Update preview images
      formik.setFieldValue("photos", [...formik.values.photos, newPhoto]); // Update photos array
    };

    reader.readAsDataURL(newPhoto);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Form fields for product details */}
      {/* ... (your form fields) */}

      <input type="file" name="photos" multiple onChange={fileHandler} />
      {previewImages.length > 0 && (
        <div>
          <h2>Preview Images:</h2>
          {previewImages.map((previewImage, index) => (
            <img key={index} src={previewImage} alt={`Preview ${index + 1}`} />
          ))}
        </div>
      )}

      <button type="submit">Add Product</button>
    </form>
  );
};

export default Prod;
