import React , { useState , useEffect } from 'react'
import Navbar from '../components/Navbar'
import BreadCrum from '../components/BreadCrum'
import Stats from '../components/Stats'
import { LuUsers2 } from "react-icons/lu";
import { BsHandbag } from "react-icons/bs";
import { AiOutlinePieChart } from "react-icons/ai";
import Graph from '../components/Graph';
import DayChart from '../components/DayCharts';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Chart from '../components/Chart';
import ChartPie from '../components/ChartPie';
import { BsFolder2Open } from 'react-icons/bs';
import { BsCart3 } from "react-icons/bs";
import RecentOrders from '../components/RecentOrders';
import { getProductDetail , getCustomerDetail } from '../helper/helper';

const Dashboard = () => {

  const ProductAPI = "http://localhost:8000/api/products";

  const CustomerAPI = "http://localhost:8000/api/customer";

  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalActiveCustomer, setTotalActiveCustomer] = useState(0);
  const [totalInactiveCustomer, setTotalInactiveCustomer] = useState(0);


  const [totalProduct , setTotalProduct] = useState(0);
  const [totalPublished , setTotalPublished] = useState(0);

  const fetchProductsDetails = async () => {
    try {
      const res = await getProductDetail(ProductAPI);  
      setTotalProduct(res.data.productDetail.total);
      setTotalPublished(res.data.productDetail.totalPublished);

      console.log("product Detail" , );
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCustomersDetails = async () => {
    try {
      const res = await getCustomerDetail(CustomerAPI);
      console.log("aklscj", res);
      setTotalCustomer(res.data.customerDetails.totalCustomers);
      setTotalActiveCustomer(res.data.customerDetails.totalActive);
      setTotalInactiveCustomer(res.data.customerDetails.totalInactive);
      console.log("product Detail", totalInactiveCustomer);

      console.log("totalCustomer", totalCustomer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductsDetails();
    fetchCustomersDetails();
  } , [CustomerAPI  , ProductAPI]);

  return (
    <div className="w-full">
      <Navbar title="Dashboard" />
      <BreadCrum />

      <div className="px-[40px] flex">
        <div className="w-[33.33%] pr-[15px]">
          <Stats
            sale={true}
            icon={<AiOutlinePieChart />}
            title1={"Sales"}
            title2={"Orders"}
            stat1={"$0.00"}
            stat1per={"0.00%"}
            stat2={"0"}
            // stat2per={"0.00%"}
            title3={"Cancelled"}
            stat3={"4"}
            // stat3per={"0.00%"}
            present={"1"}
          />
        </div>
        <div className="w-[33.33%] pl-[15px]">
          <Stats
            icon={<LuUsers2 />}
            title1={"Customers"}
            title2={"Active"}
            title3={"In-Active"}
            stat1={totalCustomer}
            // stat1per={"0.00%"}
            stat2={totalActiveCustomer}
            // stat2per={"0.00%"}
            stat3={totalInactiveCustomer}
            // stat3per={"0.00%"}
            present={"1"}
            dropdown={false}
          />
        </div>
        <div className="w-[33.33%] pl-[30px]">
          <Stats
            orderStatus={true}
            icon={<BsHandbag />}
            title1={"In Progress"}
            title2={"Pending"}
            title3={"Completed"}
            stat1={"$0.00"}
            // stat1per={"0.00%"}
            stat2={"$0.00"}
            // stat2per={"0.00%"}
            stat3={"$0.00"}
            // stat3per={"0.00%"}
            present={"1"}
          />
        </div>
      </div>

      <div className="flex py-[30px]">
        <div className="w-[62%]">
          <div className="px-[40px] flex">
            <div className="w-[100%] bg-white pb-[20px] h-[327px] rounded-xl ">
              <ChartPie />
            </div>

            <div className="w-[100%] ml-[28px]">
              <div className="mt-[4px]">
                <Stats
                  bgColor="primary"
                  height="170px"
                  icon={<BsFolder2Open />}
                  title1={"All Products"}
                  title2={"Published"}
                  stat1={totalProduct}
                  stat2={totalPublished}
                  padY={"10"}
                  txtColor={"white"}
                  dropdown={false}
                />
              </div>

              <div className="mt-[30px]">
                <Stats
                  height="159px"
                  icon={<BsCart3 />}
                  title1={"Abandoned Cart"}
                  title2={"Customers"}
                  stat1={"20%"}
                  stat2={"30"}
                  padY={"9"}
                />
              </div>
            </div>
          </div>

          <div className="px-[40px] flex py-[20px]">
            <div className="w-[100%] bg-white">
              <Graph title="1" height="400px" present={"1"} />
            </div>
          </div>
        </div>

        <div className="w-[35%]">
          <div className="bg-white rounded-xl  pr-[15px] w-full">
            <RecentOrders />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard
