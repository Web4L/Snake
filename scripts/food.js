import { getSnakeBody, increaseSnakeSpeed, addSegment } from "./snake.js";

let x;
let y;

export function drawFood(gameBoard) {
	const foodElement = document.createElement("div");
	foodElement.classList.add("food");
	foodElement.style.gridColumnStart = x;
	foodElement.style.gridRowStart = y;
	gameBoard.appendChild(foodElement);
}

export function updateFood() {
	const snakeHead = getSnakeBody()[0];
	if (snakeHead.x === x && snakeHead.y === y) {
		generateNewFood();
		increaseSnakeSpeed(0.1);
		addSegment();
	}
}

function getOpenCells() {
	const snakeBody = getSnakeBody();

	const openCells = [];

	for (let x = 0; x < 21; x++) {
		mainLoop: for (let y = 0; y < 21; y++) {
			for (let i = 0; i < snakeBody.length; i++) {
				if (snakeBody[i].x === x && snakeBody[i].y === y)
					continue mainLoop;
			}
			openCells.push({ x, y });
		}
	}

	return openCells;
}

function generateNewFood() {
	const openCells = getOpenCells();
	const coords = openCells[Math.floor(Math.random() * openCells.length)];
	x = coords.x;
	y = coords.y;
}

generateNewFood();
