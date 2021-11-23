import { createPlayer } from "./domUtils.js";
import { playerOne, playerTwo } from "./players.js";
import { playerAttack, enemyAttack, checkWins } from "./gameFunction.js";
import { generateLogs } from "./logs.js";
import { $divArenas, $formFight } from "./utils.js";

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
