import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ACTIVE_MONSTER, GET_ALL_MONSTERS } from "../utils/queries";
import { SAVE_MONSTER } from "../utils/mutations";

import { useNavigate } from "react-router-dom";

import Modal from "../components/RPSModal";

import DungeonBG from "../assets/dungeon-bg.png";
import HeartContainer from "../assets/heart-container.svg";

const Dungeon = () => {
  const navigate = useNavigate();
  const { loading: loadingActive, data: dataActive } =
    useQuery(GET_ACTIVE_MONSTER);
  const { loading: loadingAll, data: dataAll } = useQuery(GET_ALL_MONSTERS);
  const [saveMonsterMutation] = useMutation(SAVE_MONSTER);

  const [isOpen, setIsOpen] = useState(false);
  const [isBoss, setIsBoss] = useState(false);
  const [round, setRound] = useState(1);
  const [life, setLife] = useState(3);
  const [monsterLife, setMonsterLife] = useState(3);
  const [winloss, setWinLoss] = useState("");
  const [playerChoice, setPlayerChoice] = useState(null);
  const [monsterChoice, setMonsterChoice] = useState(null);
  const choices = ["rock", "paper", "scissors"];
  const [enemyMon, setEnemyMon] = useState("");
  const [enemyBoss, setEnemyBoss] = useState("");
  const [bossToCapture, setBossToCapture] = useState("");
  const [isCapture, setIsCapture] = useState("fail");

  // Function to open Modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Function to close Modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // On Lose, pressing Okay takes you to the home page
  const onClickLoseHandler = () => {
    navigate("/Home");
  };

  // On Win, pressing Continues resets game values to default and sets boss encounter to true.
  const continueHandler = () => {
    setIsBoss(true);
    setLife(3);
    setMonsterLife(3);
    closeModal();
  };

  // Function to handle the capture of the monster
  const handleCapture = async () => {
    const random = Math.random();
    setIsCapture("success");
    if (random > 0.5) {
      // console.log("Monster Captured");
      // console.log(bossToCapture);
      await saveMonsterMutation({
        variables: {
          _id: bossToCapture._id,
          name: bossToCapture.name,
          image: bossToCapture.image,
        },
      });
      window.location.replace("/closet");
    } else {
      // console.log("Monster Escaped");
      navigate("/home");
    }
  };

  // When a player selects rock, paper or scissors, runs a function that gives both the player and monster a choice
  const handlePlayerChoice = (choice) => {
    const monsterChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setMonsterChoice(monsterChoice);
    handleWinLoss(choice, monsterChoice);
  };

  // If the player's choice results in any of the combinations below, it is a win. If the player's choice is the same as the monster's choice, it is also a win.
  // Winning sets the round to win and updates the state to reflect the win.
  const handleWinLoss = (playerChoice, monsterChoice) => {
    if (
      (playerChoice === "rock" && monsterChoice === "scissors") ||
      (playerChoice === "paper" && monsterChoice === "rock") ||
      (playerChoice === "scissors" && monsterChoice === "paper")
    ) {
      setWinLoss("win");
      // console.log("You Win");
    } else if (playerChoice === monsterChoice) {
      setWinLoss("win");
      // console.log("You Win");
    } else {
      setWinLoss("loss");
      // console.log("You Lose");
    }
  };

  // UseEffect to run the game logic
  // When a player clicks on a choice, the game logic runs to determine if the player wins or loses.
  useEffect(() => {
    const game = () => {
      if (winloss === "win") {
        // Is where logic for trash mob + boss fight goes
        setRound(round + 1);
        setMonsterLife(monsterLife - 1);
        setWinLoss("");
      } else if (winloss === "loss") {
        setWinLoss("");
        setLife(life - 1);
      }
    };

    // If the player's life reaches 0, the game is over and the player loses.
    if (life === 0) {
      // console.log("Game Over you have lost");
      openModal();

      // If the monster's life reaches 0, the player wins against the first encounter.
    } else if (monsterLife === 0) {
      // Here is where logic for capture monster goes
      // console.log("id of the monster to capture");
      openModal();
    }

    // console.log("life", life);
    // console.log("monsterLife", monsterLife);
    // console.log("round", round);
    game();
  }, [winloss]);

  // Function to display the player's life in hearts
  const lifeBar = (lifeCount) => {
    const hearts = [];
    for (let i = 0; i < lifeCount; i++) {
      hearts.push(i);
    }

    return hearts;
  };

  // Randomly select enemy Monster from array of monsters
  useEffect(() => {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max.length);
    }

    if (!loadingAll && dataAll?.allMonsters) {
      const randomIndexLow = getRandomInt(dataAll.allMonsters);
      const randomIndexHigh = getRandomInt(dataAll.allMonsters);
      const randomMonster = dataAll?.allMonsters[randomIndexLow];
      const randomBoss = dataAll?.allMonsters[randomIndexHigh];
      setEnemyMon(randomMonster.image);
      setEnemyBoss(randomBoss.image);
      setBossToCapture(randomBoss);
      // console.log(randomBoss);
    }
  }, [loadingAll, dataAll]);

  const activeMonster = dataActive?.me?.activeMonster || "";

  return (
    <div className="2xl:w-full 2xl:h-full">
      <div className="2xl:h-[620px] 2xl:items-center">
        {/* Modal for Winning/Losing RPS game */}
        {monsterLife === 0 ? (
          <Modal isOpen={isOpen} onClose={closeModal}>
            <div className="2xl:bg-slate-800 2xl:fixed 2xl:flex 2xl:flex-col 2xl:w-screen 2xl:h-screen 2xl:m-auto 2xl:justify-center 2xl:items-center 2xl:z-20 2xl:bg-opacity-90 2xl:backdrop-blur-sm">
              <div className="2xl:bg-slate-900 2xl:w-[350px] 2xl:h-[400px] 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:mx-auto 2xl:items-center 2xl:rounded-2xl">
                <h1 className="2xl:text-white 2xl:text-2xl 2xl:font-bold">You Win!</h1>
                <p className="2xl:mx-8 2xl:my-4 2xl:text-white 2xl:text-center">
                  You beat the monster! Move to the boss?
                </p>
                <div className="2xl:space-x-4">
                  {" "}
                  <button
                    className="2xl:bg-green-800 2xl:text-white 2xl:font-bold 2xl:px-4 2xl:py-[5px] 2xl:rounded-lg"
                    // Handles Capture or Continue
                    onClick={isBoss ? handleCapture : continueHandler}
                  >
                    {isBoss ? "CAPTURE" : "CONTINUE"}
                  </button>
                  <button
                    className="2xl:bg-red-800 2xl:text-white 2xl:font-bold 2xl:px-4 2xl:py-[5px] 2xl:rounded-lg"
                    onClick={onClickLoseHandler}
                  >
                    HOME
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        ) : (
          <Modal isOpen={isOpen} onClose={closeModal}>
            <div className="2xl:bg-slate-800 2xl:fixed 2xl:flex 2xl:flex-col 2xl:w-screen 2xl:h-screen 2xl:m-auto 2xl:justify-center 2xl:items-center 2xl:z-20 2xl:bg-opacity-90 2xl:backdrop-blur-sm">
              <div className="2xl:bg-slate-900 2xl:w-[350px] 2xl:h-[400px] 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:mx-auto 2xl:items-center 2xl:rounded-2xl">
                <h1 className="2xl:text-white 2xl:text-2xl 2xl:font-bold">Lose</h1>
                <p className="2xl:mx-8 2xl:my-4 2xl:text-white 2xl:text-center">
                  You hurry back to your room with your injured friend!
                </p>
                <button
                  className="2xl:bg-green-800 2xl:text-white 2xl:font-bold 2xl:px-4 2xl:py-[5px] 2xl:rounded-lg"
                  onClick={onClickLoseHandler}
                >
                  OKAY
                </button>
              </div>
            </div>
          </Modal>
        )}

        <img
          src={DungeonBG}
          alt="Dungeon Background"
          className="fixed w-full h-full object-cover overflow-hidden -z-50"
        />
        <div className="space-y-4 flex flex-col mx-auto items-center relative top-32">
          <div className="monsters w-[300px] h-[250px]">
            {/* Monster Div */}
            <div className="flex flex-row items-center">
              {lifeBar(monsterLife).map((hearts, i) => (
                <div key={i} className="w-[40px] h-[40px] mx-2">
                  <img
                    src={HeartContainer}
                    alt="Heart"
                    className="w-[50px] h-[50px]"
                  />
                </div>
              ))}
              <img
                src={isBoss ? enemyBoss : enemyMon}
                alt="Bozo One"
                className="w-[125px] h-[125px]"
              />
            </div>
            {/* Player Div */}
            <div className="2xl:flex 2xl:flex-row 2xl:items-center 2xl:space-x-4">
              <img
                src={activeMonster.image}
                alt={activeMonster.name}
                className="2xl:w-[125px] 2xl:h-[125px]"
              />
              <div className="flex">
                {lifeBar(life).map((hearts, i) => (
                  <div key={i} className="2xl:w-[40px] 2xl:h-[40px] 2xl:mx-2">
                    <img
                      src={HeartContainer}
                      alt="Heart"
                      className="2xl:w-[50px] 2xl:h-[50px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Menu Div */}
          <div className="2xl:rps 2xl:flex 2xl:flex-row 2xl:flex-wrap 2xl:mx-auto 2xl:items-center 2xl:justify-center 2xl:w-[350px] 2xl:h-[200px] 2xl:[background:rgba(2,48,71,0.75)] 2xl:rounded-[25px] 2xl:border-[5px] 2xl:border-solid 2xl:border-[#E9BA14] 2xl:space-x-2">
            <button
              className="2xl:w-[100px] 2xl:h-[50px] 2xl:shrink-0  2xl:[background:#FFB703] 2xl:shadow-[0px_4px_42px_0px_rgba(0,0,0,0.25)] 2xl:rounded-[10px] 2xl:text-white 2xl:text-xl 2xl:font-bold"
              onClick={() => handlePlayerChoice("paper")}
            >
              ROCK
            </button>
            <button
              className="2xl:w-[100px] 2xl:h-[50px] 2xl:shrink-0  2xl:[background:#FFB703] 2xl:shadow-[0px_4px_42px_0px_rgba(0,0,0,0.25)] 2xl:rounded-[10px] 2xl:text-white 2xl:text-xl 2xl:font-bold"
              onClick={() => handlePlayerChoice("paper")}
            >
              PAPER
            </button>
            <button
              className="2xl:w-[100px] 2xl:h-[50px] 2xl:shrink-0  2xl:[background:#FFB703] 2xl:shadow-[0px_4px_42px_0px_rgba(0,0,0,0.25)] 2xl:rounded-[10px] 2xl:text-white 2xl:text-xl 2xl:font-bold"
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
