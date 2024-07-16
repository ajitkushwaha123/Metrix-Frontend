import React, { useState , useEffect } from 'react'
import axios from 'axios';
import { loader } from '../assets';

const Category = () => {
    const [isLoading , setIsLoading] = useState(false);

    const [categoryList , setCategoryList] = useState([]);

    const token = localStorage.getItem("token");
    const config = {
       headers: {
         Authorization: `Bearer ${token}`,
         "Content-Type": "multipart/form-data", // Required for FormData
       },
     };

    useEffect(() => {
        setIsLoading(true);
        axios.get('http://localhost:8000/api/category' , config)
        .then(res=>{
            console.log(res.data.category);
            setCategoryList(res.data.category);
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err);
            setIsLoading(false);
        })
    } , []);
  return (
    <>{isLoading && <div><img src={loader}/></div>}
    {!isLoading && <div>
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
            {categoryList.map((category , index) => (
                <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td><img src={categoryList[index].photo} alt={category.name} /></td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>}
    </>
  )
}

export default Category
