// Importing necessary hooks and components from React and other libraries
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ACTIVE_MONSTER, GET_ALL_MONSTERS } from "../utils/queries";
import { SAVE_MONSTER } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import Modal from "../components/RPSModal";
import DungeonBG from "../assets/dungeon-bg.png";
import HeartContainer from "../assets/heart-container.svg";
import Firebolt from "../assets/firebolt.svg";
import Waterbolt from "../assets/waterbolt.svg";
import Earthbolt from "../assets/earthbolt.svg";

// Main component definition
const Dungeon = () => {
  // Initializing hooks and state variables
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
      await saveMonsterMutation({
        variables: {
          _id: bossToCapture._id,
          name: bossToCapture.name,
          image: bossToCapture.image,
        },
      });
      window.location.replace("/closet");
    } else {
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
    } else if (playerChoice === monsterChoice) {
      setWinLoss("win");
    } else {
      setWinLoss("loss");
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
      openModal();

      // If the monster's life reaches 0, the player wins against the first encounter.
    } else if (monsterLife === 0) {
      openModal();
    }

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
    }
  }, [loadingAll, dataAll]);

  const activeMonster = dataActive?.me?.activeMonster || "";

  return (
    <div className="w-full h-full">
      <div className="h-[620px] items-center">
        {/* Modal for Winning/Losing RPS game */}
        {monsterLife === 0 ? (
          <Modal isOpen={isOpen} onClose={closeModal}>
            <div className="bg-slate-800 fixed flex flex-col w-screen h-screen m-auto justify-center items-center z-20 bg-opacity-90 backdrop-blur-sm">
              <div className="bg-slate-900 w-[350px] h-[400px] flex flex-col justify-center mx-auto items-center rounded-2xl">
                <h1 className="text-white text-2xl font-bold">You Win!</h1>
                <p className="mx-8 my-4 text-white text-center">
                  You beat the monster! Move to the boss?
                </p>
                <div className="space-x-4">
                  {" "}
                  <button
                    className="bg-green-800 text-white font-bold px-4 py-[5px] rounded-lg"
                    // Handles Capture or Continue
                    onClick={isBoss ? handleCapture : continueHandler}
                  >
                    {isBoss ? "CAPTURE" : "CONTINUE"}
                  </button>
                  <button
                    className="bg-red-800 text-white font-bold px-4 py-[5px] rounded-lg"
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
            <div className="bg-slate-800 fixed flex flex-col w-screen h-screen m-auto justify-center items-center z-20 bg-opacity-90 backdrop-blur-sm">
              <div className="bg-slate-900 w-[350px] h-[400px] flex flex-col justify-center mx-auto items-center rounded-2xl">
                <h1 className="text-white text-2xl font-bold">Lose</h1>
                <p className="mx-8 my-4 text-white text-center">
                  You hurry back to your room with your injured friend!
                </p>
                <button
                  className="bg-green-800 text-white font-bold px-4 py-[5px] rounded-lg"
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
            <div className="flex flex-row items-center space-x-4">
              <img
                src={activeMonster.image}
                alt={activeMonster.name}
                className="w-[125px] h-[125px]"
              />
              <div className="flex">
                {lifeBar(life).map((hearts, i) => (
                  <div key={i} className="w-[40px] h-[40px] mx-2">
                    <img
                      src={HeartContainer}
                      alt="Heart"
                      className="w-[50px] h-[50px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Menu Div */}
          <div className="rps flex flex-row flex-wrap mx-auto items-center justify-center w-[350px] h-[200px] [background:rgba(2,48,71,0.75)] rounded-[25px] border-[5px] border-solid border-[#E9BA14] space-x-2">
            <button
              className="w-[100px] h-[50px] shrink-0  [background:#FFB703] shadow-[0px_4px_42px_0px_rgba(0,0,0,0.25)] rounded-[10px] text-white text-xl font-bold"
              onClick={() => handlePlayerChoice("paper")}
            >
              <img
                src={Waterbolt}
                alt="Waterbolt"
                className="mx-auto w-[70px]"
              />
            </button>
            <button
              className="w-[100px] h-[50px] shrink-0  [background:#FFB703] shadow-[0px_4px_42px_0px_rgba(0,0,0,0.25)] rounded-[10px] text-white text-xl font-bold"
              onClick={() => handlePlayerChoice("paper")}
            >
              <img src={Firebolt} alt="Firebolt" className="mx-auto w-[70px]" />
            </button>
            <button
              className="w-[100px] h-[50px] shrink-0  [background:#FFB703] shadow-[0px_4px_42px_0px_rgba(0,0,0,0.25)] rounded-[10px] text-white text-xl font-bold"
              onClick={() => handlePlayerChoice("scissors")}
            >
              <img
                src={Earthbolt}
                alt="Earthbolt"
                className="mx-auto w-[70px]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dungeon;
