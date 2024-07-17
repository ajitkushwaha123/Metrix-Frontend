import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/category/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/category/edit/${id}`);
  };

  const handleDelete = ({ id, imageUrl }) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .delete(`http://localhost:8000/api/category/?id=<span class="math-inline">\{id\}&imageUrl\=</span>{imageUrl}`, config)
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          getData();
          navigate("/category");
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });

      setIsLoading(true);
    }
  };



  const getData = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Use 'application/json' for typical API requests
      },
    };

    axios
      .get("http://localhost:8000/api/category", config)
      .then((res) => {
        console.log(res);
        setCategoryList(res.data.categories);
        // console.log(categoryList);
  //       setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setIsLoading(false);
      });

      console.log("cat" , categoryList)
  };

  useEffect(() => {
    getData();
  }, []); // Currently runs only on mount, adjust for dynamic updates

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
                  <button
                    onClick={() => {
                      handleEdit(category._id);
                    }}
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete({ id: category._id, imageUrl: category.photo });
                    }}
                    type="button"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      handleView(category._id);
                    }}
                    type="button"
                  >
                    View
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Category
