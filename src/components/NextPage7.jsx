import React from "react";
import { Star } from "lucide-react";
import cloud from "../assets/Group 53.png";
import rectengle from "../assets/Rectangle 4238.png";
import patternImage from "../assets/pattern.png";
import MoonImg from "../assets/moon1.png";
import Moon02Img from "../assets/moon02.png";
import Moon03Img from "../assets/moon03.png";
import Moon04Img from "../assets/moon04.png";
import Moon05Img from "../assets/moon05.png";
import Moon06Img from "../assets/moon06.png";
import Moon07Img from "../assets/moon07.png";

const NextPage7 = ({ currentBackground }) => {
  return (
    <div
      className={`flex flex-col items-center h-screen w-screen relative bg-gradient-to-b ${currentBackground.gradientFrom} ${currentBackground.gradientTo}`}
      style={{
        transition: "background 0.5s ease-in-out",
      }}
    >
      {/* Stars */}
      {[...Array(19)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: `${Math.random() * 70}%`,
            left: `${Math.random() * 90}%`,
          }}
        >
          <Star
            size={16}
            fill={currentBackground.starColor} // Explicitly set the fill color for the star
            stroke={currentBackground.starColor} // Explicitly set the stroke color for the star
            style={{ display: "inline-block" }} // Make sure the star behaves like an inline element
          />
        </div>
      ))}

      <div
        className={`relative flex flex-col items-center h-screen overflow-hidden text-white`}
      >
        {/* Main content */}
        <div className="z-10 flex flex-col px-10 items-center justify-center flex-1 mt-32 text-center">
          <h1 className="text-3xl px-2 mb-20 font-extrabold text-white">
            🎮 Mystery Blocks 🎮
          </h1>
          {/* Shape display triangle*/}
          <div className="w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[80px] border-b-white mb-5"></div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-6 w-full max-w-xs mb-10">
            <div className="text-gray-400 ml-12 font-bold">1. Square</div>
            <div className="text-gray-400 font-bold">2. Triangle</div>
            <div className="text-gray-400 ml-12 font-bold">3. Circle</div>
            <div className="text-gray-400 font-bold">4. Oval</div>
          </div>

          {/* Mystery blocks grid */}
          <div className="grid grid-cols-3 gap-1 mb-8">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 bg-white"
                style={{
                  backgroundImage:
                    i === 0
                      ? `url(${MoonImg})`
                      : i === 1
                      ? `url(${Moon02Img})`
                      : i === 2
                      ? `url(${Moon03Img})`
                      : i === 3
                      ? `url(${Moon04Img})`
                      : i === 6
                      ? `url(${Moon05Img})`
                      : i === 7
                      ? `url(${Moon06Img})`
                      : i === 8
                      ? `url(${Moon07Img})`
                      : `url(${patternImage})`,
                }}
              ></div>
            ))}
          </div>
        </div>
        {/* Bottom rockets */}
        <div className="relative w-full">
          <div className="absolute left-1 bottom-48">
            <div className="relative w-50 h-70">
              <img src={rectengle} alt="Rectangle" />
            </div>
          </div>

          <div className="absolute right-[-4rem] bottom-48">
            <div className="relative w-50 h-70">
              <img src={rectengle} alt="Rectangle" />
            </div>
          </div>

          {/* Clouds */}
          <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-gray-200 to-transparent rounded-t-full"></div>
          <div className="w-full">
            <img src={cloud} alt="Cloud" className="w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextPage7;
