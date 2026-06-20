import type { categoryItemProps } from "./types/types";
import { useNavigate } from "react-router-dom";
const CategoryItem = ({ category, imgUrl }: categoryItemProps) => {
  const navigate = useNavigate();
  const scroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleClick = () => {
    scroll();
    navigate(`/category?category=${category}`);
  };
  return (
    <div
      onClick={handleClick}
      className=" cursor-pointer aspect-square w-27 md:w-35  lg:w-40 flex flex-col items-center gap-1 justify-center "
    >
      <div className="h-[65%] bg-gray-100 rounded-4xl group scrollbar-hide">
        <img
          className="object-cover w-full h-full  group-hover:scale-105 transition-transform"
          src={imgUrl}
        />
      </div>
      <p className="text-sm text-gray-600 max-w-[14ch] truncate">{category}</p>
    </div>
  );
};

export default CategoryItem;
