import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import cloud from "../assets/Group 53.png";
import astronautImg from "../assets/Astronaut.png";
import rectengle from "../assets/Rectangle 4238.png";
import ReactAudioPlayer from "react-audio-player";

const Astronaut = ({ currentBackground }) => {
  return (
    <div
      className="flex flex-col items-center h-screen w-screen relative"
      style={{
        transition: "background 0.5s ease-in-out",
      }}
    >
      <ReactAudioPlayer
        src="correct.mp3"
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
        <div className="z-10 flex flex-col px-20 items-center justify-center flex-1 mt-32 text-center">
          <h1 className="text-4xl mb-120 font-extrabold text-white">
            🎮 Correct! 🎮
          </h1>
          <motion.div
            className="relative"
            animate={{ y: [0, -380, 0], scale: [1, 1.5, 1] }}
            transition={{ duration: 2 }}
          >
            <img src={astronautImg} alt="Astronaut" className="w-32 h-32" />
          </motion.div>
        </div>
        {/* Bottom Rockets */}
        <div className="relative w-full">
          {/* Left Rocket */}
          <motion.div
            className="absolute left-1 bottom-48"
            animate={{ y: [100, -350, 100] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <img src={rectengle} alt="Rectangle" />
          </motion.div>

          {/* Right Rocket */}
          <motion.div
            className="absolute right-[-40px] bottom-48"
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

export default Astronaut;
