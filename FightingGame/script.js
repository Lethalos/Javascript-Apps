let playButton = document.getElementById("play");
let resultDiv = document.getElementById("result");
let p1NameDiv = document.getElementById("p1Name");
let p2NameDiv = document.getElementById("p2Name");
let p1HealthDiv = document.getElementById("p1Health");
let p2HealthDiv = document.getElementById("p2Health");

const updateGame = (p1, p2, gameState) => {
  p1NameDiv.innerHTML = p1.name;
  p2NameDiv.innerHTML = p2.name;
  p1HealthDiv.innerHTML = p1.health;
  p2HealthDiv.innerHTML = p2.health;

  if (p1.health <= 0 || p2.health <= 0) {
    game.isOver = true;
    gameState = game.isOver;
    resultDiv.innerHTML = game.declareWinner(gameState, p1, p2);
  }
};

class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }

  strike(player, enemy, attackDmg) {
    attackDmg = Math.floor(Math.random() * 10) + 1;
    enemy.health -= attackDmg;
    updateGame(p1, p2, gameState);
    console.log(`${player.name} attacks ${enemy.name} for ${attackDmg}`);
  }

  heal(player) {
    const hpAmount = Math.floor(Math.random() * 5) + 1;
    player.health += hpAmount;
    updateGame(p1, p2, gameState);
    console.log(`${this.name} heals for ${hpAmount} HP`);
  }
}

class Game {
  constructor() {
    this.isOver = false;
  }

  declareWinner(isOver, p1, p2) {
    let message;

    if (isOver) {
      if (p1.health <= 0) {
        message = `${p2.name} WINS`;
      } else if (p2.health <= 0) {
        message = `${p1.name} WINS`;
      }

      document.getElementById("victory").play();
    }

    return message;
  }

  reset(p1, p2) {
    p1.health = 100;
    p2.health = 100;
    game.isOver = false;
    resultDiv.innerHTML = "";
    updateGame(p1, p2, gameState);
  }

  play(p1, p2) {
    console.log("simulate");

    this.reset(p1, p2);

    while (!this.isOver) {
      p1.heal(p1);
      p2.heal(p2);

      p1.strike(p1, p2, p1.attackDamage);
      p2.strike(p2, p1, p2.attackDamage);
    }
  }
}

let p1 = new Player("Sub-Zero", 100, 7);
let p2 = new Player("Liu Kang", 100, 7);

let game = new Game();

updateGame(p1, p2, game.isOver);

let gameState = game.isOver;

playButton.addEventListener("click", () => {
  game.play(p1, p2);
});

// ** Player 1 Controls **
document.addEventListener("keydown", function (e) {
  if (e.key == "q" && game.isOver == false) {
    if (p2.health > 0) {
      p1.strike(p1, p2, p1.attackDmg);
      document.getElementById("p1attack").play();
    }
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key == "a" && game.isOver == false) {
    p1.heal(p1, p2);
    document.getElementById("p1heal").play();
  }
});

// ** Player 2 Controls **
document.addEventListener("keydown", function (e) {
  if (e.key == "p" && game.isOver == false) {
    if (p1.health > 0) {
      p2.strike(p2, p1, p2.attackDmg);
      document.getElementById("p2attack").play();
    }
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key == "l" && game.isOver == false) {
    p2.heal(p2, p1);
    document.getElementById("p2heal").play();
  }
});
