import type { specificationCardProps } from "./types/types";
import { motion } from "motion/react";
const SpecificationCard = ({
  icon,
  title,
  text,
  bgColor,
  border,
  color,
}: specificationCardProps) => {
  const styles = [
    `${bgColor} ${border}  flex flex-col  relative rounded-xl border p-4 sm:p-5 lg:max-w-90 group max-w-100 `,
    `${color} w-11 h-11 rounded-xl flex items-center justify-center absolute -top-4 left-1/2 -translate-x-1/2  `,
  ];

  return (
    <motion.div
      initial={{ y: 0 }}
      whileHover={{ y: -20 }}
      className={styles[0]}
    >
      <div className={styles[1]}>{icon}</div>
      <div className="flex flex-col gap-3   items-center pt-7 pb-6   ">
        <p className="text-gray-700 left-  font-medium text-center">{title}</p>
        <p className="text-gray-600  text-center text-sm">{text}</p>
      </div>
    </motion.div>
  );
};

export default SpecificationCard;
