import { PiClockCountdown } from "react-icons/pi";
import { RiCustomerServiceLine } from "react-icons/ri";
import { SlPaperPlane } from "react-icons/sl";
import SpecificationCard from "./SpecificationCard";
import {motion} from  'motion/react'
const cardItems = [
  {
    icon: (
      <SlPaperPlane className="fill-white w-5 h-5 group-hover:rotate-360 group-hover:scale-130 transition-transform duration-300" />
    ),
    title: "Free Shipping",
    text: "Enjoy fast, free delivery on every order no conditions, just reliable doorstep.",
    bgColor: "bg-green-100",
    border: "border-green-400",
    color: "bg-green-400",
  },
  {
    icon: (
      <PiClockCountdown className="fill-white w-5 h-5 group-hover:rotate-360 group-hover:scale-130 transition-transform duration-300" />
    ),
    title: "7 Days easy Return",
    text: "Change your mind? No worries. Return any item within 7 days.",
    bgColor: "bg-amber-100",
    border: "border-amber-400",
    color: "bg-amber-400",
  },
  {
    icon: (
      <RiCustomerServiceLine className="fill-white w-5 h-5 group-hover:rotate-360 group-hover:scale-130 transition-transform duration-300" />
    ),
    title: "24/7 Customer Support",
    text: "We're here for you. Get expert help with our customer support.",
    bgColor: "bg-purple-100",
    border: "border-purple-400",
    color: "bg-purple-400",
  },
];
const SpecificationSection = () => {
  return (
    <motion.div
    initial={{y:20,opacity:0}}
    whileInView={{y:0,opacity:1}}
    transition={{duration:0.5,delay:0.2}}
    viewport={{once:true}}
    className="flex flex-col items-center  gap-20 px-1 sm:px-5 py-20 relative mx-2">
      <div className="flex flex-col items-center gap-2 max-w-150 justify-center relative p-2 ">
        <div className="absolute w-2/3  h-[150%] left-1/2 -translate-x-1/2 bg-green-200/80 rounded-full blur-2xl -z-1 "></div>
        <p className="text-2xl font-semibold text-gray-700 text-center">
          Our Specifications
        </p>
        <p className="text-center text-gray-600  text-sm">
          We offer top-tier service and convenience to ensure your shopping
          experience is smooth, secure and completely hassle-free.
        </p>
      </div>
      <div className="  grid sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {cardItems.map((el, index) => (
          <SpecificationCard
            key={index}
            icon={el.icon}
            title={el.title}
            text={el.text}
            bgColor={el.bgColor}
            border={el.border}
            color={el.color}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SpecificationSection;
