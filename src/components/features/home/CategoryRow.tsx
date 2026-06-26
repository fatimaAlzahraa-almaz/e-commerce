import { useGetCategoriesQuery } from "../../../app/service/productsApi";
import { useRef } from "react";
import CategoryItem from "./CategoryItem";
import { categoryImg } from "./data/data";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import LoadingCategoryItem from "../loading/LoadingCategoryItem";
const CategoryRow = () => {
  const { data, isLoading } = useGetCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: 1800,
  });
  const scrollEl = useRef<HTMLDivElement>(null);
  const handleRightArrow = () => {
    if (scrollEl.current) {
      const { clientWidth, scrollLeft } = scrollEl.current;
      scrollEl.current.scrollTo({
        left: scrollLeft + clientWidth,
        behavior: "smooth",
      });
    }
  };
  const handleLeftArrow = () => {
    if (scrollEl.current) {
      const { clientWidth, scrollLeft } = scrollEl.current;
      scrollEl.current.scrollTo({
        left: scrollLeft - clientWidth,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="w-full  flex  relative ">
      <div
        onClick={handleLeftArrow}
        className="bg-gray-200/70 absolute z-90 h-9 w-9 items-center justify-center rounded-3xl cursor-pointer left-0 top-1/2 -translate-y-1/2 hover:bg-gray-300 hidden sm:flex xl:hidden"
      >
        <IoIosArrowBack className="h-5 w-5 fil-gray-600 " />
      </div>
      <div
        onClick={handleRightArrow}
        className="bg-gray-200/70 absolute z-90 h-9 w-9 items-center justify-center rounded-3xl cursor-pointer right-0 top-1/2 -translate-y-1/2 hover:bg-gray-300 hidden sm:flex  xl:hidden"
      >
        <IoIosArrowForward className="h-5 w-5 fill-gray-600" />
      </div>
      <div
        ref={scrollEl}
        className="grid mx-auto grid-rows-3 grid-flow-col  gap-1   overflow-x-scroll   scrollbar-hide   py-2 "
      >
        {isLoading
          ? Array.from({ length: 27 }).map((_, i: number) => (
              <LoadingCategoryItem key={i} />
            ))
          : data?.map((el: string, i: number) => (
              <CategoryItem key={i} category={el} imgUrl={categoryImg[i]} />
            ))}
      </div>
    </div>
  );
};

export default CategoryRow;
