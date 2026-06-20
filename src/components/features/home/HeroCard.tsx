import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
const HeroCard = ({ url }: { url: string }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/products?skip=0");
  };
  return (
    <div className="h-full w-full relative">
      <div className="absolute w-full h-full bg-linear-to-r bg-black/40"></div>
      <img className="w-full h-full object-cover" src={url} />
      <div className="absolute top-1/2 -translate-y-1/2 text-white flex flex-col gap-2 sm:gap-3 p-2 sm:p-4">
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeIn" }}
          viewport={{ once: true }}
          className="text-2xl sm:text-4xl font-semibold font-serif "
        >
          Gadgets you'll love , Prices you'll trust!
        </motion.p>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeIn" }}
          viewport={{ once: true }}
          className=" text-xl sm:text-3xl font-semibold font-serif"
        >
          20% discounts
        </motion.p>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeIn", delay: 0.1 }}
          viewport={{ once: true }}
          className="font-light sm:py-4"
        >
          Free Shipping on Orderes Above 50$!
        </motion.p>
        <motion.button
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeIn", delay: 0.1 }}
          viewport={{ once: true }}
          onClick={handleClick}
          className="text-sm sm:text-base font-medium cursor-pointer border-2 rounded-3xl px-3 py-2 bg-gray-400/50 hover:bg-gray-500/50 w-35 sm:w-54"
        >
          DISCOVER MORE
        </motion.button>
      </div>
    </div>
  );
};

export default HeroCard;
