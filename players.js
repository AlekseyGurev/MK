import { changeHp } from "./gameFunction.js";
import { elHp, renderHP } from "./domUtils.js";
export const playerOne = {
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

export const playerTwo = {
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
