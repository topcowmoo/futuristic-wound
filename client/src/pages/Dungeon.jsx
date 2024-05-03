import { useState, useEffect } from "react";

import DungeonBG from "../assets/dungeon-bg.png";
import BozoOne from "../assets/psucky.svg";
import BozoTwo from "../assets/plucky.svg";

const Dungeon = () => {
  const [round, setRound] = useState(1);
  const [life, setLife] = useState(3);
  const [winloss, setWinLoss] = useState("");
  const [playerChoice, setPlayerChoice] = useState(null);
  const [monsterChoice, setMonsterChoice] = useState(null);
  const choices = ["rock", "paper", "scissors"];

  const handlePlayerChoice = (choice) => {
    const monsterChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setMonsterChoice(monsterChoice);
    handleWinLoss(choice, monsterChoice);
  };

  const handleWinLoss = (playerChoice, monsterChoice) => {
    if (
      (playerChoice === "rock" && monsterChoice === "scissors") ||
      (playerChoice === "paper" && monsterChoice === "rock") ||
      (playerChoice === "scissors" && monsterChoice === "paper") ||
      playerChoice === monsterChoice
    ) {
      setWinLoss("win");
      console.log("You Win");
    } else {
      setWinLoss("loss");
      console.log("You Lose");
    }
  };

  // Fight Logic
  // Set the round
  // Round 1 Play the game normal -> function(isRoundOver) +1 Round
  // When you win against first fight > Instead of redirecting to home page redirect to the next fight with boss
  // Round 2 Play the boss fight
  // If number is greater than 2 redirect back to the adventure page
  // else continue to the next round

  useEffect(() => {
    const game = () => {
      if (winloss === "win") {
        // Is where logic for trash mob + boss fight goes
        setRound(round + 1);
        setWinLoss("");
      } else if (winloss === "loss") {
        setWinLoss("");
        setLife(life - 1);
      }
    };

    if (life === 0) {
      console.log("Game Over you have lost");
      window.location.replace("/home");
    } else if (round === 3) {
      // Here is where logic for capture monster goes
      console.log("id of the monster to capture");
      window.location.replace("/home");
    }

    console.log("life", life);
    console.log("round", round);
    game();
  }, [winloss]);

  const lifeBar = () => {
    const hearts = [];
    for (let i = 0; i < life; i++) {
      hearts.push(i);
    }

    return hearts;
  };

  return (
    <div className="w-full h-full">
      <div className="h-[625px] items-center">
        <img
          src={DungeonBG}
          alt="Dungeon Background"
          className="fixed w-full h-full object-cover overflow-hidden -z-50"
        />
        <div className="space-y-4 flex flex-col mx-auto items-center relative top-32">
          <div className="monsters w-[300px] h-[250px]">
            <img
              src={BozoOne}
              alt="Bozo One"
              className="relative left-[175px] w-[125px] h-[125px]"
            />
            <div>
              <img
                src={BozoTwo}
                alt="Bozo Two"
                className="w-[125px] h-[125px]"
              />
              <div className="flex">
                {lifeBar().map((heart, i) => (
                  <div key={i} className="w-[30px] h-[30px]  ">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                      alt="Heart"
                      className="w-[50px] h-[50px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rps flex flex-row flex-wrap mx-auto items-center justify-center w-[350px] h-[200px] [background:rgba(2,48,71,0.75)] rounded-[25px] border-[5px] border-solid border-[#E9BA14] space-x-2">
            <button
              className="w-[100px] h-[50px] shrink-0  [background:#FFB703] shadow-[0px_4px_42px_0px_rgba(0,0,0,0.25)] rounded-[10px] text-white text-xl font-bold"
              onClick={() => handlePlayerChoice("rock")}
            >
              ROCK
            </button>
            <button
              className="w-[100px] h-[50px] shrink-0  [background:#FFB703] shadow-[0px_4px_42px_0px_rgba(0,0,0,0.25)] rounded-[10px] text-white text-xl font-bold"
              onClick={() => handlePlayerChoice("paper")}
            >
              PAPER
            </button>
            <button
              className="w-[100px] h-[50px] shrink-0  [background:#FFB703] shadow-[0px_4px_42px_0px_rgba(0,0,0,0.25)] rounded-[10px] text-white text-xl font-bold"
              onClick={() => handlePlayerChoice("scissors")}
            >
              SCISSORS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dungeon;
