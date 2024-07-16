import React, { useState, useEffect } from "react";
import axios from "axios";
import { loader } from "../assets";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [categoryList, setCategoryList] = useState([]);

  const navigate = useNavigate();
  const handleView = (id) => {
    // alert(id);
    navigate(`/category/` + id);
  }

  const handleEdit = (id) => {
    // alert(id);
    navigate(`/category/edit/` + id);
  };

  const handleDelete = ({id , imageUrl}) => {
    // alert(id);
    // navigate(`/category/` + id);
    if(window.confirm("Are you sure you want to delete this category?")){
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data", // Required for FormData
            },
        };
        axios.delete(`http://localhost:8000/api/category/?id=${id}&imageUrl=${imageUrl}`, config)
            .then(res => {
                console.log(res);
                setIsLoading(false);
                getData();
                navigate('/category');
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
        setIsLoading(true);
    }
    console.log(id);
  };

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Required for FormData
    },
  };

  const getData = ()  => {
    axios
      .get("http://localhost:8000/api/category", config)
      .then((res) => {
        console.log(res.data.category);
        setCategoryList(res.data.category);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);
  return (
    <>
      {isLoading && (
        <div>
          <img src={loader} />
        </div>
      )}
      {!isLoading && (
        <div>
          <h1>Category</h1>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {categoryList.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    <img src={categoryList[index].photo} alt={category.name} />
                  </td>
                  <button onClick={() => {handleEdit(category._id)}} type="button">Edit</button>
                  <button onClick={() => {handleDelete({"id" : category._id , "imageUrl" : category.photo})}} type="button">Delete</button>
                  <button onClick={() => {handleView(category._id)}} type="button">View</button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Category;
