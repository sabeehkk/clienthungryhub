import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { MdExitToApp } from "react-icons/md";
import { MdHome } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import { MdOutlineFastfood } from "react-icons/md";
import { Link } from "react-router-dom";
import { RESTAURENT_API } from "../../Constants/API.js";

interface Product {
  productName: string;
  variants: number;
  images?: string | null;
}
const UserNavbar = () => {
  const [nav, setNav] = useState(false);
  const [foods, setFoods] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(`${RESTAURENT_API}/productList`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFoods(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const filteredFoods = foods.filter((food) =>
    searchTerm
    .toLowerCase()
    .split(' ')
    .every((word) => food.productName.toLowerCase().includes(word))
    );
  return (
    <>
      <div
        className="max-w-[1640px] mx-auto
     flex justify-between items-center  p-4 sticky top-0 bg-white z-50"
      >
        {/* {Left Side} */}
        <div className="flex items-center ">
          <div onClick={() => setNav(!nav)} className="cusrsor-pointer">
            <AiOutlineMenu size={30} />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
            Hungry <span className="font-bold">Hub </span>
          </h1>
          <div className="hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]">
            <p className="bg-black text-white rounded-full p-2">Delivery</p>
            <p>Pickup</p>
          </div>
        </div>
        {/* {Search input} */}
        <div className="bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
          <AiOutlineSearch size={20} />
          <input
            className="bg-transparent p-2 w-full focus:outline-none"
            type="text"
            placeholder="Search foo ds"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* {CartButton} */}
        <button className="bg-black text-white hidden md:flex items-center py-2 rounded-full">
          <Link to="/cart" className="flex items-center">
            <BsFillCartFill size={20} className="mr-2" /> Cart
          </Link>
        </button>
        {nav ? (
          <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
        ) : (
          ""
        )}
        <div
          className={
            nav
              ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300 "
              : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300 "
          }
        >
          <AiOutlineClose
            onClick={() => setNav(!nav)}
            size={30}
            className="absolute right-4 top-4 cursor-pointer"
          />
          <h2 className="text-2xl p-4">
            Hungry <span className="font-bold">Hub</span>
          </h2>
          <nav>
            <ul className="flex flex-col p-4 text-gray-800">
              <li className="text-xl py-4 flex gap-x-2 items-center">
                <Link to="/restaurent/home" className="flex items-center">
                  <FaUserFriends size={25} className="mr-4" />
                  Become a Partner
                </Link>
              </li>
              <li className="text-xl py-4 flex gap-x-2 items-center">
                <Link to="/profile" className="flex items-center">
                  <MdFavorite size={25} className="mr-4" />
                  Profile
                </Link>
              </li>
              <li className="text-xl py-4 flex gap-x-2 items-center">
                <Link to="/filterShops" className="flex items-center">
                  <MdOutlineFastfood size={25} className="mr-4" />
                  Restaurants
                </Link>
              </li>
              <li className="text-xl py-4 flex gap-x-2 items-center">
                <Link to="/employee/login" className="flex items-center">
                  <TbTruckDelivery size={25} className="mr-4" />
                  Join With Us
                </Link>
              </li>
              <li className="text-xl py-4 flex gap-x-2 items-center">
                <Link to="/" className="flex items-center">
                  <MdHome size={25} className="mr-4" />
                  Home
                </Link>
              </li>
              <li className="text-xl py-4 flex gap-x-2 items-center">
                <Link to="/orders" className="flex items-center">
                  <BiFoodMenu size={25} className="mr-4" />
                  Orders
                </Link>
              </li>
              <li className="text-xl py-4 flex gap-x-2 items-center">
                <Link to="/logout" className="flex items-center">
                  <MdExitToApp size={25} className="mr-4" />
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* {Side drawer menu} */}
      </div>
      {searchTerm && (
        <div className="max-w-[1640px] m-auto px-4 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {filteredFoods?.map((item, index) => (
              <div
                key={index}
                className="border cursor-pointer shadow-lg rounded-lg hover:scale-105 duration-300"
              >
                <img
                  src={item?.images?.[0]}
                  alt={item?.productName}
                  className="w-full h-[200px] object-cover rounded-t-lg"
                />
                <div className="flex justify-between px-2 py-4">
                  <p className="font-bold">{item?.productName}</p>
                  <p>
                    <span className="bg-orange-500 text-white p-1 rounded-full">
                      ₹ {item.variants[0]?.price}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserNavbar;
