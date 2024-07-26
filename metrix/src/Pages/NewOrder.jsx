import React, { useState, useEffect } from "react";
import CustomerSearch from "../components/CustomerSearch";
import axios from "axios";
import { useFormik } from "formik";
import { CiSearch } from "react-icons/ci";
import toast , {Toaster} from 'react-hot-toast';
import { createOrderValidate } from "../helper/validate";
import { addCustomers } from "../helper/helper";

const NewOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState(false);
  const [cartProduct, setCartProduct] = useState([]);
  const [cart , setCart] = useState(false);
  
  const AddedProduct = [];
  console.log(AddedProduct);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  
  const [quantities, setQuantities] = useState({});
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addItem = (event, productId) => {
    event.preventDefault();
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  const deleteItem = (event, productId) => {
    event.preventDefault();
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (newQuantities[productId] > 0) {
        newQuantities[productId] -= 1;
      }
      return newQuantities;
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((err) => {
        setError("Error fetching data");
      });
  }, []);

  const searchProducts = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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

  const handleCustomer = () => {
    setNewCustomer((prevState) => !prevState);
    console.log(!newCustomer);
  };

 const handleOrder = async (values) => {
   console.log("Order Added", values.products);

   const token = localStorage.getItem("token");
   console.log(token);

   const config = {
     headers: {
       Authorization: `Bearer ${token}`,
       "Content-Type": "application/json",
     },
   };

   try {
     const { data } = await axios.post(
       "http://localhost:8000/api/orders",
       values,
       config
     );

     console.log("Order Added", data);
     return Promise.resolve({ order: data });
   } catch (err) {
     console.error("Error adding order:", err.message);
     return Promise.reject({ err: err.message });
   }
 };


  const viewCart = (e) => {
    e.preventDefault();
    setCart(!cart);
    console.log("View Cart");
    setCartProduct(AddedProduct);
    console.log("Cart Product", AddedProduct);
    console.log("Cart Product00000", cartProduct.product);
  };

