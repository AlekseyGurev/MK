class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.weapon = ["gun", "knife"];
  }
  attak = () => {
    console.log(`${this.name} + Fight...`);
  };
  changeHp = (num) => {
    this.hp -= num;
    if (this.hp <= 0) {
      this.hp = 0;
    }
  };
  renderHP = () => {
    this.elHp().style.width = `${this.hp}%`;
  };
  elHp = () => {
    return document.querySelector(`.player${this.player} .life`);
  };
}

export default Player;
