import React, { useState } from "react";
import { toast } from "react-hot-toast";  
import axios from "axios";
import {loader, metrix} from "../assets/index"
import { useNavigate } from "react-router-dom";

const AddCategory = ({ onSubmit }) => {
  const [name , setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl , setImageUrl] = useState(metrix);
  const [isLoading , setIsLoading] = useState(false);
  const [hasError , setHasError] = useState(false);
  const [errorMessage , setErrorMessage] = useState('');

  const fileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  }

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("photo", selectedFile);

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Required for FormData
      },
    };

    console.log("Form Data:", formData);
    axios.post("http://localhost:8000/api/category", formData , config)
    .then(res=>{
      console.log(res);
      setIsLoading(false);
      toast.success("Category Added Successfully"); 

      // navigate('/category');
    })
    .catch(err=>{
      setHasError(true);
      setErrorMessage(err.message);
      console.log(err);
      setIsLoading(false);
      toast.error("Failed to add Category");
    });
  }
  
  return (
    <>
    {isLoading && <div>
      <img src={loader} />
    </div>}
    {!isLoading && <form onSubmit={submitHandler}>
      <label htmlFor="name">Category Name:</label>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        id="name"
        name="name"
        // value={name}
        required
      />
      {/* <label htmlFor="photo">Category Image (Optional):</label> */}
      <input
        onChange={(e) => {fileHandler(e)}}
        type="file"
        id="photo"
        name="photo"
      />
      <button type="submit">Create Category</button>
      <img src={imageUrl} />
    </form>}
    {errorMessage && <div>{errorMessage}</div>}
    </>
  );
};

export default AddCategory;
