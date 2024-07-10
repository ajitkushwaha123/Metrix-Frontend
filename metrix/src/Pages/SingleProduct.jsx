import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductContext } from '../context/productContext';

const API = "https://dummyjson.com/products";

const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } = useProductContext();
  const { id } = useParams();

  useEffect(() => {
    getSingleProduct(`${API}/${id}`)
  }, []);

  // Render the product details
  return (
    <div>
      {isSingleLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>{singleProduct.title}</h2>
          <p>Category: {singleProduct.category}</p>
          <p>Price: ${singleProduct.price}</p>
          {/* Add other relevant details */}
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
