import { useEffect, useRef, useState } from "react";

const Searchbar = () => {
  const [scrolling, setScrolling] = useState(null);
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
  return (
    <>
      <div
        className={`mx-auto px-3 py-2 transition-colors duration-500 md:hidden ${scrolling && "bg-transparent sticky top-0 z-30"
          }`}
      >
        <input
          type="text"
          placeholder="search here..."
          className="w-full bg-white rounded-md border border-primaryColor1 outline-2 outline-primaryColor1 px-2 py-[5px] "
        />
      </div>
    </>
  );
};

export default Searchbar;
