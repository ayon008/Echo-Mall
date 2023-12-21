import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FaTruckFast } from "react-icons/fa6";
import { IoIosPricetag, IoIosCheckmarkCircle } from "react-icons/io";

const serviceGuar = [
  {
    title: "save payments",
    icon: IoShieldCheckmarkSharp,
  },
  {
    title: "national wide delevery",
    icon: FaTruckFast,
  },
  {
    title: "Best Price Guaranteed",
    icon: IoIosPricetag,
  },
  {
    title: "100% Authentic Products",
    icon: IoIosCheckmarkCircle,
  },
  {
    title: "Ecom Store Verified",
    icon: MaterialSymbolsVerifiedRounded,
  },
  {
    title: "Exclusives Deals",
    icon: AntDesignFireFilled,
  },
];
const ServiceGuearanty = () => {
  return (
    <div>
      <div className="hidden md:block">
        <div className="bg-primaryColorLight flex justify-between gap-3 flex-wrap py-2 px-[50px] rounded-md">
          {serviceGuar.map((service) => {
            const { title, icon: Icon } = service;
            return (
              <div className="flex items-center gap-1">
                <Icon className="text-2xl  text-primaryColor1" />
                <h3 className="text-[16px] font-semibold">{title}</h3>
              </div>
            );
          })}
        </div>
      </div>
      <div className="md:hidden mx-1">
        <div className="bg-primaryColorLight grid grid-cols-2 gap-y-4 gap-x-3  py-2 px-[10px] rounded-md">
          {serviceGuar.map((service) => {
            const { title, icon: Icon } = service;
            return (
              <div className="flex items-center gap-[2px]">
                <Icon className="text-xl  text-primaryColor1" />
                <h3 className="text-[12px] font-semibold">{title}</h3>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};



export function MaterialSymbolsVerifiedRounded(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M10.95 12.7L9.5 11.275Q9.225 11 8.813 11t-.713.3q-.275.275-.275.7t.275.7l2.15 2.15q.3.3.7.3t.7-.3l4.25-4.25q.3-.3.287-.7t-.287-.7q-.3-.3-.712-.312t-.713.287zm-2.8 9.05L6.7 19.3l-2.75-.6q-.375-.075-.6-.387t-.175-.688L3.45 14.8l-1.875-2.15q-.25-.275-.25-.65t.25-.65L3.45 9.2l-.275-2.825q-.05-.375.175-.688t.6-.387l2.75-.6l1.45-2.45q.2-.325.55-.438t.7.038l2.6 1.1l2.6-1.1q.35-.15.7-.038t.55.438L17.3 4.7l2.75.6q.375.075.6.388t.175.687L20.55 9.2l1.875 2.15q.25.275.25.65t-.25.65L20.55 14.8l.275 2.825q.05.375-.175.688t-.6.387l-2.75.6l-1.45 2.45q-.2.325-.55.438t-.7-.038l-2.6-1.1l-2.6 1.1q-.35.15-.7.038t-.55-.438"></path></svg>
  )
}


export function AntDesignFireFilled(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024" {...props}><path fill="currentColor" d="M834.1 469.2A347.49 347.49 0 0 0 751.2 354l-29.1-26.7a8.09 8.09 0 0 0-13 3.3l-13 37.3c-8.1 23.4-23 47.3-44.1 70.8c-1.4 1.5-3 1.9-4.1 2c-1.1.1-2.8-.1-4.3-1.5c-1.4-1.2-2.1-3-2-4.8c3.7-60.2-14.3-128.1-53.7-202C555.3 171 510 123.1 453.4 89.7l-41.3-24.3c-5.4-3.2-12.3 1-12 7.3l2.2 48c1.5 32.8-2.3 61.8-11.3 85.9c-11 29.5-26.8 56.9-47 81.5a295.64 295.64 0 0 1-47.5 46.1a352.6 352.6 0 0 0-100.3 121.5A347.75 347.75 0 0 0 160 610c0 47.2 9.3 92.9 27.7 136a349.4 349.4 0 0 0 75.5 110.9c32.4 32 70 57.2 111.9 74.7C418.5 949.8 464.5 959 512 959s93.5-9.2 136.9-27.3A348.6 348.6 0 0 0 760.8 857c32.4-32 57.8-69.4 75.5-110.9a344.2 344.2 0 0 0 27.7-136c0-48.8-10-96.2-29.9-140.9z"></path></svg>
  )
}
export default ServiceGuearanty;
