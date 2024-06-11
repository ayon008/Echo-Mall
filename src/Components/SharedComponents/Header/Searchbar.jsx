import { useEffect, useRef, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [scrolling, setScrolling] = useState(null);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const handleScrolling = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScrolling);

    return () => {
      window.removeEventListener("scroll", handleScrolling);
    };
  }, []);

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
  const navigate = useNavigate();
  const handleOnclick = id => {
    navigate(`/Chackout/${id}`)
    setIsShown(false)
  }


  return (
    <>
      <div
        className={`mx-auto px-3 py-2 transition-colors duration-500 md:hidden ${scrolling && "bg-transparent sticky top-0 z-30"
          }`}
      >
        <input
          onChange={handleSearch}
          type="text"
          placeholder="search here..."
          className="w-full bg-white rounded-md border border-primaryColor1 outline-2 outline-primaryColor1 px-2 py-[5px] "
        />
        {
          isShown && searchData.length > 0 && <ul tabIndex={0} className="dropdown-content absolute top-10 z-30 menu p-2 shadow bg-base-100 rounded-box">
            {searchData.slice(0, 10)?.map(data => {
              return (
                <li key={data._id} onClick={() => handleOnclick(data._id)} className="p-2 cursor-pointer hover:text-orange-600">{data.Product_Name}</li>
              )
            })}
          </ul>
        }
      </div>
    </>
  );
};

export default Searchbar;
