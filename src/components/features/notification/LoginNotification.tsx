import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks/hooks";
import { setLoginNotification } from "../../../app/features/notification/loginNotificationSlice";
const LoginNotification = () => {
  const [width, setWidth] = useState<number>(0);
  const dispatch=useAppDispatch();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setInterval(() => {
      setWidth((prev) => {
        if (prev > 99) {
          clearInterval(timer);
          dispatch(setLoginNotification(false));
          document.body.style.overflow = "auto";
          return 100;
        } else return prev + 1;
      });
    }, 15);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-gray-800/20 backdrop-blur-sm z-102 flex items-center justify-center">
      <div className="flex flex-col border border-gray-300 w-50 sm:w-70 px-3 sm:px-5  py-8 pb-10 justify-center items-center rounded-xl gap-1 relative bg-white ">
        <IoMdClose className="w-10 h-10 text-gray-600 mb-2" />

        <p className="text-xl font-medium text-green-700">Dear Customer</p>
        <p className="text-green-600">Please Login first</p>
        <span
          style={{ width: `${width}%` }}
          className={` $ h-2 bg-green-600 absolute bottom-0 rounded-bl-xl rounded-br-xl left-0`}
        ></span>
      </div>
    </div>
  );
};

export default LoginNotification;
