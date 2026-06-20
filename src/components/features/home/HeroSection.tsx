import HeroCard from "./HeroCard";
import { useState, useEffect, useRef } from "react";
import { heroCardImgUrl } from "./data/data";

const HeroSection = () => {
  const [number, setNumber] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<number>(1);
  const [paused, setPaused] = useState<boolean>(false);
  const scrollEl = useRef<HTMLDivElement>(null);
  const scroll = () => {
    if (scrollEl.current && !paused) {
      const width = scrollEl.current.clientWidth;
      scrollEl.current.scrollTo({
        left: number * width,
        behavior: "smooth",
      });
    }
  };
  const handleManualScroll = () => {
    if (scrollEl.current && paused) {
      const width = scrollEl.current.clientWidth;
      const newIndex = Math.round(scrollEl.current.scrollLeft / width);
      if (newIndex !== number) {
        setNumber(newIndex);
      }
    }
  };
  useEffect(() => {
    scroll();
  }, [number]);
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setNumber((prev: number) => {
        if (prev == heroCardImgUrl.length - 1) {
          setScrollDirection(-1);
          return prev - 1;
        } else if (prev == 0 && scrollDirection == -1) {
          setScrollDirection(1);
          return prev + 1;
        }
        return prev + scrollDirection;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [number, scrollDirection, paused]);
  return (
    <div
      className=" w-full h-80 relative "
      onMouseEnter={() => setPaused(true)}
      onTouchStart={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        ref={scrollEl}
        className="w-full h-full flex overflow-x-scroll scrollbar-hide  snap-x snap-mandatory"
        onScroll={handleManualScroll}
      >
        {heroCardImgUrl.map((el: string, index: number) => (
          <div key={index} className="w-full h-full  shrink-0 snap-center">
            <HeroCard url={el} />
          </div>
        ))}
      </div>
      <div className="absolute  bottom-4 sm:bottom-8 right-4 sm:right-6 flex gap-2 ">
        {heroCardImgUrl.map((_, index: number) => (
          <span
            key={index}
            className={`w-1 h-1 p-1 rounded-2xl   ${index === number ? "bg-white" : "bg-gray-400/50"} `}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
