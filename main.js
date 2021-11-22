const $divArenas = document.querySelector(".arenas");
const $formFight = document.querySelector(".control");
const $chat = document.querySelector(".chat");
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ["head", "body", "foot"];

const logs = {
  start:
    "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
  end: [
    "Результат удара [playerWins]: [playerLose] - труп",
    "[playerLose] погиб от удара бойца [playerWins]",
    "Результат боя: [playerLose] - жертва, [playerWins] - убийца",
  ],
  hit: [
    "[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
    "[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
    "[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
    "[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
    "[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
    "[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
    "[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
    "[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
    "[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
    "[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
    "[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
    "[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
    "[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
    "[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
    "[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
    "[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
    "[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
    "[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
  ],
  defence: [
    "[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.",
    "[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.",
    "[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.",
    "[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.",
    "[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
    "[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
  ],
  draw: "Ничья - это тоже победа!",
};

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
    generateLogs("end", playerTwo, playerOne);
  } else if (playerTwo.hp === 0 && playerTwo.hp < playerOne.hp) {
    $divArenas.appendChild(playerWins(playerOne.name));
    generateLogs("end", playerOne, playerTwo);
  } else if (playerOne.hp === 0 && playerTwo.hp === 0) {
    $divArenas.appendChild(playerWins());
    generateLogs("draw");
  }
  if (playerOne.hp === 0 || playerTwo.hp === 0) {
    createReloadButton();
  }
}

function addLogs(text) {
  const el = `<p>${text}</p>`;
  $chat.insertAdjacentHTML("afterbegin", el);
}

function getTime() {
  const date = new Date();
  let hours = "";
  let minutes = "";
  if (date.getHours() < 10) {
    hours = `0${date.getHours()}`;
  } else {
    hours = `${date.getHours()}`;
  }
  if (date.getMinutes() < 10) {
    minutes = `0${date.getMinutes()}`;
  } else {
    minutes = `${date.getMinutes()}`;
  }
  return `${hours}:${minutes}`;
}

function generateLogs(type, player1, player2, hit) {
  let text = "";
  switch (type) {
    case "start":
      text = logs[type]
        .replace("[time]", `${getTime()}`)
        .replace("[player1]", player1.name)
        .replace("[player2]", player2.name);
      break;
    case "hit":
      text = `${getTime()} - ${logs[type][getRandom(logs[type].length - 1)]
        .replace("[playerDefence]", player1.name)
        .replace("[playerKick]", player2.name)} - ${hit} [${player1.hp}/100]`;
      break;
    case "defence":
      text = `${getTime()} - ${logs[type][getRandom(logs[type].length - 1)]
        .replace("[playerDefence]", player2.name)
        .replace("[playerKick]", player1.name)}`;
      break;
    case "draw":
      text = `Ничья - это тоже победа!`;
      break;
    case "end":
      text = logs[type][getRandom(logs[type].length - 1)]
        .replace("[playerWins]", player1.name)
        .replace("[playerLose]", player2.name);
      break;
  }
  addLogs(text);
}

$formFight.addEventListener("submit", function (e) {
  e.preventDefault();
  const enemy = enemyAttack();
  const attack = playerAttack();

  if (attack.defence !== enemy.hit) {
    playerOne.changeHp(enemy.value);
    playerOne.renderHP();
    generateLogs("hit", playerOne, playerTwo, enemy.value);
  } else {
    generateLogs("defence", playerTwo, playerOne);
  }
  if (attack.hit !== enemy.defence) {
    playerTwo.changeHp(attack.value);
    playerTwo.renderHP();
    generateLogs("hit", playerTwo, playerOne, attack.value);
  } else {
    generateLogs("defence", playerOne, playerTwo);
  }
  checkWins(playerOne, playerTwo);
});

$divArenas.appendChild(createPlayer(playerOne));
$divArenas.appendChild(createPlayer(playerTwo));
generateLogs("start", playerOne, playerTwo);
