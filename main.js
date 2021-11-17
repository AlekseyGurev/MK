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
  changeHp: changeHp,
  renderHP: renderHP
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
  changeHp: changeHp,
  renderHP: renderHP
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

function randomChangeHp(num) {
  return Math.ceil(Math.random() * num);
}

function changeHp (num) {
  this.hp -= num;
  if (this.hp <= 0) {
    this.hp = 0;
  }
}

function elHp() {
  return  document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
  elHp.bind(this)().style.width = `${this.hp}%`
}

function clickButton()  {
  playerOne.changeHp(randomChangeHp(20));
  playerTwo.changeHp(randomChangeHp(20));
  playerOne.renderHP();
  playerTwo.renderHP();

  if (playerOne.hp === 0 && playerOne.hp < playerTwo.hp) {
    $divArenas.appendChild(playerWins(playerTwo.name));
  }else if (playerTwo.hp === 0 && playerTwo.hp < playerOne.hp){
    $divArenas.appendChild(playerWins(playerOne.name));
  }else if (playerOne.hp === 0 && playerTwo.hp === 0){
    $divArenas.appendChild(playerWins());
  }
  if (playerOne.hp === 0 || playerTwo.hp === 0){
    $randomButton.disabled = true;
    $divArenas.appendChild(createReloadButton());
    $randomButton.style.visibility = "hidden";
  }
}

function createReloadButton() {
  const $divReloadWrap = createElement("div", "reloadWrap");
  const $buttonReload = createElement("button", "button");
  $buttonReload.innerText = "Reload"
  $buttonReload.addEventListener("click", () => window.location.reload());
  $divReloadWrap.appendChild($buttonReload);
  return $divReloadWrap;
}

$randomButton.addEventListener("click", clickButton);

$divArenas.appendChild(createPlayer(playerOne));
$divArenas.appendChild(createPlayer(playerTwo));
