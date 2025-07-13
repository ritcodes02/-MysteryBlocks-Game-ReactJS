import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Volume2, VolumeX } from "lucide-react";
import cloud from "../assets/Group 53.png";
import rectengle from "../assets/Rectangle 4238.png";
import rocket from "../assets/rocket.png";

const MysteryBlocks = ({ onPlayNow, currentBackground }) => {
  // Audio state management
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [bgAudio, setBgAudio] = useState(null);
  const [buttonAudio, setButtonAudio] = useState(null);

  // Initialize audio on component mount
  useEffect(() => {
    // Create background music using Tone.js
    const initAudio = async () => {
      // Import Tone dynamically to prevent server-side rendering issues
      const Tone = await import("tone");

      // Create background synth
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      synth.volume.value = -10; // Lower volume

      // Create background pattern
      const bgPattern = new Tone.Pattern(
        (time, note) => {
          synth.triggerAttackRelease(note, "8n", time);
        },
        ["G3", "B3", "D4", "G4", "B4", "D4", "B3", "G3"],
        "upDown"
      );

      // Set timing
      Tone.Transport.bpm.value = 100;

      // Store pattern in state for later use
      setBgAudio({
        synth: synth,
        pattern: bgPattern,
        start: () => {
          Tone.start();
          Tone.Transport.start();
          bgPattern.start();
        },
        stop: () => {
          bgPattern.stop();
          Tone.Transport.stop();
        },
      });

      // Button click sound
      const buttonSynth = new Tone.Synth({
        oscillator: {
          type: "sine",
        },
        envelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.1,
          release: 0.5,
        },
      }).toDestination();
      buttonSynth.volume.value = -5;

      setButtonAudio({
        play: () => {
          buttonSynth.triggerAttackRelease("C5", "16n");
          setTimeout(() => buttonSynth.triggerAttackRelease("G5", "8n"), 100);
        },
      });
    };

    initAudio();

    // Cleanup on unmount
    return () => {
      if (bgAudio) {
        bgAudio.stop();
      }
    };
  }, []);

  // Toggle audio
  const toggleAudio = () => {
    if (audioEnabled && bgAudio) {
      bgAudio.stop();
    } else if (!audioEnabled && bgAudio) {
      bgAudio.start();
    }
    setAudioEnabled(!audioEnabled);
  };

  // Start audio when user interacts
  useEffect(() => {
    if (bgAudio && audioEnabled) {
      bgAudio.start();
    }
  }, [bgAudio, audioEnabled]);

  // Handle Play Now button click
  const handlePlayNow = () => {
    // Play button sound if audio is enabled
    if (audioEnabled && buttonAudio) {
      buttonAudio.play();
    }

    // Call the original onPlayNow function
    onPlayNow();
  };

  return (
    <div
      className="flex flex-col items-center h-screen w-screen relative"
      style={{
        transition: "background 0.5s ease-in-out",
      }}
    >
      {/* Audio control button */}
      <button
        onClick={toggleAudio}
        className="absolute top-5 right-5 z-20 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 transition-all"
      >
        {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

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
          <h1 className="text-3xl mb-20 font-extrabold text-white">
            🎮 Mystery Blocks 🎮
          </h1>

          {/* Floating Rocket */}
          <motion.div
            className="relative w-50 h-38 mb-8"
            animate={{ scale: [1, 1.8, 1], rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <img src={rocket} alt="Rocket" />
          </motion.div>

          <h2 className="text-xl font-semibold mb-4 text-white">
            Can You Unmask the Mystery?
          </h2>

          <p className="max-w-xs mb-8 text-white">
            Guess the answer correctly, and watch the mystery image slowly come
            to life! Incorrect guesses keep the mystery hidden... How far can
            you go?
          </p>

          {/* Play Now Button with Background Change */}
          <div className="flex flex-col items-center">
            <button
              className="px-5 py-3 mb-5 text-xl font-extrabold text-white uppercase tracking-widest rounded-xl bg-[#fb2808bf] transition-all duration-300 shadow-lg shadow-red-500/50 hover:bg-[#ce0a0a] hover:shadow-red-700/50 transform hover:scale-110 active:scale-95 border-2 border-transparent focus:bg-[#ce0a0a] focus:shadow-red-700/50 focus:ring-2 focus:ring-red-500 hover:border-white"
              onClick={handlePlayNow}
            >
              🚀 Play Now 🚀
            </button>
          </div>
        </div>

        {/* Bottom Rockets */}
        <div className="relative w-full">
          {/* Left Rocket */}
          <motion.div
            className="absolute left-[-15px] bottom-32"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <img src={rectengle} alt="Rocket" />
          </motion.div>

          {/* Right Rocket */}
          <motion.div
            className="absolute right-[-42px] bottom-32"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <img src={rectengle} alt="Rocket" />
          </motion.div>

          {/* Clouds */}
          <div className="absolute bottom-0 w-full h-30 bg-gradient-to-t from-gray-200 to-transparent rounded-t-full"></div>
          <div className="w-full ">
            <img src={cloud} alt="Cloud" className="w-full object-cover" />
          </div>
        </div>
      </div>

      {/* Sound effects for different game actions */}
      <audio
        id="success-sound"
        src="/sounds/success.mp3"
        preload="auto"
      ></audio>
      <audio
        id="failure-sound"
        src="/sounds/failure.mp3"
        preload="auto"
      ></audio>

      {/* Media Queries for Smaller Screens */}
      <style jsx>{`
        @media (max-width: 430px) {
          h1 {
            font-size: 1.5rem;
            margin-bottom: 10px;
          }

          h2 {
            font-size: 1.1rem;
          }

          p {
            max-width: 90%;
            font-size: 0.9rem;
          }

          .w-50 {
            width: 100px;
            height: 80px;
          }

          .z-10 {
            margin-top: 20px;
          }

          .mb-20 {
            margin-bottom: 10px;
          }

          .px-10 {
            padding-left: 5px;
            padding-right: 5px;
          }

          .max-w-xs {
            max-width: 90%;
          }

          /* Play Now Button Adjustments for smaller screens */
          button {
            font-size: 1rem; /* Slightly smaller text */
            padding: 5px 5px; /* Adjusted padding */
            min-width: 140px; /* Minimum width for better consistency */
          }
        }
      `}</style>
    </div>
  );
};

export default MysteryBlocks;
