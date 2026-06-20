import LogoButton from "./LogoButton";
import { useNavigate } from "react-router-dom";
import {  FiGithub, FiLinkedin } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import type { contactType, iconsType } from "./types/types.ts";
import { footerProducts, footerWebsite } from "./data/data";
const contact = [
  {
    text: "contact@example.com",
    icon: <HiOutlineMail className="text-gray-400 w-4 h-4" />,
  },
  {
    text: "+1-212-456-7890",
    icon: <FiPhone className="text-gray-400 w-4 h-4" />,
  },
];
const icons = [
  {
    link: "https://github.com/fatimaAlzahraa-almaz",
    icon: <FiGithub className="text-gray-400 w-5 h-5" />,
  },
  {
    link: "https://www.linkedin.com/in/fatima-almaz-74724a2b8/",
    icon: <FiLinkedin className="text-gray-400 w-5 h-5" />,
  },
  {
    link: "https://www.instagram.com",
    icon: <FiInstagram className="text-gray-400 w-5 h-5" />,
  },
];

const Footer = () => {
  const navigate = useNavigate();
  const scroll=()=>{
    window.scrollTo({top:0,
      behavior:'smooth'
    })
  }
  const handleHomeClick = () => {
    navigate("/");
    scroll();
    
  };
  const handleProductClick=(product:string)=>{
          navigate('/category?category='+product);
          scroll();
  }
  
  return (
    <div className=" flex flex-col gap-4 w-full text-gray-500 text-sm p-2 sm:p-6">
      <div className="flex flex-col md:flex-row gap-4  md:justify-between w-full">
        <div className="flex flex-col items-start gap-4 sm:w-1/2 md:w-1/3">
          <LogoButton handleClick={handleHomeClick} />
          <p>
            Welcome to gocart, your ultimate destination for the latest and
            smartest gadgets. From smartphones and smartwatches to essential
            accessories, we bring you the best in innovation — all in one place.
          </p>
          <ul className="flex gap-2 flex-wrap">
            {icons.map((el: iconsType, i: number) => (
              <li
                key={i}
                
                className="bg-gray-100 p-2 rounded-3xl hover:scale-105 border border-white hover:border-gray-300 cursor-pointer transition-transform text-start "
              >
                <a href={el.link}>{el.icon}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between   text-sm md:w-1/2 gap-3 flex-wrap">
          <div className="flex flex-col gap-2">
            <p className="text-gray-700 font-medium">PRODUCTS</p>
            <div className="flex flex-col gap-1  items-start">
              {footerProducts.map((el: string, i: number) => (
                <button
                  key={i}
                  onClick={()=>handleProductClick(el)}
                  className="hover:underline cursor-pointer text-start"
                >
                  {el}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-gray-700 font-medium">WEBSITE</p>
            <div className="flex flex-col gap-1  items-start">
              {footerWebsite.map((el: string, i: number) => (
                <button
                  onClick={handleHomeClick}
                  key={i}
                  className="hover:underline cursor-pointer   text-start"
                >
                  {el}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-gray-700 font-medium">CONTACT</p>
            <div className="flex flex-col gap-1 items-start">
              {contact.map((el: contactType, i: number) => (
                <button
                  onClick={handleHomeClick}
                  key={i}
                  className="hover:underline cursor-pointer flex items-center gap-1 flex-wrap"
                >
                  {el.icon}
                  {el.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 py-4">
        <p>Copyright 2025 © gocart All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
