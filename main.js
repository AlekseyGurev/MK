const $divArenas = document.querySelector(".arenas");
const $formFight = document.querySelector(".control");
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ["head", "body", "foot"];

const playerOne = {
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["gun", "knife"],
  attak: function (name) {
    console.log(`${name} + Fight...`);
  },
  changeHp,
  renderHP,
  elHp,
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
  changeHp,
  renderHP,
  elHp,
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
  $winsTitle.innerText = name ? `${name} wins` : "draw";
  return $winsTitle;
}

function getRandom(num) {
  return Math.ceil(Math.random() * num);
}

function changeHp(num) {
  this.hp -= num;
  if (this.hp <= 0) {
    this.hp = 0;
  }
}

function elHp() {
  return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
  this.elHp().style.width = `${this.hp}%`;
}

function createReloadButton() {
  const $divReloadWrap = createElement("div", "reloadWrap");
  const $buttonReload = createElement("button", "button");
  $buttonReload.innerText = "Reload";
  $buttonReload.addEventListener("click", () => window.location.reload());
  $divReloadWrap.appendChild($buttonReload);
  $divArenas.appendChild($divReloadWrap);
}

$divArenas.appendChild(createPlayer(playerOne));
$divArenas.appendChild(createPlayer(playerTwo));

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

function playerAttack() {
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
}

function checkWins(playerOne, playerTwo) {
  if (playerOne.hp === 0 && playerOne.hp < playerTwo.hp) {
    $divArenas.appendChild(playerWins(playerTwo.name));
  } else if (playerTwo.hp === 0 && playerTwo.hp < playerOne.hp) {
    $divArenas.appendChild(playerWins(playerOne.name));
  } else if (playerOne.hp === 0 && playerTwo.hp === 0) {
    $divArenas.appendChild(playerWins());
  }
  if (playerOne.hp === 0 || playerTwo.hp === 0) {
    createReloadButton();
  }
}

$formFight.addEventListener("submit", function (e) {
  e.preventDefault();
  const enemy = enemyAttack();
  const attack = playerAttack();

  if (attack.defence !== enemy.hit) {
    playerOne.changeHp(enemy.value);
    playerOne.renderHP();
  }
  if (attack.hit !== enemy.defence) {
    playerTwo.changeHp(attack.value);
    playerTwo.renderHP();
  }
  checkWins(playerOne, playerTwo);
});
