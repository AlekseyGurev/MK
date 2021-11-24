import { HIT, ATTACK, $formFight, $divArenas, getRandom } from "./utils.js";
import { generateLogs } from "./logs.js";
import { createReloadButton, playerWins } from "./domUtils.js";

export const playerAttack = () => {
  const attack = {};
  for (let item of $formFight) {
    if (item.checked && item.name === "hit") {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }
    if (item.checked && item.name === "defence") {
      attack.defence = item.value;
    }
    item.checked = false;
  }
  return attack;
};

export const enemyAttack = () => {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
};

export const checkWins = (playerOne, playerTwo) => {
  const { hp: hpPlayerOne, name: namePlayerOne } = playerOne;
  const { hp: hpPlayerTwo, name: namePlayerTwo } = playerTwo;
  if (hpPlayerOne === 0 && hpPlayerOne < hpPlayerTwo) {
    $divArenas.appendChild(playerWins(namePlayerTwo));
    generateLogs("end", playerTwo, playerOne);
  } else if (hpPlayerTwo === 0 && hpPlayerTwo < hpPlayerOne) {
    $divArenas.appendChild(playerWins(namePlayerOne));
    generateLogs("end", playerOne, playerTwo);
  } else if (hpPlayerOne === 0 && hpPlayerTwo === 0) {
    $divArenas.appendChild(playerWins());
    generateLogs("draw");
  }
  if (hpPlayerOne === 0 || hpPlayerTwo === 0) {
    createReloadButton();
  }
};
