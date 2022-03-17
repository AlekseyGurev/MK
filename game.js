import Player from "./players.js";
import { createPlayer } from "./domUtils.js";
import { playerAttack, checkWins } from "./gameFunction.js";
import { generateLogs } from "./logs.js";
import { $divArenas, $formFight, getRandom } from "./utils.js";
import { ARENAS } from "./utils.js";

const {
  name: playerOneName,
  hp: playerOneHp,
  img: playerOneImg,
} = JSON.parse(localStorage.getItem("player1"));
const {
  name: playerTwoName,
  hp: playerTwoHp,
  img: playerTwoImg,
} = JSON.parse(localStorage.getItem("player2"));

class Game {
  start = () => {
    const playerOne = new Player({
      player: 1,
      name: playerOneName,
      hp: playerOneHp,
      img: playerOneImg,
    });

    const playerTwo = new Player({
      player: 2,
      name: playerTwoName,
      hp: playerTwoHp,
      img: playerTwoImg,
    });

    $formFight.addEventListener("submit", async (e) => {
      e.preventDefault();
      const { hit, defence } = playerAttack();
      let attakServer;
      await fetch(
        "http://reactmarathon-api.herokuapp.com/api/mk/player/fight",
        {
          method: "POST",
          body: JSON.stringify({ hit, defence }),
        }
      )
        .then((res) => res.json())
        .then((data) => (attakServer = data));

      const {
        value: enemyValue,
        defence: enemyDefence,
        hit: enemyHit,
      } = attakServer.player2;
      const {
        value: attackValue,
        defence: attackDefence,
        hit: attackHit,
      } = attakServer.player1;

      if (attackDefence !== enemyHit) {
        playerOne.changeHp(enemyValue);
        playerOne.renderHP();
        generateLogs("hit", playerOne, playerTwo, enemyValue);
      } else {
        generateLogs("defence", playerTwo, playerOne);
      }
      if (attackHit !== enemyDefence) {
        playerTwo.changeHp(attackValue);
        playerTwo.renderHP();
        generateLogs("hit", playerTwo, playerOne, attackValue);
      } else {
        generateLogs("defence", playerOne, playerTwo);
      }
      checkWins(playerOne, playerTwo);
    });
    $divArenas.style.backgroundImage = `url(${
      ARENAS[getRandom(ARENAS.length - 1)]
    })`;
    $divArenas.appendChild(createPlayer(playerOne));
    $divArenas.appendChild(createPlayer(playerTwo));
    generateLogs("start", playerOne, playerTwo);
  };
}

export default Game;
