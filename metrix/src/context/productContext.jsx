import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from 'axios';
const AppContext = createContext();
import reducer from '../reducer/productReducer'

const API = "http://localhost:8000/api/products";

const initialState = {
  isLoading: false,
  isError: false, // Fix the property name here
  products: [],
  isSingleLoading : false,
  singleProduct : {},
  // featureProducts: [],
};

const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Use 'application/json' for typical API requests
      },
    };

    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url , config);
      console.log(res);
      const products = await res.data;
      console.log("product : " , products);
      dispatch({ type: "MY_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" })
    }
    //console.log(products);
  }

  const getSingleProduct = async (url) => {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Use 'application/json' for typical API requests
          },
        };

    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(url, config);
      console.log("res", res);
      const singleProduct = await res.data;
      console.log("singleproduct : ", singleProduct);
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  }

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state , getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

//hook
const useProductContext = () => {
  return useContext(AppContext);
}

export { AppProvider, useProductContext, AppContext };
