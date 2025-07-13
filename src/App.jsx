import React, { useState, useEffect } from "react";
import MysteryBlocks from "./components/MysteryBlocks";
import GameplayScreen from "./components/GameplayScreen";
import GameplayScreen2 from "./components/GameplayScreen2";
import GameplayScreen3 from "./components/GamePlayScreen3";
import GameplayScreen4 from "./components/GameplayScreen4";
import GameplayScreen5 from "./components/GameplayScreen5";
import GameplayScreen6 from "./components/GameplayScreen6";
import GameplayScreen7 from "./components/GameplayScreen7";
import GameplayScreen8 from "./components/GameplayScreen8";
import GameplayScreen9 from "./components/GameplayScreen9";
import NextPage from "./components/NextPage";
import NextPage2 from "./components/NextPage2";
import NextPage3 from "./components/NextPage3";
import NextPage4 from "./components/NextPage4";
import NextPage5 from "./components/NextPage5";
import NextPage6 from "./components/NextPage6";
import NextPage7 from "./components/NextPage7";
import NextPage8 from "./components/NextPage8";
import NextPage9 from "./components/NextPage9";
import Astronaut from "./components/Astronaut";
import FinalPage from "./components/FinalPage";

// Simple background configuration
const backgroundConfig = {
  fromColor: "#00023f",
  toColor: "#6B6981",
  starColor: "white",
  gradientFrom: "from-[#00023f]",
  gradientTo: "to-[#6B6981]",
};

function App() {
  const [currentScreen, setCurrentScreen] = useState("mysteryBlocks");
  const [boxNumber, setBoxNumber] = useState(1);

  // Handle automated transitions
  useEffect(() => {
    let timer;

    // Handle transitions after NextPage screens
    if (currentScreen.startsWith("nextPage") && currentScreen !== "nextPage9") {
      timer = setTimeout(() => {
        setCurrentScreen("astronaut");
      }, 1000);
    }
    // Special case for NextPage9
    else if (currentScreen === "nextPage9") {
      timer = setTimeout(() => {
        setCurrentScreen("astronaut");
      }, 1000);
    }
    // Handle transitions after Astronaut screen
    else if (currentScreen === "astronaut") {
      timer = setTimeout(() => {
        if (boxNumber < 9) {
          // Go to next gameplay screen
          setCurrentScreen(`gameplay${boxNumber + 1}`);
          setBoxNumber(boxNumber + 1);
        } else {
          // If we've completed the 9th box, go to final page
          setCurrentScreen("finalPage");
        }
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [currentScreen, boxNumber]);

  // Handles user selecting the correct answer
  const handleCorrectSelection = () => {
    // When user selects right answer in a gameplay screen
    let nextScreen;

    // Different nextPage based on current gameplay screen
    if (currentScreen === "gameplay") {
      nextScreen = "nextPage";
    } else if (currentScreen === "gameplay2") {
      nextScreen = "nextPage2";
    } else if (currentScreen === "gameplay3") {
      nextScreen = "nextPage3";
    } else if (currentScreen === "gameplay4") {
      nextScreen = "nextPage4";
    } else if (currentScreen === "gameplay5") {
      nextScreen = "nextPage5";
    } else if (currentScreen === "gameplay6") {
      nextScreen = "nextPage6";
    } else if (currentScreen === "gameplay7") {
      nextScreen = "nextPage7";
    } else if (currentScreen === "gameplay8") {
      nextScreen = "nextPage8";
    } else if (currentScreen === "gameplay9") {
      nextScreen = "nextPage9";
    }

    setCurrentScreen(nextScreen);
  };

  // Handle Try Again click on final page
  const handleTryAgain = () => {
    setCurrentScreen("mysteryBlocks");
    setBoxNumber(1); // Reset box number
  };

  // Render method with simplified background
  return (
    <div
      className={`App h-screen w-screen bg-gradient-to-b ${backgroundConfig.gradientFrom} ${backgroundConfig.gradientTo}`}
      style={{
        backgroundColor: backgroundConfig.fromColor,
      }}
    >
      {currentScreen === "mysteryBlocks" ? (
        <MysteryBlocks
          onPlayNow={() => setCurrentScreen("gameplay")}
          currentBackground={backgroundConfig}
        />
      ) : currentScreen === "gameplay" ? (
        <GameplayScreen
          onCorrectAnswer={handleCorrectSelection}
          currentBackground={backgroundConfig}
        />
      ) : currentScreen === "gameplay2" ? (
        <GameplayScreen2
          onCorrectAnswer={handleCorrectSelection}
          currentBackground={backgroundConfig}
        />
      ) : currentScreen === "gameplay3" ? (
        <GameplayScreen3
          onCorrectAnswer={handleCorrectSelection}
          currentBackground={backgroundConfig}
        />
      ) : currentScreen === "gameplay4" ? (
        <GameplayScreen4
          onCorrectAnswer={handleCorrectSelection}
          currentBackground={backgroundConfig}
        />
      ) : currentScreen === "gameplay5" ? (
        <GameplayScreen5
          onCorrectAnswer={handleCorrectSelection}
          currentBackground={backgroundConfig}
        />
      ) : currentScreen === "gameplay6" ? (
        <GameplayScreen6
          onCorrectAnswer={handleCorrectSelection}
          currentBackground={backgroundConfig}
        />
      ) : currentScreen === "gameplay7" ? (
        <GameplayScreen7
          onCorrectAnswer={handleCorrectSelection}
          currentBackground={backgroundConfig}
        />
      ) : currentScreen === "gameplay8" ? (
        <GameplayScreen8
          onCorrectAnswer={handleCorrectSelection}
          currentBackground={backgroundConfig}
        />
      ) : currentScreen === "gameplay9" ? (
        <GameplayScreen9
          onCorrectAnswer={handleCorrectSelection}
          currentBackground={backgroundConfig}
        />
      ) : currentScreen === "nextPage" ? (
        <NextPage currentBackground={backgroundConfig} />
      ) : currentScreen === "nextPage2" ? (
        <NextPage2 currentBackground={backgroundConfig} />
      ) : currentScreen === "nextPage3" ? (
        <NextPage3 currentBackground={backgroundConfig} />
      ) : currentScreen === "nextPage4" ? (
        <NextPage4 currentBackground={backgroundConfig} />
      ) : currentScreen === "nextPage5" ? (
        <NextPage5 currentBackground={backgroundConfig} />
      ) : currentScreen === "nextPage6" ? (
        <NextPage6 currentBackground={backgroundConfig} />
      ) : currentScreen === "nextPage7" ? (
        <NextPage7 currentBackground={backgroundConfig} />
      ) : currentScreen === "nextPage8" ? (
        <NextPage8 currentBackground={backgroundConfig} />
      ) : currentScreen === "nextPage9" ? (
        <NextPage9 currentBackground={backgroundConfig} />
      ) : currentScreen === "astronaut" ? (
        <Astronaut currentBackground={backgroundConfig} />
      ) : currentScreen === "finalPage" ? (
        <FinalPage
          onTryAgain={handleTryAgain}
          currentBackground={backgroundConfig}
        />
      ) : null}
    </div>
  );
}

export default App;
