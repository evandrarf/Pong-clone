import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreELem = document.getElementById("computer-score");

let lastTime;

function update(time) {
  if (lastTime) {
    const delta = time - lastTime;
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);
    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    if (isLose()) handleLose();
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});
document.addEventListener("touchmove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});
document.addEventListener("drag", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});

function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  } else {
    computerScoreELem.textContent = parseInt(computerScoreELem.textContent) + 1;
  }

  ball.reset();
  computerPaddle.reset();
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

window.requestAnimationFrame(update);
