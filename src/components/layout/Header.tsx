import { FiHeart } from "react-icons/fi";
import { RiUserLine } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IoMdClose } from "react-icons/io";
import UserMenu from "./UserMenu";
import LogoButton from './LogoButton'
import { UserAuth } from "../../app/context/AuthContext";
import { cartCounterSelector } from "../../app/features/cart/cartSelectors";
import { useAppSelector } from "../../app/hooks/hooks";
import { favoritesCountSelector } from "../../app/features/favorites/favoritesSelectors";
import { useAppDispatch } from "../../app/hooks/hooks";
import { setError } from "../../app/features/notification/errorNotificationSlice";

const Header = () => {
  const [q, setQ] = useState<string>("");
  const [visibleUserMenu, setVisibleUserMenu] = useState<boolean>(false);
  const [visibleSearchBar, setVisibleSearchBar] = useState<boolean>(false);
  const dispatch=useAppDispatch();
  const navigate = useNavigate();
  const{logOut,resetAll}=UserAuth();
  const cartCount=useAppSelector(cartCounterSelector);
  const favoritesCount=useAppSelector(favoritesCountSelector);
   const scroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleLogoClick = () => {
    scroll();
    navigate("/");
  };
  const handleWishlistClick = () => {
    scroll();
    navigate("/wishlist");
  };
  const handleCartClick = () => {
      scroll();
    navigate("/cart");
  };
  const handleSigninClick = () => {
    setVisibleUserMenu(false);
    scroll();
    navigate("/signin");
  };
  const handleSignupClick = () => {
    setVisibleUserMenu(false);
    scroll();
    navigate("/signup");
  };
  const handleLogOutClick = async() => {
    try{
      resetAll();
     await logOut();
    setVisibleUserMenu(false);
    scroll();
    navigate("/signin");
    }catch(err){
      dispatch(setError(true));
      console.log(err);
    }
  };
  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    scroll();
    navigate(`/search?q=${q}`);
    setVisibleSearchBar(false);
    setQ("");
  };
  
  return (
    <div className=" fixed top-0 right-0 left-0 w-full flex border-b border-gray-200 bg-white/99  justify-between px-2 pr-5 sm:px-4 md:px-10 h-18 items-center  z-101 backdrop-blur-2xl">
      {(visibleUserMenu || visibleSearchBar) && (
        <div
          onClick={() => {
            setVisibleUserMenu(false);
            setVisibleSearchBar(false);
          }}
          className=" w-full h-full fixed top-0 left-0 z-99"
        ></div>
      )}
      {visibleSearchBar && (
        <AnimatePresence>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full z-100 bg-white absolute h-full top-0 left-0 flex items-center justify-center"
          >
            <form
              onSubmit={handleFormSubmit}
              className="h-10 flex bg-gray-100 rounded-3xl  px-1 text-sm font-medium w-[80%]  "
            >
              <button
                disabled={q == ""}
                type="submit"
                className=" rounded-2xl px-2 hover:cursor-pointer "
              >
                <IoSearch className="w-5 h-5 text-gray-600" />
              </button>
              <input
                type="text"
                value={q}
                placeholder="Search products"
                className="text-gray-700 w-full focus:outline-none "
                onChange={(e) => setQ(e.target.value)}
              />
            </form>
            <button onClick={() => setVisibleSearchBar(false)}>
              <IoMdClose className="h-11 w-6 text-gray-700 cursor-pointer" />
            </button>
          </motion.div>
        </AnimatePresence>
      )}

      <div className="flex relative sm:hidden gap-1 items-center ">
        <button
          onClick={() => setVisibleUserMenu((prev) => !prev)}
          className="  sm:hidden hover:cursor-pointer relative p-1 bg-gray-600 rounded-3xl hover:bg-gray-100 group"
        >
          <RiUserLine className="w-5 h-5 text-white group-hover:text-green-600" />
        </button>
        {visibleUserMenu && (
          <AnimatePresence>
            <div className="absolute top-12 z-100 sm:hidden">
              {" "}
              <UserMenu signIn={handleSigninClick} signUp={handleSignupClick} logOut={handleLogOutClick} />
            </div>
          </AnimatePresence>
        )}

        <button onClick={() => setVisibleSearchBar(true)}>
          <IoSearch className="w-5 h-5 cursor-pointer text-gray-700" />
        </button>
      </div>

      <LogoButton handleClick={handleLogoClick}/>

      <div className=" flex  sm:gap-2 h-11 sm:h-12 ">
        <form
          onSubmit={handleFormSubmit}
          className="hidden sm:flex bg-gray-100 rounded-3xl  px-1 text-sm font-medium w-[32vw] xl:w-[27vw]  "
        >
          <button
            disabled={q == ""}
            type="submit"
            className=" rounded-2xl px-2 hover:cursor-pointer "
          >
            <IoSearch className="w-5 h-5 text-gray-600" />
          </button>
          <input
            type="text"
            value={q}
            placeholder="Search products"
            className="text-gray-700 w-full focus:outline-none "
            onChange={(e) => setQ(e.target.value)}
          />
        </form>
        <div className="flex gap-2 relative items-center ">
          <button
            onClick={handleWishlistClick}
            className=" h-full relative hover:cursor-pointer   group sm:px-3.5 rounded-3xl sm:hover:bg-gray-100"
          >
            <FiHeart className=" w-5 h-5  text-gray-600 group-hover:text-green-600" />
            <span className="absolute top-0 sm:top-0.5   bg-gray-600 px-1 text-center rounded-2xl text-xs text-gray-200 max-w-[4ch] sm:max-w-[6ch] truncate  ">
              {favoritesCount}
            </span>
          </button>

          <button
            onClick={() => setVisibleUserMenu((prev) => !prev)}
            className="h-full hidden sm:block hover:cursor-pointer relative  px-3.5 rounded-3xl hover:bg-gray-100 group"
          >
            <RiUserLine className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
          </button>
          {visibleUserMenu && (
            <AnimatePresence>
              <div className="hidden sm:block z-100 absolute top-12 right-12">
                <UserMenu
                  signIn={handleSigninClick}
                  signUp={handleSignupClick}
                  logOut={handleLogOutClick}
                />
              </div>
            </AnimatePresence>
          )}

          <button
            onClick={handleCartClick}
            className=" h-full hover:cursor-pointer relative   sm:px-3.5 rounded-3xl sm:hover:bg-gray-100 group"
          >
            <FaCartShopping className=" w-5 h-5 text-gray-600 group-hover:text-green-600" />
            <span className="absolute top-0 sm:top-0.5 bg-gray-600 px-1  rounded-2xl text-center text-xs text-gray-200 max-w-[4ch] sm:max-w-[6ch] truncate ">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
