import { $divArenas, $chat } from "./utils.js";

export const createPlayer = (playerObj) => {
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
};

export const playerWins = (name) => {
  const $winsTitle = createElement("div", "loseTitle");
  $winsTitle.innerText = name ? `${name} wins` : "draw";
  return $winsTitle;
};

export const createReloadButton = () => {
  const $divReloadWrap = createElement("div", "reloadWrap");
  const $buttonReload = createElement("button", "button");
  $buttonReload.innerText = "Reload";
  $buttonReload.addEventListener("click", () => window.location.reload());
  $divReloadWrap.appendChild($buttonReload);
  $divArenas.appendChild($divReloadWrap);
};

export const addLogs = (text) => {
  const el = `<p>${text}</p>`;
  $chat.insertAdjacentHTML("afterbegin", el);
};

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.className = className;
  } else {
  }
  return $tag;
};
