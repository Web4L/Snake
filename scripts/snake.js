import { screenWidth, screenHeight } from "./index.js";

export let snakeSpeed = 3;
let direction = "right";

let snakeBody = [
	{ x: 11, y: 11 },
	{ x: 10, y: 11 },
	{ x: 9, y: 11 },
];

let inputList = [];
let lastSegment = { x: 8, y: 11 };

export function updateSnake() {
	if (inputList.length > 0) {
		direction = inputList.shift();
	}

	lastSegment = snakeBody[snakeBody.length - 1];
	// move each segment to the position of the next segment
	for (let i = snakeBody.length - 1; i > 0; i--) {
		snakeBody[i].x = snakeBody[i - 1].x;
		snakeBody[i].y = snakeBody[i - 1].y;
	}

	// move the head in the appropriate direction
	switch (direction) {
		case "up":
			snakeBody[0].y--;
			break;
		case "down":
			snakeBody[0].y++;
			break;
		case "left":
			snakeBody[0].x--;
			break;
		case "right":
			snakeBody[0].x++;
			break;
	}

	// check if the snake has hit itself
	for (let i = 1; i < snakeBody.length; i++) {
		if (
			snakeBody[0].x === snakeBody[i].x &&
			snakeBody[0].y === snakeBody[i].y
		) {
			lose();
			return;
		}
	}

	// check if the snake has hit the wall
	if (
		snakeBody[0].x < 1 ||
		snakeBody[0].x > screenWidth ||
		snakeBody[0].y < 1 ||
		snakeBody[0].y > screenHeight
	) {
		lose();
		return;
	}
}

function lose() {
	window.alert(`You lose! Score: ${snakeBody.length - 3}`);
	window.location.replace(
		window.location.pathname + window.location.search + window.location.hash
	);
}

export function drawSnake(gameBoard) {
	for (let i = 0; i < snakeBody.length; i++) {
		let segment = snakeBody[i];
		const snakeElement = document.createElement("div");
		snakeElement.classList.add(i == 0 ? "snake-head" : "snake-body");
		snakeElement.style.gridColumnStart = segment.x;
		snakeElement.style.gridRowStart = segment.y;
		gameBoard.appendChild(snakeElement);
	}
}

export function setDirection(newDirection) {
	let latestInput = inputList[inputList.length - 1];

	if (latestInput == null) {
		latestInput = direction;
	}

	if (
		latestInput === newDirection ||
		(latestInput === "up" && newDirection === "down") ||
		(latestInput === "down" && newDirection === "up") ||
		(latestInput === "left" && newDirection === "right") ||
		(latestInput === "right" && newDirection === "left")
	) {
		return;
	}

	inputList.push(newDirection);
}

export function getSnakeBody() {
	return snakeBody;
}

export function increaseSnakeSpeed(amount) {
	snakeSpeed += amount;
}

export function addSegment() {
	snakeBody.push({
		x: lastSegment.x,
		y: lastSegment.y,
	});
}
