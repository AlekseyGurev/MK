//Task #0

const playerOne = {
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["gun", "knife"],
  attak: function (name) {
    console.log(`${name} + Fight...`);
  },
};

const playerTwo = {
  name: "SUB-ZERO",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["gun", "knife"],
  attak: function (name) {
    console.log(`${name} + Fight...`);
  },
};

playerOne.attak("Scorpion");

//Task #1

function createPlayer(playerNumber, player) {
  const $divPlayer = document.createElement("div");
  $divPlayer.className = playerNumber;

  const $divProgressbar = document.createElement("div");
  $divProgressbar.className = "progressbar";
  $divPlayer.appendChild($divProgressbar);

  const $divlife = document.createElement("div");
  $divlife.className = "life";
  $divlife.style.width = "100%";
  $divlife.innerText = player.hp;
  $divProgressbar.appendChild($divlife);

  const $divName = document.createElement("div");
  $divName.className = "name";
  // $divName.innerText = player.name;
  const $pName = document.createElement("p");
  $pName.innerText = player.name;
  $divProgressbar.appendChild($divName);
  $divName.appendChild($pName);

  const $divCharacter = document.createElement("div");
  $divCharacter.className = "character";
  $divPlayer.appendChild($divCharacter);

  const $imgPlayer = document.createElement("img");
  $imgPlayer.src = player.img;
  $divCharacter.appendChild($imgPlayer);

  const $divArenas = document.querySelector(".arenas");
  $divArenas.appendChild($divPlayer);
}

//Task #3
createPlayer("player1", playerOne);
createPlayer("player2", playerTwo);