const formik = useFormik({
  initialValues: {
    customerName: "",
    phone: "8178739633",
    price: 2999,
    paymentType: "Cash",
    orderStatus: "pending",
    orderNote: "",
    products: [{ product: "product", quantities: "quantities" }],
    quantity: 0,
    customerImage: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
    imageColor: "tertiary",
  },
  validate: createOrderValidate,
  validateOnBlur: false,
  validateOnChange: false,
  onSubmit: async (values) => {
    values.products = AddedProduct;

    console.log("Form Values", values);

    try {
      if (AddedProduct.length === 0) {
        toast.error("Add Products to Cart... !");
      } else {
        let orderPromise = handleOrder(values);
        toast.promise(orderPromise, {
          loading: "Creating...",
          success: <b>Order Created Successfully... !</b>,
          error: <b>Couldn't Create Order... !</b>,
        });

        // values.orders = values;

        console.log("Added Proddfgldkjuct", values);
        let customerPromise = addCustomers(values);
        toast.promise(customerPromise, {
          loading: "Creating...",
          success: <b>Customer Added Successfully... !</b>,
          error: <b>Couldn't Add Customer... !</b>,
        });

        formik.resetForm();
        AddedProduct.map((product) => {
          setQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities };
            newQuantities[product.product._id] = 0;
            return newQuantities;
          });
        });
        setCartProduct([]);
        setCart(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  },
});


 const updateTotalCartValue = () => {
   let totalQuantity = 0;
   const total = products
     .reduce((total, product) => {
       const quantity = quantities[product._id] || 0;
       totalQuantity += quantity;
       return total + product.price * quantity;
     }, 0)
     .toFixed(2);
    formik.setFieldValue("price", total);
   formik.setFieldValue("quantity", totalQuantity);
 };

  useEffect(() => {
    updateTotalCartValue();
  }, [quantities]);


  return (
    <>
      {/* Modal toggle */}
      <button
        onClick={toggleModal}
        className="block font-poppins text-white bg-primary font-medium rounded-lg text-sm px-5 py-1.5 text-center "
        type="button"
        size="sm"
      >
        Create Order
      </button>

      {/* Main modal */}
      {isOpen && (
        <div className="flex">
          <Toaster position="top-center" reverseOrder={false} />
          <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed shadow-lg shadow-indigo-500/40 backdrop-blur-sm bg-indigo-500/10 font-poppins top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden"
          >
            <div className="relative p-4 max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Create New Order
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={toggleModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <form
                  onSubmit={formik.handleSubmit}
                  className="p-4  flex md:p-5"
                >
                  <div className="flex w-[50%] justify-center item-center flex-col">
                    <div className="flex justify-between items-center">
                      <h2>Order Details</h2>
                      <h2
                        onChange={(e) => handleCustomer(e)}
                        className="flex justify-center items-center"
                      >
                        Existing Customer
                        <input
                          className="ml-[10px] px-[10px]"
                          type="checkbox"
                          checked={newCustomer}
                          onChange={(e) => handleCustomer}
                        />
                      </h2>
                    </div>
                    <div className="grid gap-4 my-[10px] mb-4 grid-cols-2">
                      {newCustomer && (
                        <div className="col-span-2">
                          <CustomerSearch />
                        </div>
                      )}
                      {!newCustomer && (
                        <div className="col-span-2">
                          <div className="col-span-2 sm:col-span-1">
                            <label
                              htmlFor="customerName"
                              className="block text-primary text-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Customer Name
                            </label>
                            <input
                              type="text"
                              {...formik.getFieldProps("customerName")}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Customer Name"
                              // required
                            />
                          </div>

                          <div className="col-span-2 my-[10px] sm:col-span-1">
                            <label
                              htmlFor="phone"
                              className="block text-start text-primary mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Phone
                            </label>
                            <input
                              {...formik.getFieldProps("phone")}
                              type="number"
                              name="phone"
                              id="phone"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="+91-"
                              // required
                            />
                          </div>
                        </div>
                      )}

                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="price"
                          className="block text-start text-primary mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          {...formik.getFieldProps("price")}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="$0"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="Payment Type"
                          className="block mb-2 text-start text-primary text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Payment Type
                        </label>
                        <select
                          {...formik.getFieldProps("paymentType")}
                          id="Payment Type"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option selected>Select Payment Type</option>
                          <option value="Cash">Cash</option>
                          <option value="Online">Online</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>

                      <div className="col-span-1 sm:col-span-1">
                        <label
                          htmlFor="Order Status"
                          className="block mb-2 text-start text-primary text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Order Status
                        </label>
                        <select
                          {...formik.getFieldProps("orderStatus")}
                          id="Order Status"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option selected>Select Order Status</option>
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="progress">In-Progress</option>
                        </select>
                      </div>

                      <div className="col-span-2 sm:col-span-2">
                        <label
                          htmlFor="orderNote"
                          className="block text-primary text-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Order Note
                        </label>
                        <input
                          type="text"
                          name="Add a Note"
                          id="Add a Note"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Add a Note"
                          {...formik.getFieldProps("orderNote")}
                          // required
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={toggleModal}
                        className="bg-white border-2 border-primary px-[10px] py-[5px] font-medium rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        // onClick={(e) => {
                        //   handleOrder(e);
                        // }}
                        className="bg-primary px-[10px] py-[5px] text-white rounded-md"
                      >
                        Add Order
                      </button>
                    </div>
                  </div>

                  {/* Second Half */}

                  <div className="ml-[40px] w-[50%]">
                    <div>
                      <div className="overflow-y-scroll max-h-[500px]">
                        <h1 className="text-primary text-start">
                          Product Search
                        </h1>
                        <div className="bg-white w-[50%] h-[60px] right-0 absolute bottom-0 fixed">
                          <div className="bg-primary absolute fixed bottom-3 left-4 text-white rounded-md py-[3px] text-[18px] px-[15px]">
                            Total : $
                            {products
                              .reduce((total, product) => {
                                const quantity = quantities[product._id] || 0;
                                return total + product.price * quantity;
                              }, 0)
                              .toFixed(2)}
                          </div>
                        </div>

                        <button
                          onClick={(e) => viewCart(e)}
                          className="bg-primary absolute fixed bottom-3 right-4 text-white rounded-md py-[3px] text-[18px] px-[15px]"
                        >
                          {cart == true && "View Products"}
                          {cart == false && "View Cart"}
                        </button>

                        <div className="flex bg-gray-50 pr-[20px] border outline-none text-sm rounded-lg dark:border-gray-500 dark:placeholder-gray-400 dark:text-white justify-center items-center">
                          <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for products..."
                            className="p-2.5 outline-none w-full"
                          />
                          <CiSearch
                            onClick={searchProducts}
                            className="text-[24px]"
                          />
                        </div>
                        {loading && <p>Loading...</p>}
                        {error && <p>{error}</p>}
                        <div>
                          {products.length > 0 &&
                            products.map((product) => {
                              if (quantities[product._id] > 0) {
                                AddedProduct.push({ product, quantities });
                                console.log("Product", AddedProduct);
                                return (
                                  <div key={product._id}>
                                    {/* {product.productName} :
                                    {quantities[product._id]} */}
                                  </div>
                                );
                              }
                              return null;
                            })}
                        </div>

                        {cart === false && (
                          <div>
                            {products.length > 0 ? (
                              products.map((product) => (
                                <div key={product._id}>
                                  <div className="flex border-2 justify-between rounded-xl items-center py-[10px] px-[10px] my-[12px]">
                                    <div className="flex justify-between">
                                      <img
                                        className="w-[70px] h-[70px] rounded-md"
                                        src={product.photos[0]}
                                        alt={product.productName}
                                      />
                                      <div className="flex text-start mx-[14px] flex-col">
                                        <h2 className="font-poppins font-medium">
                                          {product.productName}
                                        </h2>
                                        <p>$ {product.price}</p>
                                      </div>
                                    </div>

                                    {quantities[product._id] > 0 ? (
                                      <div className="flex">
                                        <button
                                          onClick={(event) =>
                                            addItem(event, product._id)
                                          }
                                          className="border-2 bg-slate-200 px-[8px] border-indigo-500/40 text-[17px] font-medium rounded-md"
                                        >
                                          +
                                        </button>
                                        <div className="mx-[8px]">
                                          {quantities[product._id]}
                                        </div>
                                        <button
                                          onClick={(event) =>
                                            deleteItem(event, product._id)
                                          }
                                          className="border-2 bg-slate-200 px-[7px] border-indigo-500/40 text-[17px] font-medium rounded-md"
                                        >
                                          -
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={(event) =>
                                          addItem(event, product._id)
                                        }
                                        className="text-primary cursor-pointer justify-center items-center"
                                      >
                                        <div>Add Item</div>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p>No products found.</p>
                            )}
                          </div>
                        )}
                        {cart === true && (
                          <div>
                            {cartProduct.length > 0 ? (
                              cartProduct.map((item) => (
                                <div key={item.product._id}>
                                  <div className="flex border-2 justify-between rounded-xl items-center py-[10px] px-[10px] my-[12px]">
                                    <div className="flex justify-between">
                                      <img
                                        className="w-[70px] h-[70px] rounded-md"
                                        src={item.product.photos[0]}
                                        alt={item.product.productName}
                                      />
                                      <div className="flex text-start mx-[14px] flex-col">
                                        <h2 className="font-poppins font-medium">
                                          {item.product.productName}
                                        </h2>
                                        <p>$ {item.product.price}</p>
                                      </div>
                                    </div>

                                    {quantities[item.product._id] > 0 ? (
                                      <div className="flex">
                                        <button
                                          onClick={(event) =>
                                            addItem(event, item.product._id)
                                          }
                                          className="border-2 bg-slate-200 px-[8px] border-indigo-500/40 text-[17px] font-medium rounded-md"
                                        >
                                          +
                                        </button>
                                        <div className="mx-[8px]">
                                          {quantities[item.product._id]}
                                        </div>
                                        <button
                                          onClick={(event) =>
                                            deleteItem(event, item.product._id)
                                          }
                                          className="border-2 bg-slate-200 px-[7px] border-indigo-500/40 text-[17px] font-medium rounded-md"
                                        >
                                          -
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={(event) =>
                                          addItem(event, item.product._id)
                                        }
                                        className="text-primary cursor-pointer justify-center items-center"
                                      >
                                        <div>Add Item</div>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p>No products found.</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewOrder;
