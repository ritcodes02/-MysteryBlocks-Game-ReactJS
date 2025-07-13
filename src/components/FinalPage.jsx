import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import cloud from "../assets/Group 53.png";
import rectengle from "../assets/Rectangle 4238.png";
import ReactAudioPlayer from "react-audio-player";
import WrongImg from "../assets/wrongAns.png";

const FinalPage = ({ onTryAgain, currentBackground }) => {
  return (
    <div
      className="flex flex-col items-center h-screen w-screen relative"
      style={{
        transition: "background 0.5s ease-in-out",
      }}
    >
      <ReactAudioPlayer
        src="win.mp3"
        autoPlay
        loop
        style={{ display: "none" }}
      />
      {/* Dull overlay */}
      <div className="absolute inset-0 bg-black opacity-10"></div>

      {/* Stars */}
      {[...Array(19)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: `${Math.random() * 70}%`,
            left: `${Math.random() * 90}%`,
            color: currentBackground.starColor,
          }}
        >
          <Star
            size={16}
            fill={currentBackground.starColor}
            stroke={currentBackground.starColor}
          />
        </div>
      ))}
      <div
        className={`relative flex flex-col items-center h-screen overflow-hidden text-white`}
      >
        {/* Main content */}
        <div className="z-10 flex flex-col px-12 items-center justify-center flex-1 mt-32 text-center">
          <h1 className="text-3xl mb-5 font-extrabold text-white">
            🎮 Mystery Blocks 🎮
          </h1>
          <h2 className="text-4xl font-bold text-green-500 mb-2 animate-bounce">
            🎉 You Win! 🎉
          </h2>
          <h3 className="text-xl font-semibold text-gray-300 mb-20 italic">
            Congratulations, Champion! 🏆
          </h3>
          <div className="mb-2 mt-10 h-60 w-65">
            <img src={WrongImg} alt="Wrong Answer" />
          </div>
          <div className="flex gap-4">
            <button
              className="px-6 py-3 mt-10 mb-2 text-lg font-bold text-white rounded-xl bg-[#fb2808bf] hover:bg-[#ce0a0a]"
              onClick={onTryAgain}
            >
              Try again
            </button>
            <button className="px-6 py-3 mt-10 mb-2 text-lg font-bold text-white rounded-xl bg-[#fb2808bf] hover:bg-[#ce0a0a]">
              Next
            </button>
          </div>
        </div>

        {/* Bottom Rockets */}
        <div className="relative w-full">
          {/* Left Rocket */}
          <motion.div
            className="absolute left-[-20px] bottom-40"
            animate={{ y: [100, -350, 100] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <img src={rectengle} alt="Rectangle" />
          </motion.div>

          {/* Right Rocket */}
          <motion.div
            className="absolute right-[-50px] bottom-40"
            animate={{ y: [100, -350, 100] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <img src={rectengle} alt="Rectangle" />
          </motion.div>

          {/* Clouds */}
          <div className="absolute bottom-0 w-full h-30 bg-gradient-to-t from-gray-200 to-transparent rounded-t-full"></div>
          <div className="w-full">
            <img src={cloud} alt="Cloud" className="w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalPage;
