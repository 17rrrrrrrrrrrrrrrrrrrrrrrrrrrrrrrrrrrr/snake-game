const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreText = document.getElementById("finalScore");
const scoreText = document.getElementById("score");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [];
let direction = { x: 0, y: 0 };
let food = {};
let score = 0;
let gameRunning = false;
let gameLoopInterval = null;

function initGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: -1 }; // 初始往上
  food = randomFoodPosition();
  score = 0;
  updateScore();
}

function startGame() {
  initGame();
  gameRunning = true;
  startScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  gameLoopInterval = setInterval(gameLoop, 120);
}

function endGame() {
  gameRunning = false;
  clearInterval(gameLoopInterval);
  finalScoreText.textContent = `你的分數是：${score}`;
  gameOverScreen.style.display = "flex";
}

function restartGame() {
  startGame();
}

function gameLoop() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount ||
    snake.some(part => part.x === head.x && part.y === head.y)
  ) {
    endGame();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore();
    food = randomFoodPosition();
  } else {
    snake.pop();
  }

  drawGame();
}

function randomFoodPosition() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
}

function drawGame() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "lime";
  snake.forEach(part => {
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
  });

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function updateScore() {
  scoreText.textContent = score;
}

document.addEventListener("keydown", e => {
  if (!gameRunning) return;

  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});
