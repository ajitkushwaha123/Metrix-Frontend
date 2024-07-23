import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const res = axios
      .get("http://localhost:8000/api/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      });
  }, []);

  const searchProducts = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log(query);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/products?search=${query}`
      );
      console.log(response.data);
      setProducts(response.data);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Product Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
      />
      <button onClick={searchProducts}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id}>
              <p>Name: {product.productName}</p>
              <p>Price: {product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
