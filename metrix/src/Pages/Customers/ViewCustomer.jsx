import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleCustomer, getSingleOrders } from "../../helper/helper";
import Navbar from "../../components/Navbar";
import BreadCrum from "../../components/BreadCrum";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { BsFolder2Open, BsHandbag } from "react-icons/bs";
import ViewProductTable from "../../DataTable/ViewProductTable";
import { CiUser } from "react-icons/ci";
import { MdOutlinePayment } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { capitalize } from "../../DataTable/utils";
import SingleOrderTable from "../../DataTable/SingleOrderTable";
import ViewCustomerTable from "../../DataTable/ViewCustomerTable";

const API = "http://localhost:8000/api/orders/find";
const ViewCustomer = () => {
  const { id } = useParams();
  console.log("id", id);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
   
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("id", id);
        const { data } = await getSingleCustomer(id);
        console.log("data", data);
        setCustomerName(data.customerName);
        setPhone(data.phone);
        setStatus(data.status);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      <Navbar title={"Inventory"} />
      <BreadCrum title={"Inventory"} back={"/"} />

      <h1>{customerName}</h1>

      <div className="px-[40px]">
        <div className="flex justify-between items-center">
          <div className="flex">
            <p className="mr-[30px] font-medium">
              Order Number :
              <span className="text-slate-500 ml-[10px]">#2806</span>
            </p>
            <p className="mr-[30px] text-[18px] text-slate-500">
              <span className="font-medium text-black text-[18px]">
                Dated :
              </span>
              12/07/23
            </p>
          </div>

          <div className="flex justify-center items-center">
            <button className="bg-black mx-[15px] rounded-lg flex justify-center items-center text-white px-6 text-[18px] py-2">
              <MdOutlineArrowDropDown className="mr-[15px]" />
              Cancel Order
            </button>
            <button
              //   onClick={formik.handleSubmit}
              className="bg-primary rounded-lg flex justify-center items-center text-white px-6 text-[18px] py-2"
            >
              Mark as Complete
            </button>
          </div>
        </div>

        <div className="py-[30px]">
          <div className="flex">
            <div className="mx-[10px] bg-[white] pb-[15px] rounded-xl w-[33%]">
              <div className="flex justify-between p-5">
                <div className="flex justify-center items-center">
                  <p className="bg-secondary mr-[15px] text-[24px] text-primary p-2 rounded-lg">
                    <CiUser />
                  </p>
                  <div className="text-start text-slate-500">
                    <h2 className="text-black">{customerName}</h2>
                    <h3>
                      Customer since :
                      <span className="font-medium text-black"> 12/07/23</span>
                    </h3>
                  </div>
                </div>

                <div className="">
                  <h2 className="bg-secondary text-primary rounded-md p-1">
                    {status}
                  </h2>
                </div>
              </div>

              <div className="flex">
                <div className="flex text-start w-[100%] px-[18px]">
                  <div className="w-[50%]">
                    <h2 className="text-slate-400">
                      Phone : <br />{" "}
                      <span className="text-black"> {phone} </span>
                    </h2>
                  </div>

                  <div className="w-[50%]">
                    <h2 className="text-slate-400">
                      Total amount :
                      <br />
                      <span className="text-black"> $lkv </span>
                    </h2>
                  </div>
                 </div>
              </div>
            </div>

            <div className="mx-[10px] bg-[white] pb-[15px] rounded-xl w-[33%]">
              <div className="flex justify-between p-5">
                <div className="flex justify-center items-center">
                  <p className="bg-secondary mr-[15px] text-[24px] text-primary p-2 rounded-lg">
                    <CiLocationOn />
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex w-[100%] text-start px-[18px]">
                  <div className="w-[50%]">
                    <h2 className="text-slate-400">
                      Quantity : <br />
                      <span className="text-black text-medium text-[17px] px-[3px]">
                        {/* {quantity} */}
                      </span>
                    </h2>
                  </div>
                  <div className="w-[50%]">
                    <h2 className="text-slate-400">
                      New Customer :
                      <br />
                      <span className="text-black text-[17px] px-[3px]">
                        True
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-[10px] bg-[white] pb-[15px] rounded-xl w-[33%]">
              <div className="flex justify-between p-5">
                <div className="flex justify-center items-center">
                  <p className="bg-secondary mr-[15px] text-[24px] text-primary p-2 rounded-lg">
                    <MdOutlinePayment />
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex w-[100%] text-start px-[18px]">
                  <div className="w-[50%]">
                    <h2 className="text-slate-400">
                      Payment Method : <br />
                      <span className="text-black"> kjgjkh </span>
                    </h2>
                  </div>
                  <div className="w-[50%]">
                    <h2 className="text-slate-400">
                      Order Type :
                      <br />
                      <span className="text-black"> Home Delivery </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-12">
          <ViewCustomerTable />
        </div> 
       </div>  
    </div>
  );
};

export default ViewCustomer;
