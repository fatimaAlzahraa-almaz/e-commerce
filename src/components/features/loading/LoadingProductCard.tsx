const LoadingProductCard = () => {
  return (
    <div className="flex flex-col bg-gray-100/50 aspect-2/3 w-full max-w-70    gap-3 sm:gap-5 rounded-xl p-3 text-gray-600      relative ">
      <div className="w-full bg-gray-200/60 h-[65%] rounded-xl relative  "></div>
      <div className="flex flex-col gap-3 w-full">
        <p className=" font-medium text-lg line-clamp-1 w-1/2 h-5 sm:h-7 bg-gray-200/60 rounded-xl"></p>

        <p className="font-medium text-lg text-green-500 h-5 w-full bg-gray-200/60 sm:h-7 rounded-xl"></p>
        <p className="font-medium text-lg text-green-500 h-5 w-full bg-gray-200/60 sm:h-7 rounded-xl"></p>
      </div>
    </div>
  );
};

export default LoadingProductCard;
