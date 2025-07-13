import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Volume2, VolumeX } from "lucide-react";
import cloud from "../assets/Group 53.png";
import rectengle from "../assets/Rectangle 4238.png";
import patternImage from "../assets/pattern.png";
import WrongImg from "../assets/wrongAns.png";

const GameplayScreen = ({ onCorrectAnswer, currentBackground }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showWrongPage, setShowWrongPage] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [bgAudio, setBgAudio] = useState(null);
  const [soundEffects, setSoundEffects] = useState(null);

  // Initialize audio on component mount
  useEffect(() => {
    // Create audio functionality using Tone.js
    const initAudio = async () => {
      // Import Tone dynamically
      const Tone = await import("tone");

      // Create background synth for gameplay screen
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      synth.volume.value = -12; // Lower volume

      // Create pattern for gameplay
      const bgPattern = new Tone.Pattern(
        (time, note) => {
          synth.triggerAttackRelease(note, "8n", time);
        },
        ["G3", "D4", "G4", "B4", "G4", "D4", "A3", "C4"],
        "upDown"
      );

      // Set timing
      Tone.Transport.bpm.value = 120;

      // Store background music control in state
      setBgAudio({
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

      // Create sound effects
      const correctSynth = new Tone.Synth({
        oscillator: { type: "triangle" },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 0.5 },
      }).toDestination();
      correctSynth.volume.value = -8;

      const wrongSynth = new Tone.Synth({
        oscillator: { type: "sawtooth" },
        envelope: { attack: 0.01, decay: 0.3, sustain: 0.1, release: 0.2 },
      }).toDestination();
      wrongSynth.volume.value = -8;

      const selectionSynth = new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0.05, release: 0.1 },
      }).toDestination();
      selectionSynth.volume.value = -10;

      // Store sound effects in state
      setSoundEffects({
        correct: () => {
          const now = Tone.now();
          correctSynth.triggerAttackRelease("C5", "16n", now);
          correctSynth.triggerAttackRelease("E5", "16n", now + 0.1);
          correctSynth.triggerAttackRelease("G5", "8n", now + 0.2);
        },
        wrong: () => {
          const now = Tone.now();
          wrongSynth.triggerAttackRelease("E4", "16n", now);
          wrongSynth.triggerAttackRelease("Eb4", "8n", now + 0.1);
        },
        select: () => {
          selectionSynth.triggerAttackRelease("G4", "32n");
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

  // Start audio when available
  useEffect(() => {
    if (bgAudio && audioEnabled) {
      bgAudio.start();
    } else if (bgAudio && !audioEnabled) {
      bgAudio.stop();
    }
  }, [bgAudio, audioEnabled]);

  // Toggle audio
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    // Play selection sound
    if (audioEnabled && soundEffects) {
      soundEffects.select();
    }

    // Check if the selected option is correct
    if (option === 1) {
      // Play correct sound and call the handler
      if (audioEnabled && soundEffects) {
        soundEffects.correct();
      }
      // Call the parent component's handler for correct answer
      onCorrectAnswer();
    } else {
      // Play wrong sound and show wrong page
      if (audioEnabled && soundEffects) {
        soundEffects.wrong();
      }
      // Show the wrong page if the answer is incorrect
      setShowWrongPage(true);
      setTimeout(() => {
        setShowWrongPage(false); // Hide wrong page after a brief delay
        setSelectedOption(null); // Reset selection so user can try again
      }, 1000);
    }
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
          <h1 className="text-3xl mb-2 font-extrabold text-white">
            🎮 Mystery Blocks 🎮
          </h1>

          {/* Question */}
          <h2 className="text-lg mt-4 mb-3">Which shape is this?</h2>

          {/* Shape display Square */}
          <div className="w-24 h-24 bg-white mb-4"></div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-4">
            {[
              { id: 1, text: "Square" },
              { id: 2, text: "Triangle" },
              { id: 3, text: "Circle" },
              { id: 4, text: "Oval" },
            ].map((option) => (
              <button
                key={option.id}
                className={`relative py-3 px-6 rounded-lg text-lg font-bold uppercase tracking-widest transition-all duration-300 border-2 shadow-md transform active:scale-95 overflow-hidden 
                    ${
                      selectedOption === option.id
                        ? "bg-gradient-to-r from-purple-500 to-indigo-600 border-white text-white shadow-indigo-500/50"
                        : "bg-gray-800 border-gray-600 text-gray-300 sm:hover:bg-gradient-to-r sm:hover:from-purple-500 sm:hover:to-blue-500 sm:hover:text-white sm:hover:border-white"
                    }`}
                onClick={() => handleOptionSelect(option.id)}
                onTouchStart={(e) => {
                  if (window.innerWidth <= 430 && e.currentTarget) {
                    e.currentTarget.classList.add(
                      "bg-gradient-to-r",
                      "from-purple-500",
                      "to-blue-500",
                      "text-white",
                      "border-white"
                    );
                  }
                }}
                onTouchEnd={(e) => {
                  if (window.innerWidth <= 430 && e.currentTarget) {
                    setTimeout(
                      () =>
                        e.currentTarget.classList.remove(
                          "bg-gradient-to-r",
                          "from-purple-500",
                          "to-blue-500",
                          "text-white",
                          "border-white"
                        ),
                      400
                    );
                  }
                }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-transparent to-gray-900 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                <span className="relative z-10">
                  {option.id}. {option.text}
                </span>
              </button>
            ))}
          </div>

          {/* If wrong answer selected, show the WrongPage */}
          {showWrongPage && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-black bg-opacity-20 z-20">
              <div className="text-3xl font-bold mb-10">
                Wrong Answer! Try Again.
              </div>
              <div className="mb-70 h-60 w-60">
                <img src={WrongImg} alt="Wrong Answer" />
              </div>
            </div>
          )}

          {/* Mystery blocks grid */}
          <div className="grid grid-cols-3 gap-1 mb-8">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 bg-white"
                style={{
                  backgroundImage: `url(${patternImage})`,
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Bottom Rockets */}
        <div className="relative w-full z-10">
          {/* Left Rocket */}
          <motion.div
            className="absolute left-[-2%] bottom-48"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <img src={rectengle} alt="Rectangle" />
          </motion.div>
          {/* Right Rocket */}
          <motion.div
            className="absolute right-[-10%] bottom-48"
            animate={{ y: [0, -20, 0] }}
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

export default GameplayScreen;
