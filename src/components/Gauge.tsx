import { UtilsManager } from "@/lib/UtilsManager";
import { useEffect, useRef, useState, type FC } from "react";

const Gauge: FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [rotateDeg, setRotateDeg] = useState<number>(0);
  
  useEffect(() => {
    (async () => {
      while (true) {
        await UtilsManager.sleep();
        setRotateDeg(
          Number(Number.parseFloat(Math.random().toString()).toFixed(2)) * 100
        );
      }
    })();
  }, []);

  return (
    <>
    <div className="relative">

      <div className="relative h-52 max-h-112 w-104 rounded-t-full bg-gray-500 text-black overflow-hidden">
        <div
          className="absolute top-52 h-104 w-104 origin-center origin-top rotate-180 duration-200 ease-in-out"
          style={{
            background: "linear-gradient(0.25turn, red, orange, green)",
          }}
        ></div>
        <div
          className="absolute top-52 h-120 w-120 -left-7 origin-center origin-top  duration-200 ease-in-out"
          style={{
            background: "gray",
            transform: `rotate(${Math.min(360, 180 + rotateDeg)}deg)`,
          }}
        ></div>
        <div className="w-88 h-88 absolute top-8 left-8 rounded-full bg-white"></div>
        <div
          ref={elementRef}
          className="absolute top-43 left-30 origin-right h-8 w-24 duration-200 ease-in-out"
          style={{
            clipPath: "polygon(100% 0%, 100% 100%, 0% 75%, 0% 25%)",
            background: "linear-gradient(0.25turn, black 50%, transparent)",
            transform: `rotate(${rotateDeg}deg)`,
          }}
        ></div>
      </div>
        <span className="absolute -left-5 font-semibold">Under Priced</span>
        <span className="absolute -top-7 left-42 font-semibold">Fairly Priced</span>
        <span className="absolute -right-5 font-semibold">Overpriced</span>
    </div>
    </>
  );
};

export default Gauge;
