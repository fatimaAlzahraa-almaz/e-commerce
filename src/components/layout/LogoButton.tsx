import type { logoButtonProps } from "./types/types.ts";
const LogoButton = ({ handleClick }: logoButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className="min-w-0   text-2xl sm:text-3xl font-bold text-green-600 hover:cursor-pointer relative"
    >
      <span>go</span>
      <span className="text-gray-700">cart</span>.
      <span className="text-xs absolute bg-green-500 text-white px-1 sm:px-2 hidden sm:flex rounded-2xl -right-8 -top-1  py-0.5 pb-1">
        plus
      </span>
    </button>
  );
};

export default LogoButton;
