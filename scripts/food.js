import { getSnakeBody, increaseSnakeSpeed, addSegment } from "./snake.js";
import { screenWidth, screenHeight } from "./index.js";

const foodSpeedIncrease = 0.1;

let x;
let y;

export function drawFood(gameBoard) {
	if (x === undefined || y === undefined) {
		generateNewFood();
	}
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
		increaseSnakeSpeed(foodSpeedIncrease);
		addSegment();
	}
}

function getOpenCells() {
	const snakeBody = getSnakeBody();

	const openCells = [];

	for (let i = 1; i < screenWidth; i++) {
		for (let j = 1; j < screenHeight; j++) {
			let isOpen = true;
			for (let k = 0; k < snakeBody.length; k++) {
				if (snakeBody[k].x === i && snakeBody[k].y === j) {
					isOpen = false;
				}
			}
			if (isOpen) {
				openCells.push({ x: i, y: j });
			}
		}
	}

	return openCells;
}

function generateNewFood() {
	const openCells = getOpenCells();
	if (openCells.length === 0) {
		return;
	}
	const coords = openCells[Math.floor(Math.random() * openCells.length)];
	x = coords.x;
	y = coords.y;
}
