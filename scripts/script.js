import { drawSnake, updateSnake, snakeSpeed } from "./snake.js";
import { drawFood, updateFood } from "./food.js";

let lastUpdateTime = 0;

const gameBoard = document.querySelector("#game-board");

const main = (currentTime) => {
	window.requestAnimationFrame(main);
	const secondsSinceLastUpdate = (currentTime - lastUpdateTime) / 1000;
	if (secondsSinceLastUpdate < 1 / snakeSpeed) return;

	lastUpdateTime = currentTime;

	update();
	draw();
};

const update = () => {
	updateSnake();
	updateFood();
};

const draw = () => {
	gameBoard.innerHTML = "";
	drawSnake(gameBoard);
	drawFood(gameBoard);
};

window.requestAnimationFrame(main);
draw();
