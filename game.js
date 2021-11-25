import Player from "./players.js";
import { createPlayer } from "./domUtils.js";
import { playerAttack, enemyAttack, checkWins } from "./gameFunction.js";
import { generateLogs } from "./logs.js";
import { $divArenas, $formFight } from "./utils.js";

class Game {
  start = () => {
    const playerOne = new Player({
      player: 1,
      name: "SCORPION",
      hp: 100,
      img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    });

    const playerTwo = new Player({
      player: 2,
      name: "SUB-ZERO",
      hp: 100,
      img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    });

    $formFight.addEventListener("submit", function (e) {
      e.preventDefault();
      const {
        value: enemyValue,
        defence: enemyDefence,
        hit: enemyHit,
      } = enemyAttack();
      const {
        value: attackValue,
        defence: attackDefence,
        hit: attackHit,
      } = playerAttack();

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
    $divArenas.appendChild(createPlayer(playerOne));
    $divArenas.appendChild(createPlayer(playerTwo));
    generateLogs("start", playerOne, playerTwo);
  };
}

export default Game;
