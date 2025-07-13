import React, { useState } from "react";
import Confetti from "react-confetti";
import { Star } from "lucide-react";
import cloud from "../assets/Group 53.png";
import rectengle from "../assets/Rectangle 4238.png";
import Moon09Img from "../assets/moon09.png";

const NextPage9 = ({ currentBackground }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleWin = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

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
            fill={currentBackground.starColor}
            stroke={currentBackground.starColor}
            style={{ display: "inline-block" }}
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

          {/* Shape display Square */}
          <div className="w-24 h-24 bg-white mb-8"></div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-10">
            <button
              className="text-gray-400 ml-12 font-bold"
              onClick={handleWin}
            >
              1. Square 🎉
            </button>
            <button className="text-gray-400  font-bold">2. Triangle </button>
            <button className="text-gray-400 ml-12 font-bold">3. Circle</button>
            <button className="text-gray-400  font-bold">4. Oval</button>
          </div>

          {/* Mystery blocks grid */}
          <div className="items-center justify-center mb-8">
            <img src={Moon09Img} alt="Moon" />
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

export default NextPage9;
