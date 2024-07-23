import React, { useState } from 'react';
import CustomerSearch from '../components/CustomerSearch';
import ProductSearch from '../components/ProductSearch';

const NewOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

 const handleCustomer = (e) => {
   setNewCustomer((prevState) => !prevState);
   console.log(!newCustomer);
 };


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
          <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed font-poppins top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden"
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
                <form className="p-4  flex md:p-5">
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
                              htmlFor="price"
                              className="block text-primary text-start mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Customer Name
                            </label>
                            <input
                              type="text"
                              name="Customer Name"
                              id="Customer Name"
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
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="$2999"
                          // required
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
                          id="Payment Type"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option selected>Select Payment Type</option>
                          <option value="CA">Cash</option>
                          <option value="ON">Online</option>
                          <option value="PE">Pending</option>
                        </select>
                      </div>

                      <div className="col-span-1 sm:col-span-1">
                        <label
                          htmlFor="Order Type"
                          className="block mb-2 text-start text-primary text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Order Type
                        </label>
                        <select
                          id="Order Type"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option selected>Select Order Type</option>
                          <option value="PE">Pending</option>
                          <option value="CO">Completed</option>
                          <option value="DR">Draft</option>
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
                          // required
                        />
                      </div>
                    </div>

                    {/* <div className="flex justify-center"> */}
                  </div>

                  {/* Second Half */}

                  <div className='ml-[40px] w-[50%]'>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="Payment Type"
                        className="block mb-2 text-start text-primary text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Payment Type
                      </label>
                      <select
                        id="Payment Type"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option selected>Select Payment Type</option>
                        <option value="CA">Cash</option>
                        <option value="ON">Online</option>
                        <option value="PE">Pending</option>
                      </select>
                    </div>

                    <div> <ProductSearch /> </div>
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
