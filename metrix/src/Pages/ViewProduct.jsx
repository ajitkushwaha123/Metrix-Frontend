import React , {useEffect} from 'react'
import Navbar from '../components/Navbar'
import BreadCrum from '../components/BreadCrum'
import { MdOutlineArrowDropDown } from 'react-icons/md'
import { useFormik } from 'formik'
import { upload } from '../assets'
import Stats from '../components/Stats'
import { BsFolder2Open, BsHandbag } from 'react-icons/bs'
import ViewProductTable from '../DataTable/ViewProductTable'
import { useParams } from 'react-router-dom';
import { useProductContext } from "../context/productContext";


const API = "http://localhost:8000/api/products";

const ViewProduct = () => {

    const { getSingleProduct, isSingleLoading, singleProduct } = useProductContext();
    const { id } = useParams();

    console.log("id", id);

    useEffect(() => {
      console.log("id", id);
      getSingleProduct(`${API}/${id}`);
      console.log("singleProduct", singleProduct);
    }, []);


  return (
    <div>
      <Navbar title={"Inventory"} />
      <BreadCrum title={"Inventory"} back={"/"} />

      <div className="px-[40px]">
        <div className="flex justify-between items-center">
          <div className="flex">
            <p className="mr-[30px]">{singleProduct.productName}</p>
            <p className="mr-[30px] text-[18px]">
              <span className="font-medium text-[18px]">Dated : </span> {singleProduct.createdAt}
            </p>
            <p className="">
              <span className="font-medium mr-[30px] text-[18px]">
                Product Url :
              </span>
              https:product.com
            </p>
          </div>

          <div className="flex justify-center items-center">
            <button className="bg-black mx-[15px] rounded-lg flex justify-center items-center text-white px-6 text-[18px] py-2">
              <MdOutlineArrowDropDown className="mr-[15px]" />
              Delete Product
            </button>
            <button
              //   onClick={formik.handleSubmit}
              className="bg-primary rounded-lg flex justify-center items-center text-white px-6 text-[18px] py-2"
            >
              UnPublish Product
            </button>
          </div>
        </div>

        <div className="py-[30px]">
          <div className="flex">
            <img className="w-[210px] rounded-lg h-[150px]" src={singleProduct.photos} />
            <div className="mx-[10px] w-[29%]">
              <Stats
                icon={<BsHandbag />}
                title1={"Price"}
                title2={"In Stock"}
                txtColor={"text-red-200"}
                stat1={"25,000"}
                stat2={"30"}
                present={"1"}
              />
            </div>
            <div className="mx-[10px] w-[29%]">
              <Stats
                icon={<BsHandbag />}
                title1={"Orders"}
                title2={"Expired"}
                txtColor={"text-red-200"}
                stat1={"23"}
                stat2={"3"}
                present={"1"}
              />
            </div>
            <div className="mx-[10px] w-[29%]">
              <Stats
                icon={<BsHandbag />}
                title1={"View"}
                title2={"Favourites"}
                txtColor={"text-red-200"}
                stat1={"23"}
                stat2={"3"}
                present={"1"}
              />
            </div>
          </div>

          <div className="flex my-[30px]">
            <div className="w-[50%] mr-[16px]">
              <Stats
                icon={<BsHandbag />}
                title1={"All Orders"}
                title2={"Pending"}
                txtColor={"text-red-200"}
                title3={"Completed"}
                stat1={"23"}
                stat2={"3"}
                stat3={"2"}
                present={"1"}
              />
            </div>
            <div className="w-[50%] mx-[8px]">
              <Stats
                icon={<BsHandbag />}
                title1={"Exchanges"}
                title2={"Return"}
                txtColor={"text-red-200"}
                title3={"Damaged"}
                stat1={"23"}
                stat2={"3"}
                stat3={"2"}
                present={"1"}
              />
            </div>
          </div>

          <div className="bg-white p-12">
            <ViewProductTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct
