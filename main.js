const $divArenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

const playerOne = {
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["gun", "knife"],
  attak: function (name) {
    console.log(`${name} + Fight...`);
  },
};

const playerTwo = {
  player: 2,
  name: "SUB-ZERO",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["gun", "knife"],
  attak: function (name) {
    console.log(`${name} + Fight...`);
  },
};

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.className = className;
  } else {
  }
  return $tag;
}

function createPlayer(playerObj) {
  const $divPlayer = createElement("div", `player${playerObj.player}`);
  const $divProgressbar = createElement("div", "progressbar");
  const $divlife = createElement("div", "life");
  const $divName = createElement("div", "name");
  const $divCharacter = createElement("div", "character");
  const $imgPlayer = createElement("img");

  $divlife.style.width = playerObj.hp + "%";
  $divName.innerText = playerObj.name;
  $imgPlayer.src = playerObj.img;

  $divPlayer.appendChild($divProgressbar);
  $divProgressbar.appendChild($divlife);
  $divProgressbar.appendChild($divName);
  $divPlayer.appendChild($divCharacter);
  $divCharacter.appendChild($imgPlayer);

  return $divPlayer;
}

function playerWins(name) {
  const $winsTitle = createElement("div", "loseTitle");
  $winsTitle.innerText = `${name} wins`;
  return $winsTitle;
}

function randomChangeHp() {
  return Math.ceil(Math.random() * 20);
}

function changeHp(player) {
  const $playerLife = document.querySelector(`.player${player.player} .life`);
  player.hp -= randomChangeHp();
  if (player.hp <= 0) {
    player.hp = 0;
  }
  $playerLife.style.width = `${player.hp}%`;
}

function clickButton() {
  if (playerOne.hp > 0 && playerTwo.hp > 0) {
    changeHp(playerTwo, playerOne.name);
  }
  if (playerOne.hp > 0 && playerTwo.hp > 0) {
    changeHp(playerOne, playerTwo.name);
  }
  if (playerOne.hp <= 0) {
    $randomButton.disabled = true;
    $divArenas.appendChild(playerWins(playerTwo.name));
  }
  if (playerTwo.hp <= 0) {
    $randomButton.disabled = true;
    $divArenas.appendChild(playerWins(playerOne.name));
  }
}

$randomButton.addEventListener("click", clickButton);

$divArenas.appendChild(createPlayer(playerOne));
$divArenas.appendChild(createPlayer(playerTwo));
