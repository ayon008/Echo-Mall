import React, { useContext, useEffect, useState } from "react";
import logo from "../../../assets/Logos.png";
import logo_M from "../../../assets/logo(152).png";
import { CiSearch } from "react-icons/ci";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import Menu from "./Menu";
import Searchbar from "./Searchbar";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";
import '../../SharedComponents/Header/Header.css'
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { set } from "firebase/database";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const axiosPublic = useAxiosPublic();

  const handleLogOut = () => {
    logOut();
  };

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [searchData, setSearchData] = useState([]);
  const [queryValues, setQueryValues] = useState("");
  const [isShown, setIsShown] = useState(false);

  const handleSearch = (event) => {
    const query = event.target.value;
    setIsShown(true);
    setQueryValues(query);
  };

  useEffect(() => {
    axiosPublic.get(`/suggestions?search=${queryValues}`)
      .then(response => {
        setSearchData(response.data);
      })
  }, [queryValues])

  const handleOnclick = id => {
    navigate(`/Chackout/${id}`)
    setIsShown(false)
  }


  return (
    <>
      <div className=" flex items-center md:hidden justify-between px-3">
        <Link to="/">
          <div className="">
            <img src={logo} alt="logo" className="w-[35px] h-[25px]" />
          </div>
        </Link>
        <div>
          <Searchbar />
        </div>
        <div className="pr-2">
          {" "}
          <FiShoppingCart className="text-[18px]  text-[#f85606] hover:bg-black/10  cursor-pointer rounded-md" />
        </div>
        {/* ---- */}
        <div>
          {/* Create Profile Drop Down */}
          {user ? (
            <div className="flex justify-center items-center gap-3 ml-2">
              <img
                src={user.photoURL}
                alt=""
                className="rounded-full-ex cursor-pointer "
                onClick={toggleDropdown}
              />

              <button onClick={handleLogOut}>Logout</button>
            </div>
          ) : (
            <img
              src="https://i.ibb.co/q91jPZq/josh-d-avatar.jpg"
              alt=""
              width={25}
              className="rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
          )}
          {isDropdownOpen && (
            <div className="absolute top-10 right-0 bg-white rounded-md shadow-md p-2 z-50 w-32">
              <ul className="space-y-2">
                {user ? (
                  <>
                    <li className="pt-2">
                      <Link to="/profile">Profile</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="pt-2">
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Sign Up</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* TO DO HIDE UL */}
      {/* navbar  */}
      <nav className="bg-primaryColor2 w-full py-4 sticky top-0 left-0 hidden  z-30  md:block">
        <div className="myContainer">
          <div className="flex items-center justify-between gap-3">
            {/* logo */}
            <Link to="/">
              <div className="">
                <img src={logo} alt="logo" className="w-[60px] h-[40px]" />
              </div>
            </Link>

            {/* nav menu  */}
            <div className="">
              <Menu />
            </div>

            {/* search bar  */}
            <div className="relative bg-white rounded-md px-2 py-[.35rem] flex items-center flex-1">
              <input
                onChange={handleSearch}
                type="text"
                placeholder="Search here..."
                className=" border-none outline-none w-full h-full"
              />
              <CiSearch className="cursor-pointer text-primaryColor1 text-lg bg-primaryColorLight w-7 h-7 rounded-full p-1 font-bold" />
              {
                isShown && searchData.length > 0 && <ul tabIndex={0} className="dropdown-content absolute top-10 z-[1] menu p-2 shadow bg-base-100 rounded-box">
                  {searchData.slice(0, 10)?.map(data => {
                    return (
                      <li key={data._id} onClick={() => handleOnclick(data._id)} className="p-2 cursor-pointer hover:text-orange-600">{data.Product_Name}</li>
                    )
                  })}
                </ul>
              }
            </div>
            {/* profile */}
            <div className="flex items-center gap-2 font-semibold text-whiteText  capitalize ">
              {user ? (
                <div className="relative user">
                  <div className="flex justify-center items-center gap-2 hover:bg-orange-700 duration-200 p-1 rounded">
                    <img
                      src={user.photoURL}
                      alt=""
                      width={25}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-[8px]">Hello,{user?.displayName.length > 20 ? user?.displayName.slice(0, 20) + '...' : user?.displayName}</p>
                      <p className="text-[12px]">Orders & Accounts</p>
                    </div>
                  </div>
                  <ul tabIndex={0} className="dropdown-content opacity-0 hidden absolute z-[1] right-0 menu p-2 shadow bg-white rounded-box w-52 text-gray-500">
                    <li className="hover:text-orange-600 hover:underline"><Link to="/addToCart">My Order</Link></li>
                    <li className="hover:text-orange-600 hover:underline"><Link to="/myAccount">My Account</Link></li>
                    <li className="hover:text-orange-600 hover:underline"><button onClick={handleLogOut}>Logout</button></li>
                  </ul>
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  {/* login  */}
                  <Link
                    to="/login"
                    className="flex items-center  gap-1 text-lg font-semibold text-whiteText hover:bg-black/10  cursor-pointer p-2 rounded-md"
                  >
                    <FaRegUser className="text-xl" />
                    <span>login</span>
                  </Link>

                  {/* sign up  */}
                  <Link to="/register">
                    {" "}
                    <p className=" text-whiteText hover:bg-black/10  cursor-pointer p-2 rounded-md">
                      Sign up
                    </p>{" "}
                  </Link>
                </div>
              )}

              {/* cart  */}
              <FiShoppingCart onClick={() => navigate('/addToCart')} className="text-4xl  text-whiteText hover:bg-black/10  cursor-pointer p-2 rounded-md" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export function MemoryLogin(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 22 22"
      {...props}
    >
      <path
        fill="currentColor"
        d="M5 1h12v1h1v18h-1v1H5v-1H4v-6h2v5h10V3H6v5H4V2h1V1m3 5h2v1h1v1h1v1h1v1h1v2h-1v1h-1v1h-1v1h-1v1H8v-2h1v-1h1v-1H2v-2h8V9H9V8H8V6Z"
      ></path>
    </svg>
  );
}

export default Header;
