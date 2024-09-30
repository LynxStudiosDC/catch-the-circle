let score = 0;
let timeLeft = 30;
let gameActive = false; // Changed to false initially
const circle = document.getElementById('circle');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const gameArea = document.getElementById('game-area');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');
const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');

// Function to generate random position
function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}

// Move the circle randomly within the game area
function moveCircle() {
  if (!gameActive) return; // Stop the game if time is up

  const gameAreaRect = gameArea.getBoundingClientRect();
  const maxX = gameAreaRect.width - circle.offsetWidth;
  const maxY = gameAreaRect.height - circle.offsetHeight;

  const newX = getRandomPosition(maxX);
  const newY = getRandomPosition(maxY);

  circle.style.left = `${newX}px`;
  circle.style.top = `${newY}px`;
}

// Update the score and move the circle when clicked
function updateScore() {
  if (!gameActive) return; // Ignore clicks after game ends

  score++;
  scoreElement.textContent = score;
  moveCircle();
}

// Mouse click event
circle.addEventListener('click', updateScore);

// Touch event for mobile
circle.addEventListener('touchstart', function (event) {
  event.preventDefault(); // Prevent default touch behavior
  updateScore();
});

// Countdown timer
function countdown() {
  const timer = setInterval(function () {
    timeLeft--;
    timeElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// End the game
function endGame() {
  gameActive = false;
  circle.style.display = 'none'; // Hide the circle
  gameOverScreen.style.display = 'block'; // Show game over screen
  finalScoreElement.textContent = score; // Display final score
}

// Start the game
startButton.addEventListener('click', function () {
  score = 0;
  timeLeft = 30;
  gameActive = true;

  // Hide start screen and show game area
  startScreen.style.display = 'none';
  gameArea.style.display = 'block';

  // Reset score and timer display
  scoreElement.textContent = score;
  timeElement.textContent = timeLeft;

  // Start the circle movement and countdown
  moveCircle();
  countdown();
});

// Restart the game
restartButton.addEventListener('click', function () {
  // Reset the game state
  score = 0;
  timeLeft = 30;
  gameActive = true;
  scoreElement.textContent = score;
  timeElement.textContent = timeLeft;

  // Hide game over screen and show the circle
  gameOverScreen.style.display = 'none';
  circle.style.display = 'block';

  // Restart the circle movement and countdown
  moveCircle();
  countdown();
});
