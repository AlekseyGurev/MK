export const $divArenas = document.querySelector(".arenas");
export const $formFight = document.querySelector(".control");
export const $chat = document.querySelector(".chat");
export const ATTACK = ["head", "body", "foot"];
export const ARENAS = [
  "./assets/scorpions-lair-arenas.png",
  "./assets/waterfront.png",
  "./assets/the-cave.png",
  "./assets/scislac-busorez.png",
  "./assets/jade-s-desert.png",
];

export const getRandom = (num) => Math.ceil(Math.random() * num);

export const getTime = () => {
  const date = new Date();
  const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);
  const time = `${normalize(date.getHours())}:${normalize(
    date.getMinutes()
  )}:${normalize(date.getSeconds())}`;
  return time;
};
